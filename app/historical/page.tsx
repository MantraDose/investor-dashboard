"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts"
import { yearlyComparison, investorProfile } from "@/lib/mock-data"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#dd0a8b",
  },
  dividends: {
    label: "Your Dividends",
    color: "#3E32BF",
  },
  orders: {
    label: "Orders",
    color: "#10b981",
  },
}

// Calculate year-over-year growth
function calcGrowth(current: number, previous: number): number {
  if (previous === 0) return 0
  return ((current - previous) / previous) * 100
}

export default function HistoricalPage() {
  // Calculate total dividends received
  const totalDividends = yearlyComparison.reduce(
    (sum, year) => sum + year.dividendsPaid,
    0
  )

  // Calculate CAGR for revenue
  const firstYear = yearlyComparison[0]
  const lastYear = yearlyComparison[yearlyComparison.length - 1]
  const years = yearlyComparison.length - 1
  const cagr = (Math.pow(lastYear.totalRevenue / firstYear.totalRevenue, 1 / years) - 1) * 100

  return (
    <DashboardLayout
      title="Historical Data"
      breadcrumbs={[{ label: "Historical Data" }]}
    >
      <div className="flex flex-col gap-6">
        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Investment</CardDescription>
              <CardTitle className="text-2xl">
                {formatCurrency(investorProfile.totalInvested)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Since {new Date(investorProfile.investmentDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Dividends Received</CardDescription>
              <CardTitle className="text-2xl text-primary">
                {formatCurrency(totalDividends)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-emerald-600">
                {((totalDividends / investorProfile.totalInvested) * 100).toFixed(1)}% return on investment
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Revenue CAGR</CardDescription>
              <CardTitle className="text-2xl">{cagr.toFixed(1)}%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Compound annual growth rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue & Dividends Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Dividend Growth</CardTitle>
            <CardDescription>Year-over-year comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[350px] w-full">
              <BarChart
                data={yearlyComparison}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" tickLine={false} axisLine={false} />
                <YAxis
                  yAxisId="left"
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value, name) => {
                        if (name === "totalRevenue") return formatCurrency(value as number)
                        if (name === "dividendsPaid") return formatCurrency(value as number)
                        return value
                      }}
                    />
                  }
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="totalRevenue"
                  name="Revenue"
                  fill="#dd0a8b"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  yAxisId="right"
                  dataKey="dividendsPaid"
                  name="Your Dividends"
                  fill="#3E32BF"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Avg Order Value Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Average Order Value Trend</CardTitle>
            <CardDescription>AOV growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <LineChart
                data={yearlyComparison}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" tickLine={false} axisLine={false} />
                <YAxis
                  tickFormatter={(value) => `$${value}`}
                  domain={["dataMin - 2", "dataMax + 2"]}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => `$${(value as number).toFixed(2)}`}
                    />
                  }
                />
                <Line
                  type="monotone"
                  dataKey="avgOrderValue"
                  name="AOV"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981", strokeWidth: 2 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Year-over-Year Comparison Table */}
        <Card>
          <CardHeader>
            <CardTitle>Year-over-Year Comparison</CardTitle>
            <CardDescription>Detailed metrics by year</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Year</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Growth</TableHead>
                  <TableHead className="text-right">Orders</TableHead>
                  <TableHead className="text-right">AOV</TableHead>
                  <TableHead className="text-right">Your Dividends</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {yearlyComparison.map((year, index) => {
                  const prevYear = index > 0 ? yearlyComparison[index - 1] : null
                  const revenueGrowth = prevYear
                    ? calcGrowth(year.totalRevenue, prevYear.totalRevenue)
                    : null

                  return (
                    <TableRow key={year.year}>
                      <TableCell className="font-medium">{year.year}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(year.totalRevenue)}
                      </TableCell>
                      <TableCell className="text-right">
                        {revenueGrowth !== null ? (
                          <span
                            className={cn(
                              "inline-flex items-center gap-1",
                              revenueGrowth >= 0
                                ? "text-emerald-600"
                                : "text-red-600"
                            )}
                          >
                            {revenueGrowth >= 0 ? (
                              <TrendingUp className="h-4 w-4" />
                            ) : (
                              <TrendingDown className="h-4 w-4" />
                            )}
                            {Math.abs(revenueGrowth).toFixed(1)}%
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {year.totalOrders.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        ${year.avgOrderValue.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-medium text-primary">
                        {formatCurrency(year.dividendsPaid)}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
