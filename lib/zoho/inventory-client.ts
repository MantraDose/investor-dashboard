/**
 * Zoho Inventory API client (server-side only).
 * Authenticates via refresh token and fetches sales orders and items.
 * Structure allows adding other Zoho products later without changing the app API surface.
 */

import {
  getZohoConfig,
  getAccountsBaseUrl,
  getInventoryApiBaseUrl,
} from "./config"

export type ZohoSalesOrder = {
  salesorder_id: string
  salesorder_number: string
  date: string
  status: string
  total: number
  quantity?: number
  created_time?: string
  line_items?: Array<{
    item_id: string
    name: string
    quantity: number
    rate: number
    item_total: number
  }>
}

export type ZohoItem = {
  item_id: string
  name: string
  sku?: string
  rate?: number
}

export type ZohoSalesOrdersResponse = {
  code: number
  message: string
  salesorders?: ZohoSalesOrder[]
}

export type ZohoItemsResponse = {
  code: number
  message: string
  items?: ZohoItem[]
}

async function getAccessToken(): Promise<string> {
  const { clientId, clientSecret, refreshToken, dc } = getZohoConfig()
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Zoho credentials not configured")
  }
  const base = getAccountsBaseUrl(dc)
  const params = new URLSearchParams({
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "refresh_token",
  })
  const res = await fetch(`${base}/oauth/v2/token?${params}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  })
  if (!res.ok) {
    const text = await res.text()
    console.error("[Zoho] Token request failed:", res.status, text)
    throw new Error("Zoho token request failed")
  }
  const data = (await res.json()) as { access_token?: string }
  if (!data.access_token) {
    throw new Error("Zoho token response missing access_token")
  }
  return data.access_token
}

async function inventoryFetch<T>(
  path: string,
  accessToken: string
): Promise<T> {
  const base = getInventoryApiBaseUrl(getZohoConfig().dc)
  const orgId = getZohoConfig().organizationId
  if (!orgId) throw new Error("Zoho organization ID not configured")
  const url = `${base}/inventory/v1${path}?organization_id=${orgId}`
  const res = await fetch(url, {
    headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
  })
  if (!res.ok) {
    const text = await res.text()
    console.error("[Zoho] API request failed:", res.status, path, text)
    throw new Error("Zoho API request failed")
  }
  return res.json() as Promise<T>
}

/**
 * Fetches company-wide sales orders (paginated list).
 * For YTD we filter by date in the mapping layer or via API params if supported.
 */
export async function fetchSalesOrders(): Promise<ZohoSalesOrder[]> {
  const token = await getAccessToken()
  const data = await inventoryFetch<ZohoSalesOrdersResponse>(
    "/salesorders",
    token
  )
  if (data.code !== 0 || !Array.isArray(data.salesorders)) {
    throw new Error(data.message ?? "Failed to fetch sales orders")
  }
  return data.salesorders
}

/**
 * Fetches full sales order details for each ID to get line_items (item-level data).
 * List endpoint may not include line_items; we use list for aggregates and optionally
 * fetch details if needed for product breakdown.
 */
export async function fetchSalesOrderDetail(
  salesOrderId: string,
  accessToken: string
): Promise<{ salesorder?: ZohoSalesOrder }> {
  return inventoryFetch<{ salesorder?: ZohoSalesOrder }>(
    `/salesorders/${salesOrderId}`,
    accessToken
  )
}

/**
 * Fetches company-wide items (products).
 */
export async function fetchItems(): Promise<ZohoItem[]> {
  const token = await getAccessToken()
  const data = await inventoryFetch<ZohoItemsResponse>("/items", token)
  if (data.code !== 0 || !Array.isArray(data.items)) {
    throw new Error(data.message ?? "Failed to fetch items")
  }
  return data.items
}

/**
 * Fetches all data needed for Overview: sales orders (for revenue, units, AOV)
 * and items (for product list). Product performance can be derived from
 * sales order line_items when we have detail, or from items + order aggregates.
 */
export async function fetchOverviewRaw(): Promise<{
  salesOrders: ZohoSalesOrder[]
  items: ZohoItem[]
}> {
  const [salesOrders, items] = await Promise.all([
    fetchSalesOrders(),
    fetchItems(),
  ])
  return { salesOrders, items }
}
