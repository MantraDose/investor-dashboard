import { describe, it, expect } from "vitest"
import {
  mapToDashboardMetrics,
  mapToProductPerformance,
  aggregateLineItems,
} from "./map-to-dashboard"
import type { ZohoSalesOrder, ZohoItem } from "./inventory-client"

describe("mapToDashboardMetrics", () => {
  it("returns MetricCardData shape with label, value, subtitle for YTD Revenue, Units, AOV", () => {
    const orders: ZohoSalesOrder[] = [
      { salesorder_id: "1", salesorder_number: "SO-1", date: new Date().getFullYear() + "-01-15", status: "confirmed", total: 1000, quantity: 10 },
      { salesorder_id: "2", salesorder_number: "SO-2", date: new Date().getFullYear() + "-02-01", status: "confirmed", total: 500, quantity: 5 },
    ]
    const metrics = mapToDashboardMetrics(orders, { includeDividendsMetric: true })
    expect(metrics).toHaveLength(4)
    expect(metrics[0]).toMatchObject({ label: "YTD Revenue", subtitle: "Total sales across all products" })
    expect(metrics[1]).toMatchObject({ label: "Units Sold", subtitle: "YTD units across all SKUs" })
    expect(metrics[2]).toMatchObject({ label: "Avg Order Value", subtitle: "Revenue / Units sold" })
    expect(metrics[3]).toMatchObject({ label: "YTD Dividends" })
    expect(typeof metrics[0].value).toBe("string")
    expect(metrics[0].value).toMatch(/\$[\d,]+/)
  })

  it("filters to current year only for YTD", () => {
    const lastYear = new Date().getFullYear() - 1
    const orders: ZohoSalesOrder[] = [
      { salesorder_id: "1", salesorder_number: "SO-1", date: `${lastYear}-06-01`, status: "confirmed", total: 9999, quantity: 99 },
    ]
    const metrics = mapToDashboardMetrics(orders)
    expect(metrics[0].value).toBe("$0")
    expect(metrics[1].value).toBe("0")
  })
})

describe("mapToProductPerformance", () => {
  it("returns ProductPerformance array with id, name, sku, revenueShare, unitsSold, revenue, avgOrderValue, returnRate", () => {
    const items: ZohoItem[] = [
      { item_id: "100", name: "Gummy", sku: "GUMMY-001", rate: 16 },
      { item_id: "101", name: "Bars", sku: "BARS-001" },
    ]
    const products = mapToProductPerformance(items)
    expect(products).toHaveLength(2)
    expect(products[0]).toMatchObject({
      id: "100",
      name: "Gummy",
      sku: "GUMMY-001",
      revenueShare: 0,
      unitsSold: 0,
      revenue: 0,
      avgOrderValue: 16,
      returnRate: 0,
    })
    expect(products[1].sku).toBe("BARS-001")
  })

  it("computes revenue share and units when line-item aggregates are provided", () => {
    const items: ZohoItem[] = [
      { item_id: "100", name: "A", sku: "A-1" },
      { item_id: "101", name: "B", sku: "B-1" },
    ]
    const lineItems = [
      { item_id: "100", quantity: 10, revenue: 600 },
      { item_id: "101", quantity: 5, revenue: 400 },
    ]
    const products = mapToProductPerformance(items, lineItems)
    expect(products[0].revenue).toBe(600)
    expect(products[0].unitsSold).toBe(10)
    expect(products[0].revenueShare).toBe(60)
    expect(products[0].avgOrderValue).toBe(60)
    expect(products[1].revenue).toBe(400)
    expect(products[1].revenueShare).toBe(40)
  })
})

describe("aggregateLineItems", () => {
  it("returns empty array when orders have no line_items", () => {
    const orders: ZohoSalesOrder[] = [
      { salesorder_id: "1", salesorder_number: "SO-1", date: "2025-01-01", status: "open", total: 100 },
    ]
    expect(aggregateLineItems(orders)).toEqual([])
  })

  it("aggregates quantity and revenue by item_id from line_items", () => {
    const orders: ZohoSalesOrder[] = [
      {
        salesorder_id: "1",
        salesorder_number: "SO-1",
        date: "2025-01-01",
        status: "confirmed",
        total: 100,
        line_items: [
          { item_id: "100", name: "Gummy", quantity: 2, rate: 10, item_total: 20 },
          { item_id: "101", name: "Bars", quantity: 1, rate: 15, item_total: 15 },
        ],
      },
    ]
    const agg = aggregateLineItems(orders)
    expect(agg).toHaveLength(2)
    expect(agg.find((a) => a.item_id === "100")).toEqual({ item_id: "100", quantity: 2, revenue: 20 })
    expect(agg.find((a) => a.item_id === "101")).toEqual({ item_id: "101", quantity: 1, revenue: 15 })
  })
})
