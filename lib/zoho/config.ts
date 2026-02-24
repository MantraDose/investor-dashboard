/**
 * Zoho Inventory configuration from environment.
 * No default or placeholder values; read only on the server.
 */

const ZOHO_CLIENT_ID = process.env.ZOHO_CLIENT_ID
const ZOHO_CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET
const ZOHO_REFRESH_TOKEN = process.env.ZOHO_REFRESH_TOKEN
const ZOHO_ORGANIZATION_ID = process.env.ZOHO_ORGANIZATION_ID
const ZOHO_DC = process.env.ZOHO_DC ?? "com"

const ACCOUNTS_BASE: Record<string, string> = {
  com: "https://accounts.zoho.com",
  eu: "https://accounts.zoho.eu",
  in: "https://accounts.zoho.in",
  "com.au": "https://accounts.zoho.com.au",
  ca: "https://accounts.zohocloud.ca",
}

const API_BASE: Record<string, string> = {
  com: "https://www.zohoapis.com",
  eu: "https://www.zohoapis.eu",
  in: "https://www.zohoapis.in",
  "com.au": "https://www.zohoapis.com.au",
  ca: "https://www.zohocloud.ca",
}

export function getZohoConfig() {
  return {
    clientId: ZOHO_CLIENT_ID,
    clientSecret: ZOHO_CLIENT_SECRET,
    refreshToken: ZOHO_REFRESH_TOKEN,
    organizationId: ZOHO_ORGANIZATION_ID,
    dc: ZOHO_DC in ACCOUNTS_BASE ? ZOHO_DC : "com",
  }
}

export function isZohoConfigured(): boolean {
  const c = getZohoConfig()
  return Boolean(
    c.clientId &&
      c.clientSecret &&
      c.refreshToken &&
      c.organizationId
  )
}

export function getAccountsBaseUrl(dc?: string): string {
  return ACCOUNTS_BASE[dc ?? getZohoConfig().dc] ?? ACCOUNTS_BASE.com
}

export function getInventoryApiBaseUrl(dc?: string): string {
  return API_BASE[dc ?? getZohoConfig().dc] ?? API_BASE.com
}
