/**
 * Server-side overview data for the dashboard.
 * Used by the Overview page and by GET /api/overview.
 * Returns Zoho-backed data when configured; otherwise mock. Never throws.
 */

import { isZohoConfigured } from "@/lib/zoho/config"
import { fetchOverviewRaw } from "@/lib/zoho/inventory-client"
import {
  mapToDashboardMetrics,
  mapToProductPerformance,
  aggregateLineItems,
} from "@/lib/zoho/map-to-dashboard"
import {
  dashboardMetrics as mockMetrics,
  productPerformance as mockProducts,
} from "@/lib/mock-data"
import type { MetricCardData, ProductPerformance } from "@/lib/types"

export type OverviewData = {
  metrics: MetricCardData[]
  products: ProductPerformance[]
  source: "zoho" | "mock"
}

/**
 * Returns overview metrics and product performance.
 * Uses Zoho Inventory when configured; falls back to mock on error or missing config.
 * Logs Zoho errors server-side only; does not expose them to callers.
 */
export async function getOverviewData(): Promise<OverviewData> {
  if (!isZohoConfigured()) {
    return {
      metrics: mockMetrics,
      products: mockProducts,
      source: "mock",
    }
  }

  try {
    const { salesOrders, items } = await fetchOverviewRaw()
    const metrics = mapToDashboardMetrics(salesOrders, { includeDividendsMetric: true })
    const lineItems = aggregateLineItems(salesOrders)
    const products = mapToProductPerformance(items, lineItems.length > 0 ? lineItems : undefined)
    return { metrics, products, source: "zoho" }
  } catch (err) {
    console.error("[Overview] Zoho fetch failed:", err)
    return {
      metrics: mockMetrics,
      products: mockProducts,
      source: "mock",
    }
  }
}
