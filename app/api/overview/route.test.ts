import { describe, it, expect } from "vitest"
import { GET } from "./route"

describe("GET /api/overview", () => {
  it("returns 200 with metrics, products, and source when Zoho is not configured", async () => {
    const res = await GET()
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data).toHaveProperty("metrics")
    expect(data).toHaveProperty("products")
    expect(data).toHaveProperty("source")
    expect(Array.isArray(data.metrics)).toBe(true)
    expect(Array.isArray(data.products)).toBe(true)
    expect(data.source).toBe("mock")
  })

  it("returns metrics with label and value for each card", async () => {
    const res = await GET()
    const data = await res.json()
    expect(data.metrics.length).toBeGreaterThanOrEqual(3)
    const labels = data.metrics.map((m: { label: string }) => m.label)
    expect(labels).toContain("YTD Revenue")
    expect(labels).toContain("Units Sold")
    expect(labels).toContain("Avg Order Value")
    data.metrics.forEach((m: { label: string; value: string | number }) => {
      expect(m).toHaveProperty("label")
      expect(m).toHaveProperty("value")
    })
  })

  it("returns products with id, name, sku, revenueShare, unitsSold, revenue, avgOrderValue, returnRate", async () => {
    const res = await GET()
    const data = await res.json()
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

  it("always returns 200 and never exposes error or credentials to client", async () => {
    const res = await GET()
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data).not.toHaveProperty("error")
    expect(data).not.toHaveProperty("message")
    expect(Object.keys(data)).toEqual(expect.arrayContaining(["metrics", "products", "source"]))
  })

  it("returns source only as zoho or mock", async () => {
    const res = await GET()
    const data = await res.json()
    expect(["zoho", "mock"]).toContain(data.source)
  })

  it("returns metrics with value as string or number for component compatibility", async () => {
    const res = await GET()
    const data = await res.json()
    data.metrics.forEach((m: { value: string | number }) => {
      expect(typeof m.value === "string" || typeof m.value === "number").toBe(true)
    })
  })

  it("returns products with numeric revenueShare, unitsSold, revenue, avgOrderValue, returnRate", async () => {
    const res = await GET()
    const data = await res.json()
    data.products.forEach((p: { revenueShare: number; unitsSold: number; revenue: number; avgOrderValue: number; returnRate: number }) => {
      expect(typeof p.revenueShare).toBe("number")
      expect(typeof p.unitsSold).toBe("number")
      expect(typeof p.revenue).toBe("number")
      expect(typeof p.avgOrderValue).toBe("number")
      expect(typeof p.returnRate).toBe("number")
    })
  })
})
