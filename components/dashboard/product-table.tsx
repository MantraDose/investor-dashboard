"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ProductPerformance } from "@/lib/types"
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react"

export type ProductTableSortKey =
  | "name"
  | "revenueShare"
  | "unitsSold"
  | "revenue"
  | "avgOrderValue"
  | "returnRate"

interface ProductTableProps {
  products: ProductPerformance[]
  className?: string
  /** When false, the card header title is hidden (e.g. when page title is already the same). Default true. */
  showTitle?: boolean
  /** When provided, column headers become sortable and show sort state. */
  sortColumn?: ProductTableSortKey | null
  sortDirection?: "asc" | "desc"
  onSortChange?: (column: ProductTableSortKey) => void
}

function RevenueBar({ percentage }: { percentage: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-medium w-12">{percentage}%</span>
    </div>
  )
}

function SortableHead({
  label,
  column,
  sortColumn,
  sortDirection,
  onSortChange,
  className,
}: {
  label: string
  column: ProductTableSortKey
  sortColumn?: ProductTableSortKey | null
  sortDirection?: "asc" | "desc"
  onSortChange?: (column: ProductTableSortKey) => void
  className?: string
}) {
  const isActive = sortColumn === column
  const sortLabel = isActive
    ? `Sort by ${label}, ${sortDirection === "asc" ? "ascending" : "descending"}. Click to change.`
    : `Sort by ${label}`
  if (!onSortChange) {
    return (
      <TableHead className={className} scope="col">
        {label}
      </TableHead>
    )
  }
  return (
    <TableHead className={className} scope="col">
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2 h-8 min-h-9 font-medium hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
        onClick={() => onSortChange(column)}
        aria-sort={isActive ? (sortDirection === "asc" ? "ascending" : "descending") : undefined}
        aria-label={sortLabel}
      >
        {label}
        {isActive ? (
          sortDirection === "asc" ? (
            <ChevronUp className="ml-1 h-4 w-4" aria-hidden />
          ) : (
            <ChevronDown className="ml-1 h-4 w-4" aria-hidden />
          )
        ) : (
          <ChevronsUpDown className="ml-1 h-4 w-4 opacity-50" aria-hidden />
        )}
      </Button>
    </TableHead>
  )
}

export function ProductTable({
  products,
  className,
  showTitle = true,
  sortColumn = null,
  sortDirection = "asc",
  onSortChange,
}: ProductTableProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)

  return (
    <Card className={cn("", className)}>
      {showTitle && (
        <CardHeader>
          <CardTitle>Product Performance</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <Table aria-label="Product performance data">
          <TableHeader>
            <TableRow>
              <SortableHead
                label="Product"
                column="name"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSortChange={onSortChange}
              />
              <SortableHead
                label="Revenue Share"
                column="revenueShare"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSortChange={onSortChange}
              />
              <SortableHead
                label="Units Sold"
                column="unitsSold"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSortChange={onSortChange}
                className="text-right"
              />
              <SortableHead
                label="Revenue"
                column="revenue"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSortChange={onSortChange}
                className="text-right"
              />
              <SortableHead
                label="AOV"
                column="avgOrderValue"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSortChange={onSortChange}
                className="text-right"
              />
              <SortableHead
                label="Return Rate"
                column="returnRate"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSortChange={onSortChange}
                className="text-right"
              />
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{product.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {product.sku}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <RevenueBar percentage={product.revenueShare} />
                </TableCell>
                <TableCell className="text-right font-medium">
                  {product.unitsSold.toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(product.revenue)}
                </TableCell>
                <TableCell className="text-right">
                  ${product.avgOrderValue.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={cn(
                      product.returnRate > 2.5
                        ? "text-amber-600"
                        : "text-emerald-600"
                    )}
                  >
                    {product.returnRate}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
