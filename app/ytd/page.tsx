"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { monthlyRevenue, dividendHistory, yearlyComparison } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#dd0a8b",
  },
  orders: {
    label: "Orders",
    color: "#3E32BF",
  },
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)

export default function YTDPerformancePage() {
  // Calculate YTD totals
  const ytdRevenue = monthlyRevenue.reduce((sum, month) => sum + month.revenue, 0)
  const ytdOrders = monthlyRevenue.reduce((sum, month) => sum + month.orders, 0)
  const ytdAvgOrderValue = ytdRevenue / ytdOrders

  // Previous year data for comparison
  const prevYear = yearlyComparison[yearlyComparison.length - 2]
  const revenueGrowth = ((ytdRevenue - prevYear.totalRevenue) / prevYear.totalRevenue) * 100

  return (
    <DashboardLayout
      title="YTD Performance"
      breadcrumbs={[{ label: "YTD Performance" }]}
    >
      <div className="flex flex-col gap-6">
        {/* YTD Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>YTD Revenue</CardDescription>
              <CardTitle className="text-2xl">{formatCurrency(ytdRevenue)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-emerald-600">
                +{revenueGrowth.toFixed(1)}% vs last year
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>YTD Orders</CardDescription>
              <CardTitle className="text-2xl">{ytdOrders.toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {(ytdOrders / 12).toFixed(0)} avg per month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Avg Order Value</CardDescription>
              <CardTitle className="text-2xl">${ytdAvgOrderValue.toFixed(2)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-emerald-600">
                +{((ytdAvgOrderValue - prevYear.avgOrderValue) / prevYear.avgOrderValue * 100).toFixed(1)}% vs last year
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue Trend</CardTitle>
            <CardDescription>Revenue performance throughout the year</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={monthlyRevenue} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dd0a8b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#dd0a8b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      labelKey="month"
                      formatter={(value, name) => (
                        <div className="flex justify-between gap-2">
                          <span className="text-muted-foreground">{chartConfig[name as keyof typeof chartConfig]?.label || name}</span>
                          <span className="font-mono font-medium">{formatCurrency(value as number)}</span>
                        </div>
                      )}
                    />
                  }
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#dd0a8b"
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Orders Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Orders</CardTitle>
            <CardDescription>Order volume by month</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <BarChart data={monthlyRevenue} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      labelKey="month"
                    />
                  }
                />
                <Bar dataKey="orders" fill="#3E32BF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Dividend History */}
        <Card>
          <CardHeader>
            <CardTitle>Dividend History</CardTitle>
            <CardDescription>Your dividend payments over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dividendHistory.map((dividend) => (
                <div
                  key={dividend.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{dividend.period}</span>
                    <span className="text-sm text-muted-foreground">
                      Payout: {new Date(dividend.payoutDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold">
                      {formatCurrency(dividend.amount)}
                    </span>
                    <Badge
                      variant={dividend.status === "paid" ? "default" : "secondary"}
                      className={cn(
                        dividend.status === "paid" && "bg-emerald-600",
                        dividend.status === "scheduled" && "bg-amber-500"
                      )}
                    >
                      {dividend.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
