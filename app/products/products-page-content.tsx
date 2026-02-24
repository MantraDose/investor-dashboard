"use client"

import { useMemo, useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ProductTable, type ProductTableSortKey } from "@/components/dashboard/product-table"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { ProductPerformance } from "@/lib/types"

type ReturnRateFilter = "all" | "under1" | "1to2" | "over2"

function filterByReturnRate(products: ProductPerformance[], filter: ReturnRateFilter): ProductPerformance[] {
  if (filter === "all") return products
  if (filter === "under1") return products.filter((p) => p.returnRate < 1)
  if (filter === "1to2") return products.filter((p) => p.returnRate >= 1 && p.returnRate <= 2)
  if (filter === "over2") return products.filter((p) => p.returnRate > 2)
  return products
}

function sortProducts(
  products: ProductPerformance[],
  sortColumn: ProductTableSortKey | null,
  sortDirection: "asc" | "desc"
): ProductPerformance[] {
  if (!sortColumn) return products
  const sorted = [...products].sort((a, b) => {
    const aVal = a[sortColumn]
    const bVal = b[sortColumn]
    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDirection === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal)
    }
    const aNum = Number(aVal)
    const bNum = Number(bVal)
    return sortDirection === "asc" ? aNum - bNum : bNum - aNum
  })
  return sorted
}

interface ProductsPageContentProps {
  initialProducts: ProductPerformance[]
}

export function ProductsPageContent({ initialProducts }: ProductsPageContentProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [returnRateFilter, setReturnRateFilter] = useState<ReturnRateFilter>("all")
  const [sortColumn, setSortColumn] = useState<ProductTableSortKey | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const filteredAndSorted = useMemo(() => {
    const bySearch = searchQuery.trim()
      ? initialProducts.filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.sku.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : initialProducts
    const byFilter = filterByReturnRate(bySearch, returnRateFilter)
    return sortProducts(byFilter, sortColumn, sortDirection)
  }, [initialProducts, searchQuery, returnRateFilter, sortColumn, sortDirection])

  const handleSortChange = (column: ProductTableSortKey) => {
    if (sortColumn === column) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  return (
    <DashboardLayout title="Product Performance" breadcrumbs={[{ label: "Product Performance" }]}>
      <div className="flex flex-col gap-6">
        {/* Search, filter, and table grouped together */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
            <label htmlFor="products-search" className="sr-only">
              Search products by name or SKU
            </label>
            <Input
              id="products-search"
              type="search"
              placeholder="Search by product name or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="min-h-11 w-full sm:w-72"
              aria-label="Search products by name or SKU"
              autoComplete="off"
            />
            <div className="flex min-h-11 flex-col justify-center gap-1 sm:flex-row sm:items-center sm:gap-2">
              <label
                id="return-rate-filter-label"
                htmlFor="return-rate-filter"
                className="text-sm text-muted-foreground whitespace-nowrap"
              >
                Return rate
              </label>
              <Select
                value={returnRateFilter}
                onValueChange={(v) => setReturnRateFilter(v as ReturnRateFilter)}
              >
                <SelectTrigger
                  id="return-rate-filter"
                  className="min-h-11 w-[140px]"
                  aria-labelledby="return-rate-filter-label"
                >
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="under1">Under 1%</SelectItem>
                  <SelectItem value="1to2">1% – 2%</SelectItem>
                  <SelectItem value="over2">Over 2%</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <ProductTable
            products={filteredAndSorted}
            showTitle={false}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSortChange={handleSortChange}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}
