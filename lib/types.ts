// Dashboard Types for MantraDose Investor Dashboard

export interface DividendData {
  amount: number
  period: string
  ownershipPercentage: number
  payoutDate: string
}

export interface MetricCardData {
  label: string
  value: string | number
  trend?: {
    value: number
    direction: "up" | "down" | "neutral"
  }
  sparkline?: number[]
  subtitle?: string
}

export interface ProductPerformance {
  id: string
  name: string
  sku: string
  revenueShare: number
  unitsSold: number
  revenue: number
  avgOrderValue: number
  returnRate: number
}

export interface MonthlyRevenue {
  month: string
  revenue: number
  orders: number
  avgOrderValue: number
}

export interface YearlyComparison {
  year: number
  totalRevenue: number
  totalOrders: number
  avgOrderValue: number
  dividendsPaid: number
}

export interface OmnisendStats {
  subscribers: number
  subscriberGrowth: number
  openRate: number
  clickRate: number
  revenueFromEmail: number
  campaignsSent: number
}

export interface FacebookAdsStats {
  adSpend: number
  roas: number
  impressions: number
  clicks: number
  ctr: number
  conversions: number
  cpa: number
}

export interface MarketingData {
  omnisend: OmnisendStats
  facebookAds: FacebookAdsStats
}

export interface InvestorProfile {
  name: string
  email: string
  ownershipPercentage: number
  investmentDate: string
  totalInvested: number
  totalDividendsReceived: number
}

export interface CapTableEntry {
  investorName: string
  ownershipPercentage: number
  shareClass: string
  investmentAmount: number
}

export interface DividendHistoryEntry {
  id: string
  period: string
  amount: number
  payoutDate: string
  status: "paid" | "pending" | "scheduled"
}

export interface RevenueBreakdown {
  category: string
  amount: number
  percentage: number
}

export interface ChartDataPoint {
  name: string
  value: number
  [key: string]: string | number
}
