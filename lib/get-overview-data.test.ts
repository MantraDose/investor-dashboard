import { describe, it, expect, vi, beforeEach } from "vitest"
import { isZohoConfigured } from "@/lib/zoho/config"
import { fetchOverviewRaw } from "@/lib/zoho/inventory-client"
import { getOverviewData } from "./get-overview-data"

vi.mock("@/lib/zoho/config", () => ({
  isZohoConfigured: vi.fn(),
}))

vi.mock("@/lib/zoho/inventory-client", () => ({
  fetchOverviewRaw: vi.fn(),
}))

describe("getOverviewData", () => {
  beforeEach(() => {
    vi.mocked(isZohoConfigured).mockReturnValue(false)
    vi.mocked(fetchOverviewRaw).mockReset()
  })

  it("returns metrics, products, and source when Zoho is not configured", async () => {
    const data = await getOverviewData()
    expect(data).toHaveProperty("metrics")
    expect(data).toHaveProperty("products")
    expect(data).toHaveProperty("source")
    expect(Array.isArray(data.metrics)).toBe(true)
    expect(Array.isArray(data.products)).toBe(true)
    expect(data.source).toBe("mock")
  })

  it("returns metrics with label and value for each card when using mock", async () => {
    const data = await getOverviewData()
    expect(data.metrics.length).toBeGreaterThanOrEqual(3)
    const labels = data.metrics.map((m) => m.label)
    expect(labels).toContain("YTD Revenue")
    expect(labels).toContain("Units Sold")
    expect(labels).toContain("Avg Order Value")
    data.metrics.forEach((m) => {
      expect(m).toHaveProperty("label")
      expect(m).toHaveProperty("value")
    })
  })

  it("returns products with required ProductPerformance fields when using mock", async () => {
    const data = await getOverviewData()
    expect(data.products.length).toBeGreaterThan(0)
    const first = data.products[0]
    expect(first).toHaveProperty("id")
    expect(first).toHaveProperty("name")
    expect(first).toHaveProperty("sku")
    expect(first).toHaveProperty("revenueShare")
    expect(first).toHaveProperty("unitsSold")
    expect(first).toHaveProperty("revenue")
    expect(first).toHaveProperty("avgOrderValue")
    expect(first).toHaveProperty("returnRate")
  })

  it("falls back to mock when Zoho is configured but fetch fails", async () => {
    vi.mocked(isZohoConfigured).mockReturnValue(true)
    vi.mocked(fetchOverviewRaw).mockRejectedValue(new Error("Zoho API error"))

    const data = await getOverviewData()

    expect(data.source).toBe("mock")
    expect(data.metrics.length).toBeGreaterThanOrEqual(3)
    expect(data.products.length).toBeGreaterThan(0)
  })

  it("does not throw when Zoho fetch fails", async () => {
    vi.mocked(isZohoConfigured).mockReturnValue(true)
    vi.mocked(fetchOverviewRaw).mockRejectedValue(new Error("Network error"))

    await expect(getOverviewData()).resolves.toMatchObject({
      source: "mock",
      metrics: expect.any(Array),
      products: expect.any(Array),
    })
  })

  it("returns source zoho and mapped data when Zoho is configured and fetch succeeds", async () => {
    const year = new Date().getFullYear()
    vi.mocked(isZohoConfigured).mockReturnValue(true)
    vi.mocked(fetchOverviewRaw).mockResolvedValue({
      salesOrders: [
        {
          salesorder_id: "1",
          salesorder_number: "SO-1",
          date: `${year}-01-15`,
          status: "confirmed",
          total: 1000,
          quantity: 10,
        },
      ],
      items: [
        { item_id: "100", name: "Product A", sku: "SKU-A", rate: 10 },
      ],
    })

    const data = await getOverviewData()

    expect(data.source).toBe("zoho")
    expect(data.metrics.length).toBeGreaterThanOrEqual(3)
    expect(data.metrics[0]).toMatchObject({ label: "YTD Revenue" })
    expect(data.metrics[0].value).toMatch(/\$[\d,]+/)
    expect(data.products.length).toBe(1)
    expect(data.products[0]).toMatchObject({ id: "100", name: "Product A", sku: "SKU-A" })
  })

  it("returns MetricCardData-compatible metrics when Zoho succeeds", async () => {
    const year = new Date().getFullYear()
    vi.mocked(isZohoConfigured).mockReturnValue(true)
    vi.mocked(fetchOverviewRaw).mockResolvedValue({
      salesOrders: [
        { salesorder_id: "1", salesorder_number: "SO-1", date: `${year}-06-01`, status: "confirmed", total: 500, quantity: 5 },
      ],
      items: [{ item_id: "1", name: "Item", sku: "S1" }],
    })

    const data = await getOverviewData()

    expect(data.source).toBe("zoho")
    data.metrics.forEach((m) => {
      expect(typeof m.label).toBe("string")
      expect(m.value === undefined || typeof m.value === "string" || typeof m.value === "number").toBe(true)
    })
  })

  it("returns ProductPerformance-compatible products when Zoho succeeds", async () => {
    const year = new Date().getFullYear()
    vi.mocked(isZohoConfigured).mockReturnValue(true)
    vi.mocked(fetchOverviewRaw).mockResolvedValue({
      salesOrders: [],
      items: [
        { item_id: "200", name: "B", sku: "B-2", rate: 20 },
      ],
    })

    const data = await getOverviewData()

    expect(data.source).toBe("zoho")
    expect(data.products.length).toBe(1)
    const p = data.products[0]
    expect(typeof p.revenueShare).toBe("number")
    expect(typeof p.unitsSold).toBe("number")
    expect(typeof p.revenue).toBe("number")
    expect(typeof p.avgOrderValue).toBe("number")
    expect(typeof p.returnRate).toBe("number")
  })

  it("returns valid structure when Zoho returns empty orders and items", async () => {
    vi.mocked(isZohoConfigured).mockReturnValue(true)
    vi.mocked(fetchOverviewRaw).mockResolvedValue({ salesOrders: [], items: [] })

    const data = await getOverviewData()

    expect(data.source).toBe("zoho")
    expect(data.metrics.length).toBeGreaterThanOrEqual(3)
    expect(data.metrics[0].value).toBe("$0")
    expect(data.metrics[1].value).toBe("0")
    expect(Array.isArray(data.products)).toBe(true)
  })
})
