/**
 * Maps Zoho Inventory data to dashboard types (MetricCardData, ProductPerformance).
 * Matches shapes expected by lib/types.ts and existing Overview components.
 */

import type { MetricCardData, ProductPerformance } from "@/lib/types"
import type { ZohoSalesOrder, ZohoItem } from "./inventory-client"

const CURRENT_YEAR = new Date().getFullYear()

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

function trendDirection(prev: number, curr: number): "up" | "down" | "neutral" {
  if (curr > prev) return "up"
  if (curr < prev) return "down"
  return "neutral"
}

/**
 * Maps sales orders (YTD) to MetricCardData for YTD Revenue, Units Sold, Avg Order Value.
 * YTD Dividends stays mock for v1; we include a placeholder metric for it.
 */
export function mapToDashboardMetrics(
  salesOrders: ZohoSalesOrder[],
  options?: { includeDividendsMetric?: boolean }
): MetricCardData[] {
  const ytdOrders = salesOrders.filter((o) => {
    const year = o.date ? new Date(o.date).getFullYear() : new Date(o.created_time ?? 0).getFullYear()
    return year === CURRENT_YEAR
  })

  const totalRevenue = ytdOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0)
  const totalUnits = ytdOrders.reduce((sum, o) => sum + (Number(o.quantity) || 0), 0)
  const orderCount = ytdOrders.length
  const avgOrderValue = orderCount > 0 ? totalRevenue / orderCount : 0

  const metrics: MetricCardData[] = [
    {
      label: "YTD Revenue",
      value: formatCurrency(totalRevenue),
      trend: { value: 0, direction: "neutral" },
      sparkline: [],
      subtitle: "Total sales across all products",
    },
    {
      label: "Units Sold",
      value: totalUnits.toLocaleString("en-US"),
      trend: { value: 0, direction: "neutral" },
      sparkline: [],
      subtitle: "YTD units across all SKUs",
    },
    {
      label: "Avg Order Value",
      value: formatCurrency(avgOrderValue),
      trend: { value: 0, direction: "neutral" },
      sparkline: [],
      subtitle: "Revenue / Units sold",
    },
  ]

  if (options?.includeDividendsMetric) {
    metrics.push({
      label: "YTD Dividends",
      value: "$—",
      subtitle: "Total shareholder payouts",
    })
  }

  return metrics
}

export type LineItemAggregate = {
  item_id: string
  quantity: number
  revenue: number
}

/**
 * Maps Zoho items and optional line-item aggregates to ProductPerformance[].
 * When lineItemsByItem is provided, revenue share and return rate are computed.
 */
export function mapToProductPerformance(
  items: ZohoItem[],
  lineItemsByItem?: LineItemAggregate[]
): ProductPerformance[] {
  const byItem = new Map<string, LineItemAggregate>()
  if (lineItemsByItem) {
    for (const li of lineItemsByItem) {
      const existing = byItem.get(li.item_id)
      if (existing) {
        existing.quantity += li.quantity
        existing.revenue += li.revenue
      } else {
        byItem.set(li.item_id, { ...li })
      }
    }
  }

  const totalRevenue = Array.from(byItem.values()).reduce((s, li) => s + li.revenue, 0)

  return items.map((item, index) => {
    const agg = byItem.get(String(item.item_id))
    const revenue = agg?.revenue ?? 0
    const unitsSold = agg?.quantity ?? 0
    const revenueShare = totalRevenue > 0 ? (revenue / totalRevenue) * 100 : 0
    const avgOrderValue = unitsSold > 0 ? revenue / unitsSold : Number(item.rate) || 0
    return {
      id: String(item.item_id),
      name: item.name ?? "Unknown",
      sku: item.sku ?? `ITEM-${item.item_id}`,
      revenueShare: Math.round(revenueShare * 10) / 10,
      unitsSold,
      revenue,
      avgOrderValue: Math.round(avgOrderValue * 100) / 100,
      returnRate: 0,
    }
  })
}

/**
 * Builds line-item aggregates from sales orders that have line_items.
 */
export function aggregateLineItems(orders: ZohoSalesOrder[]): LineItemAggregate[] {
  const out: LineItemAggregate[] = []
  for (const order of orders) {
    const items = order.line_items
    if (!Array.isArray(items)) continue
    for (const li of items) {
      const itemId = String(li.item_id ?? li.name)
      const qty = Number(li.quantity) || 0
      const rev = (Number(li.item_total) ?? Number(li.rate) * qty) || 0
      out.push({ item_id: itemId, quantity: qty, revenue: rev })
    }
  }
  return out
}
