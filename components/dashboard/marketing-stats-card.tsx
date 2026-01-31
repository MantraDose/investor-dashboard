import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { OmnisendStats, FacebookAdsStats } from "@/lib/types"
import { Mail, Facebook, TrendingUp, Users, MousePointerClick, DollarSign } from "lucide-react"

interface OmnisendCardProps {
  data: OmnisendStats
  className?: string
}

interface FacebookAdsCardProps {
  data: FacebookAdsStats
  className?: string
}

function StatRow({
  icon: Icon,
  label,
  value,
  subValue,
}: {
  icon: React.ElementType
  label: string
  value: string | number
  subValue?: string
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span className="text-sm">{label}</span>
      </div>
      <div className="text-right">
        <span className="font-medium">{value}</span>
        {subValue && (
          <span className="text-xs text-muted-foreground ml-1">{subValue}</span>
        )}
      </div>
    </div>
  )
}

export function OmnisendCard({ data, className }: OmnisendCardProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Mail className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-base">Omnisend</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="divide-y">
        <StatRow
          icon={Users}
          label="Subscribers"
          value={data.subscribers.toLocaleString()}
          subValue={`+${data.subscriberGrowth}%`}
        />
        <StatRow
          icon={Mail}
          label="Open Rate"
          value={`${data.openRate}%`}
        />
        <StatRow
          icon={MousePointerClick}
          label="Click Rate"
          value={`${data.clickRate}%`}
        />
        <StatRow
          icon={DollarSign}
          label="Email Revenue"
          value={formatCurrency(data.revenueFromEmail)}
        />
        <StatRow
          icon={TrendingUp}
          label="Campaigns Sent"
          value={data.campaignsSent}
        />
      </CardContent>
    </Card>
  )
}

export function FacebookAdsCard({ data, className }: FacebookAdsCardProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
            <Facebook className="h-4 w-4 text-accent" />
          </div>
          <CardTitle className="text-base">Facebook Ads</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="divide-y">
        <StatRow
          icon={DollarSign}
          label="Ad Spend"
          value={formatCurrency(data.adSpend)}
        />
        <StatRow
          icon={TrendingUp}
          label="ROAS"
          value={`${data.roas}x`}
        />
        <StatRow
          icon={Users}
          label="Impressions"
          value={(data.impressions / 1000000).toFixed(2) + "M"}
        />
        <StatRow
          icon={MousePointerClick}
          label="CTR"
          value={`${data.ctr}%`}
        />
        <StatRow
          icon={DollarSign}
          label="CPA"
          value={`$${data.cpa.toFixed(2)}`}
        />
      </CardContent>
    </Card>
  )
}
