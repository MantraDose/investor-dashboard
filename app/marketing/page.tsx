"use client"

import React from "react"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { marketingData } from "@/lib/mock-data"
import { Mail, Facebook, Users, MousePointerClick, DollarSign, TrendingUp, Target, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)

// Email funnel data
const emailFunnelData = [
  { name: "Sent", value: 24580, fill: "#dd0a8b" },
  { name: "Opened", value: Math.round(24580 * 0.428), fill: "#e84da0" },
  { name: "Clicked", value: Math.round(24580 * 0.084), fill: "#f08fc0" },
  { name: "Converted", value: Math.round(24580 * 0.032), fill: "#f7c0dd" },
]

// Facebook ads funnel
const adsFunnelData = [
  { name: "Impressions", value: 1245000, fill: "#3E32BF" },
  { name: "Clicks", value: 18675, fill: "#5b4fd1" },
  { name: "Conversions", value: 892, fill: "#8578e3" },
]

// Revenue breakdown pie chart data
const revenueSourceData = [
  { name: "Email", value: 38420, fill: "#dd0a8b" },
  { name: "Facebook Ads", value: 52290, fill: "#3E32BF" },
  { name: "Organic", value: 36710, fill: "#10b981" },
]

const chartConfig = {
  email: {
    label: "Email",
    color: "#dd0a8b",
  },
  ads: {
    label: "Facebook Ads",
    color: "#3E32BF",
  },
}

function StatCard({
  icon: Icon,
  label,
  value,
  subValue,
  iconBg,
  iconColor,
}: {
  icon: React.ElementType
  label: string
  value: string | number
  subValue?: string
  iconBg: string
  iconColor: string
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className={cn("flex h-12 w-12 items-center justify-center rounded-lg", iconBg)}>
            <Icon className={cn("h-6 w-6", iconColor)} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-semibold">{value}</p>
            {subValue && (
              <p className="text-sm text-muted-foreground">{subValue}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function MarketingPage() {
  const { omnisend, facebookAds } = marketingData

  return (
    <DashboardLayout
      title="Marketing & Ads"
      breadcrumbs={[{ label: "Marketing & Ads" }]}
    >
      <div className="flex flex-col gap-8">
        {/* Omnisend Section */}
        <section>
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Mail className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Email Marketing (Omnisend)</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={Users}
              label="Total Subscribers"
              value={omnisend.subscribers.toLocaleString()}
              subValue={`+${omnisend.subscriberGrowth}% growth`}
              iconBg="bg-primary/10"
              iconColor="text-primary"
            />
            <StatCard
              icon={Eye}
              label="Open Rate"
              value={`${omnisend.openRate}%`}
              subValue="Industry avg: 21.5%"
              iconBg="bg-emerald-100"
              iconColor="text-emerald-600"
            />
            <StatCard
              icon={MousePointerClick}
              label="Click Rate"
              value={`${omnisend.clickRate}%`}
              subValue="Industry avg: 2.6%"
              iconBg="bg-blue-100"
              iconColor="text-blue-600"
            />
            <StatCard
              icon={DollarSign}
              label="Email Revenue"
              value={formatCurrency(omnisend.revenueFromEmail)}
              subValue={`${omnisend.campaignsSent} campaigns sent`}
              iconBg="bg-amber-100"
              iconColor="text-amber-600"
            />
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Email Funnel Performance</CardTitle>
              <CardDescription>Conversion funnel from sends to purchases</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <BarChart data={emailFunnelData} layout="vertical" margin={{ top: 10, right: 30, left: 80, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value} />
                  <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelKey="name"
                        formatter={(value) => value.toLocaleString()}
                      />
                    }
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {emailFunnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </section>

        {/* Facebook Ads Section */}
        <section>
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
              <Facebook className="h-4 w-4 text-accent" />
            </div>
            <h2 className="text-xl font-semibold">Facebook Ads</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={DollarSign}
              label="Ad Spend"
              value={formatCurrency(facebookAds.adSpend)}
              subValue="This quarter"
              iconBg="bg-accent/10"
              iconColor="text-accent"
            />
            <StatCard
              icon={TrendingUp}
              label="ROAS"
              value={`${facebookAds.roas}x`}
              subValue={`${formatCurrency(facebookAds.adSpend * facebookAds.roas)} revenue`}
              iconBg="bg-emerald-100"
              iconColor="text-emerald-600"
            />
            <StatCard
              icon={Target}
              label="Conversions"
              value={facebookAds.conversions.toLocaleString()}
              subValue={`$${facebookAds.cpa.toFixed(2)} CPA`}
              iconBg="bg-blue-100"
              iconColor="text-blue-600"
            />
            <StatCard
              icon={MousePointerClick}
              label="CTR"
              value={`${facebookAds.ctr}%`}
              subValue={`${facebookAds.clicks.toLocaleString()} clicks`}
              iconBg="bg-amber-100"
              iconColor="text-amber-600"
            />
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Ads Funnel</CardTitle>
              <CardDescription>From impressions to conversions</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[200px] w-full">
                <BarChart data={adsFunnelData} layout="vertical" margin={{ top: 10, right: 30, left: 80, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" tickFormatter={(value) => value >= 1000000 ? `${(value / 1000000).toFixed(1)}M` : value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value} />
                  <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelKey="name"
                        formatter={(value) => value.toLocaleString()}
                      />
                    }
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {adsFunnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </section>

        {/* Revenue Sources */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Source</CardTitle>
              <CardDescription>Breakdown of revenue attribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                <ChartContainer config={chartConfig} className="h-[250px] w-full lg:w-1/2">
                  <PieChart>
                    <Pie
                      data={revenueSourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {revenueSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          labelKey="name"
                          formatter={(value) => formatCurrency(value as number)}
                        />
                      }
                    />
                  </PieChart>
                </ChartContainer>
                <div className="flex flex-col gap-4 lg:w-1/2">
                  {revenueSourceData.map((source) => {
                    const total = revenueSourceData.reduce((sum, s) => sum + s.value, 0)
                    const percentage = ((source.value / total) * 100).toFixed(1)
                    return (
                      <div key={source.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: source.fill }}
                          />
                          <span className="font-medium">{source.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold">{formatCurrency(source.value)}</span>
                          <span className="ml-2 text-sm text-muted-foreground">({percentage}%)</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  )
}
