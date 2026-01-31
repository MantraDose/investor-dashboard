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
import { cn } from "@/lib/utils"
import type { ProductPerformance } from "@/lib/types"

interface ProductTableProps {
  products: ProductPerformance[]
  className?: string
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

export function ProductTable({ products, className }: ProductTableProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Product Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Revenue Share</TableHead>
              <TableHead className="text-right">Units Sold</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">AOV</TableHead>
              <TableHead className="text-right">Return Rate</TableHead>
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
