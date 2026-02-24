"use client"

import React from "react"
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
import { cn } from "@/lib/utils"
import {
  Camera,
  Users,
  Heart,
  MessageCircle,
  Eye,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Play,
  ImageIcon,
  LayoutGrid,
  Share2,
  Bookmark,
} from "lucide-react"

// --- Instagram mock data ---

const accountOverview = {
  handle: "@mantradose",
  followers: 14832,
  followerGrowth: 4.7,
  following: 486,
  posts: 312,
  avgEngagementRate: 5.3,
  reach30d: 89400,
  impressions30d: 142600,
  profileVisits30d: 3240,
  websiteClicks30d: 876,
}

const followerGrowthData = [
  { month: "Jul", followers: 12100 },
  { month: "Aug", followers: 12540 },
  { month: "Sep", followers: 13020 },
  { month: "Oct", followers: 13490 },
  { month: "Nov", followers: 14120 },
  { month: "Dec", followers: 14832 },
]

const engagementByType = [
  { type: "Reels", likes: 4820, comments: 312, shares: 589, saves: 743 },
  { type: "Carousels", likes: 3410, comments: 278, shares: 194, saves: 512 },
  { type: "Single Image", likes: 1890, comments: 142, shares: 87, saves: 203 },
  { type: "Stories", likes: 0, comments: 0, shares: 124, saves: 0 },
]

const weeklyEngagement = [
  { week: "W1 Dec", likes: 2810, comments: 198, shares: 234, saves: 312 },
  { week: "W2 Dec", likes: 3140, comments: 224, shares: 267, saves: 354 },
  { week: "W3 Dec", likes: 2650, comments: 186, shares: 198, saves: 278 },
  { week: "W4 Dec", likes: 3480, comments: 258, shares: 301, saves: 398 },
]

const topPosts = [
  {
    id: "1",
    type: "Reel" as const,
    caption: "New year, new energy. MantraDose Gummies are here to fuel your 2026.",
    likes: 1842,
    comments: 147,
    shares: 234,
    saves: 312,
    reach: 18400,
    date: "Dec 28",
  },
  {
    id: "2",
    type: "Carousel" as const,
    caption: "5 ways to incorporate adaptogens into your daily routine.",
    likes: 1356,
    comments: 98,
    shares: 156,
    saves: 287,
    reach: 14200,
    date: "Dec 22",
  },
  {
    id: "3",
    type: "Reel" as const,
    caption: "Behind the scenes: How our bars are made with real ingredients.",
    likes: 1204,
    comments: 89,
    shares: 178,
    saves: 245,
    reach: 12800,
    date: "Dec 15",
  },
  {
    id: "4",
    type: "Single Image" as const,
    caption: "Holiday gift guide: The perfect wellness stocking stuffers.",
    likes: 987,
    comments: 72,
    shares: 64,
    saves: 198,
    reach: 9600,
    date: "Dec 10",
  },
  {
    id: "5",
    type: "Carousel" as const,
    caption: "Customer spotlight: How @wellnessjane uses MantraDose daily.",
    likes: 876,
    comments: 64,
    shares: 45,
    saves: 156,
    reach: 8200,
    date: "Dec 5",
  },
]

const audienceDemographics = {
  ageGroups: [
    { range: "18-24", percentage: 18 },
    { range: "25-34", percentage: 38 },
    { range: "35-44", percentage: 26 },
    { range: "45-54", percentage: 12 },
    { range: "55+", percentage: 6 },
  ],
  genderSplit: { female: 64, male: 33, other: 3 },
  topCities: [
    { city: "Los Angeles", percentage: 14 },
    { city: "New York", percentage: 11 },
    { city: "Miami", percentage: 8 },
    { city: "Chicago", percentage: 6 },
    { city: "Austin", percentage: 5 },
  ],
}

const chartConfig = {
  followers: { label: "Followers", color: "#dd0a8b" },
  likes: { label: "Likes", color: "#dd0a8b" },
  comments: { label: "Comments", color: "#3E32BF" },
  shares: { label: "Shares", color: "#10b981" },
  saves: { label: "Saves", color: "#f59e0b" },
}

const formatNumber = (value: number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`
  return value.toLocaleString()
}

// --- Components ---

function OverviewStat({
  icon: Icon,
  label,
  value,
  change,
  iconBg,
  iconColor,
}: {
  icon: React.ElementType
  label: string
  value: string
  change?: { value: number; direction: "up" | "down" }
  iconBg: string
  iconColor: string
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-lg", iconBg)}>
            <Icon className={cn("h-6 w-6", iconColor)} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground">{label}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-semibold">{value}</p>
              {change && (
                <span
                  className={cn(
                    "flex items-center text-xs font-medium",
                    change.direction === "up" ? "text-emerald-500" : "text-red-500"
                  )}
                >
                  {change.direction === "up" ? (
                    <ArrowUpRight className="mr-0.5 h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="mr-0.5 h-3 w-3" />
                  )}
                  {change.value}%
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function PostTypeIcon({ type }: { type: string }) {
  switch (type) {
    case "Reel":
      return <Play className="h-3.5 w-3.5" />
    case "Carousel":
      return <LayoutGrid className="h-3.5 w-3.5" />
    case "Single Image":
      return <ImageIcon className="h-3.5 w-3.5" />
    default:
      return <ImageIcon className="h-3.5 w-3.5" />
  }
}

export default function SocialMediaPage() {
  return (
    <DashboardLayout
      title="Social Media"
      breadcrumbs={[{ label: "Social Media" }]}
    >
      <div className="flex flex-col gap-8">
        {/* Instagram Header */}
        <section>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-tr from-amber-500 via-pink-500 to-purple-600">
              <Camera className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Instagram</h2>
              <p className="text-sm text-muted-foreground">{accountOverview.handle}</p>
            </div>
            <Badge variant="secondary" className="ml-auto">Last 30 days</Badge>
          </div>

          {/* Overview Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <OverviewStat
              icon={Users}
              label="Followers"
              value={formatNumber(accountOverview.followers)}
              change={{ value: accountOverview.followerGrowth, direction: "up" }}
              iconBg="bg-primary/10"
              iconColor="text-primary"
            />
            <OverviewStat
              icon={Heart}
              label="Engagement Rate"
              value={`${accountOverview.avgEngagementRate}%`}
              change={{ value: 0.8, direction: "up" }}
              iconBg="bg-rose-500/10"
              iconColor="text-rose-500"
            />
            <OverviewStat
              icon={Eye}
              label="Reach"
              value={formatNumber(accountOverview.reach30d)}
              change={{ value: 12.3, direction: "up" }}
              iconBg="bg-blue-500/10"
              iconColor="text-blue-500"
            />
            <OverviewStat
              icon={TrendingUp}
              label="Website Clicks"
              value={formatNumber(accountOverview.websiteClicks30d)}
              change={{ value: 6.1, direction: "up" }}
              iconBg="bg-emerald-500/10"
              iconColor="text-emerald-500"
            />
          </div>
        </section>

        {/* Follower Growth Chart */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Follower Growth</CardTitle>
              <CardDescription>Net new followers over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[260px] w-full">
                <AreaChart data={followerGrowthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="followerGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#dd0a8b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#dd0a8b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => formatNumber(v)}
                    domain={["dataMin - 500", "dataMax + 500"]}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelKey="month"
                        formatter={(value) => formatNumber(value as number)}
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="followers"
                    stroke="#dd0a8b"
                    strokeWidth={2}
                    fill="url(#followerGradient)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </section>

        {/* Weekly Engagement Breakdown */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Weekly Engagement</CardTitle>
              <CardDescription>Likes, comments, shares, and saves this month</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[280px] w-full">
                <BarChart data={weeklyEngagement} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="week" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent labelKey="week" />} />
                  <Bar dataKey="likes" stackId="a" fill="#dd0a8b" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="comments" stackId="a" fill="#3E32BF" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="shares" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="saves" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
                {Object.entries(chartConfig)
                  .filter(([key]) => key !== "followers")
                  .map(([key, config]) => (
                    <div key={key} className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: config.color }} />
                      <span className="text-sm text-muted-foreground">{config.label}</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Engagement by Content Type + Top Posts */}
        <section className="grid gap-4 lg:grid-cols-2">
          {/* Engagement by Post Type */}
          <Card>
            <CardHeader>
              <CardTitle>Engagement by Content Type</CardTitle>
              <CardDescription>Performance breakdown by format</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {engagementByType.map((row) => {
                  const total = row.likes + row.comments + row.shares + row.saves
                  return (
                    <div key={row.type} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{row.type}</span>
                        <span className="text-sm text-muted-foreground">{formatNumber(total)} interactions</span>
                      </div>
                      <div className="flex h-2 overflow-hidden rounded-full bg-muted">
                        {total > 0 && (
                          <>
                            <div
                              className="h-full"
                              style={{ width: `${(row.likes / total) * 100}%`, backgroundColor: "#dd0a8b" }}
                            />
                            <div
                              className="h-full"
                              style={{ width: `${(row.comments / total) * 100}%`, backgroundColor: "#3E32BF" }}
                            />
                            <div
                              className="h-full"
                              style={{ width: `${(row.shares / total) * 100}%`, backgroundColor: "#10b981" }}
                            />
                            <div
                              className="h-full"
                              style={{ width: `${(row.saves / total) * 100}%`, backgroundColor: "#f59e0b" }}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Audience Demographics */}
          <Card>
            <CardHeader>
              <CardTitle>Audience Demographics</CardTitle>
              <CardDescription>Who follows {accountOverview.handle}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                {/* Age Groups */}
                <div>
                  <p className="mb-3 text-sm font-medium text-muted-foreground">Age Distribution</p>
                  <div className="flex flex-col gap-2">
                    {audienceDemographics.ageGroups.map((group) => (
                      <div key={group.range} className="flex items-center gap-3">
                        <span className="w-12 text-sm text-muted-foreground">{group.range}</span>
                        <div className="flex-1">
                          <div className="h-2 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-primary"
                              style={{ width: `${group.percentage}%` }}
                            />
                          </div>
                        </div>
                        <span className="w-10 text-right text-sm font-medium">{group.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <p className="mb-3 text-sm font-medium text-muted-foreground">Gender</p>
                  <div className="flex h-3 overflow-hidden rounded-full">
                    <div className="h-full bg-primary" style={{ width: `${audienceDemographics.genderSplit.female}%` }} />
                    <div className="h-full bg-blue-500" style={{ width: `${audienceDemographics.genderSplit.male}%` }} />
                    <div className="h-full bg-muted-foreground" style={{ width: `${audienceDemographics.genderSplit.other}%` }} />
                  </div>
                  <div className="mt-2 flex gap-4 text-sm">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      Female {audienceDemographics.genderSplit.female}%
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                      Male {audienceDemographics.genderSplit.male}%
                    </span>
                  </div>
                </div>

                {/* Top Cities */}
                <div>
                  <p className="mb-3 text-sm font-medium text-muted-foreground">Top Cities</p>
                  <div className="flex flex-col gap-1.5">
                    {audienceDemographics.topCities.map((city) => (
                      <div key={city.city} className="flex items-center justify-between text-sm">
                        <span>{city.city}</span>
                        <span className="font-medium">{city.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Top Posts Table */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Posts</CardTitle>
              <CardDescription>Highest engagement posts from the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {topPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:gap-4"
                  >
                    <div className="flex items-center gap-3 sm:w-2/5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
                        {index + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <Badge variant="outline" className="gap-1 text-xs">
                            <PostTypeIcon type={post.type} />
                            {post.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{post.date}</span>
                        </div>
                        <p className="truncate text-sm">{post.caption}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm sm:ml-auto sm:gap-6">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Heart className="h-3.5 w-3.5 text-rose-500" />
                        {formatNumber(post.likes)}
                      </span>
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <MessageCircle className="h-3.5 w-3.5 text-blue-500" />
                        {post.comments}
                      </span>
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Share2 className="h-3.5 w-3.5 text-emerald-500" />
                        {post.shares}
                      </span>
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Bookmark className="h-3.5 w-3.5 text-amber-500" />
                        {post.saves}
                      </span>
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Eye className="h-3.5 w-3.5" />
                        {formatNumber(post.reach)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  )
}
