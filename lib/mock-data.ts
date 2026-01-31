import type {
  DividendData,
  MetricCardData,
  ProductPerformance,
  MonthlyRevenue,
  YearlyComparison,
  MarketingData,
  InvestorProfile,
  CapTableEntry,
  DividendHistoryEntry,
} from "./types"

// YTD Total Payout: $132,055.73
// At 12.5% ownership = $16,506.97 YTD
export const currentDividend: DividendData = {
  amount: 16506.97,
  period: "YTD 2025",
  ownershipPercentage: 12.5,
  payoutDate: "2026-01-15",
}

export const dashboardMetrics: MetricCardData[] = [
  {
    label: "YTD Revenue",
    value: "$1,964,274",
    trend: { value: 18.2, direction: "up" },
    sparkline: [178796, 96818, 149240, 211103, 151133, 165914, 210863, 123258, 171076, 170094, 177019, 158956],
    subtitle: "Total sales across all products",
  },
  {
    label: "Units Sold",
    value: "116,629",
    trend: { value: 12.4, direction: "up" },
    sparkline: [10353, 5091, 8413, 14411, 8934, 9576, 15280, 6717, 12306, 9369, 9029, 7150],
    subtitle: "YTD units across all SKUs",
  },
  {
    label: "Avg Order Value",
    value: "$16.84",
    trend: { value: 2.1, direction: "up" },
    sparkline: [17.26, 19.02, 17.74, 14.65, 16.92, 17.33, 13.80, 18.35, 13.90, 18.15, 19.61, 22.24],
    subtitle: "Revenue / Units sold",
  },
  {
    label: "YTD Dividends",
    value: "$132,056",
    trend: { value: 15.8, direction: "up" },
    sparkline: [11887, 7296, 9434, 13107, 10992, 10916, 13594, 8871, 11320, 11592, 11861, 11179],
    subtitle: "Total shareholder payouts",
  },
]

export const productPerformance: ProductPerformance[] = [
  {
    id: "1",
    name: "Gummy",
    sku: "GUMMY-001",
    revenueShare: 42.6,
    unitsSold: 50609,
    revenue: 836946.50,
    avgOrderValue: 16.54,
    returnRate: 1.2,
  },
  {
    id: "2",
    name: "Bars",
    sku: "BARS-001",
    revenueShare: 36.4,
    unitsSold: 45849,
    revenue: 714654.50,
    avgOrderValue: 15.59,
    returnRate: 1.5,
  },
  {
    id: "3",
    name: "Capsules",
    sku: "CAPS-001",
    revenueShare: 15.4,
    unitsSold: 13268,
    revenue: 302477.00,
    avgOrderValue: 22.80,
    returnRate: 0.9,
  },
  {
    id: "4",
    name: "Mini-Bar",
    sku: "MINI-001",
    revenueShare: 5.6,
    unitsSold: 6903,
    revenue: 110196.00,
    avgOrderValue: 15.96,
    returnRate: 1.8,
  },
]

export const monthlyRevenue: MonthlyRevenue[] = [
  { month: "Jan", revenue: 178796.50, orders: 10353, avgOrderValue: 17.27 },
  { month: "Feb", revenue: 96818.50, orders: 5091, avgOrderValue: 19.02 },
  { month: "Mar", revenue: 149240.50, orders: 8413, avgOrderValue: 17.74 },
  { month: "Apr", revenue: 211103.50, orders: 14411, avgOrderValue: 14.65 },
  { month: "May", revenue: 151133.50, orders: 8934, avgOrderValue: 16.92 },
  { month: "Jun", revenue: 165914.00, orders: 9576, avgOrderValue: 17.33 },
  { month: "Jul", revenue: 210863.00, orders: 15280, avgOrderValue: 13.80 },
  { month: "Aug", revenue: 123258.00, orders: 6717, avgOrderValue: 18.35 },
  { month: "Sep", revenue: 171076.25, orders: 12306, avgOrderValue: 13.90 },
  { month: "Oct", revenue: 170094.50, orders: 9369, avgOrderValue: 18.16 },
  { month: "Nov", revenue: 177019.75, orders: 9029, avgOrderValue: 19.61 },
  { month: "Dec", revenue: 158956.00, orders: 7150, avgOrderValue: 22.24 },
]

// Monthly product breakdown for charts
export const monthlyProductSales = [
  { month: "Jan", bars: 89224.50, gummy: 50818.00, capsules: 26300.00, miniBar: 12454.00 },
  { month: "Feb", bars: 36093.00, gummy: 40734.00, capsules: 13086.50, miniBar: 6905.00 },
  { month: "Mar", bars: 49398.50, gummy: 65805.00, capsules: 23628.00, miniBar: 10409.00 },
  { month: "Apr", bars: 105446.00, gummy: 60240.00, capsules: 26210.50, miniBar: 19207.00 },
  { month: "May", bars: 40467.50, gummy: 76888.00, capsules: 21171.00, miniBar: 12607.00 },
  { month: "Jun", bars: 47276.00, gummy: 86329.50, capsules: 27928.50, miniBar: 4380.00 },
  { month: "Jul", bars: 72383.00, gummy: 100528.00, capsules: 28007.00, miniBar: 9945.00 },
  { month: "Aug", bars: 30558.00, gummy: 65784.00, capsules: 20215.00, miniBar: 6701.00 },
  { month: "Sep", bars: 72029.00, gummy: 71071.75, capsules: 21737.50, miniBar: 6238.00 },
  { month: "Oct", bars: 47654.50, gummy: 80903.50, capsules: 36203.50, miniBar: 5333.00 },
  { month: "Nov", bars: 67973.00, gummy: 73430.25, capsules: 28156.50, miniBar: 7460.00 },
  { month: "Dec", bars: 56151.50, gummy: 64414.50, capsules: 29833.00, miniBar: 8557.00 },
]

// Monthly unit quantities
export const monthlyProductUnits = [
  { month: "Jan", bars: 5860, gummy: 2579, capsules: 332, miniBar: 1582 },
  { month: "Feb", bars: 2005, gummy: 2043, capsules: 597, miniBar: 446 },
  { month: "Mar", bars: 2986, gummy: 3447, capsules: 1257, miniBar: 723 },
  { month: "Apr", bars: 7901, gummy: 3684, capsules: 1492, miniBar: 1334 },
  { month: "May", bars: 2167, gummy: 5360, capsules: 840, miniBar: 567 },
  { month: "Jun", bars: 2690, gummy: 5223, capsules: 1449, miniBar: 214 },
  { month: "Jul", bars: 6170, gummy: 7036, capsules: 1658, miniBar: 416 },
  { month: "Aug", bars: 2157, gummy: 3186, capsules: 951, miniBar: 423 },
  { month: "Sep", bars: 6231, gummy: 4861, capsules: 890, miniBar: 324 },
  { month: "Oct", bars: 2963, gummy: 4431, capsules: 1762, miniBar: 213 },
  { month: "Nov", bars: 2264, gummy: 5345, capsules: 1106, miniBar: 314 },
  { month: "Dec", bars: 2455, gummy: 3414, capsules: 934, miniBar: 347 },
]

// Dividend breakdown by channel
export const dividendBreakdown = {
  wholesale: {
    ytdRevenue: 1386714.50,
    payoutRate: 0.05,
    ytdPayout: 69335.73,
  },
  retail: {
    ytdRevenue: 627200.00,
    payoutRate: 0.10,
    ytdPayout: 62720.00,
  },
  totalPayout: 132055.73,
}

// Monthly dividend payouts
export const monthlyDividends = [
  { month: "Jan", wholesale: 8896.80, retail: 2991.00, total: 11887.80 },
  { month: "Feb", wholesale: 3835.90, retail: 3460.20, total: 7296.10 },
  { month: "Mar", wholesale: 5807.45, retail: 3627.50, total: 9434.95 },
  { month: "Apr", wholesale: 9552.40, retail: 3554.80, total: 13107.20 },
  { month: "May", wholesale: 5665.80, retail: 5327.00, total: 10992.80 },
  { month: "Jun", wholesale: 5671.85, retail: 5244.70, total: 10916.55 },
  { month: "Jul", wholesale: 7502.00, retail: 6092.30, total: 13594.30 },
  { month: "Aug", wholesale: 3452.95, retail: 5418.85, total: 8871.80 },
  { month: "Sep", wholesale: 5786.89, retail: 5533.85, total: 11320.74 },
  { month: "Oct", wholesale: 5417.35, retail: 6174.75, total: 11592.10 },
  { month: "Nov", wholesale: 4382.79, retail: 7478.65, total: 11861.44 },
  { month: "Dec", wholesale: 3363.55, retail: 7816.40, total: 11179.95 },
]

export const yearlyComparison: YearlyComparison[] = [
  {
    year: 2023,
    totalRevenue: 1245000,
    totalOrders: 78500,
    avgOrderValue: 15.86,
    dividendsPaid: 87150,
  },
  {
    year: 2024,
    totalRevenue: 1654000,
    totalOrders: 98200,
    avgOrderValue: 16.84,
    dividendsPaid: 115780,
  },
  {
    year: 2025,
    totalRevenue: 1964274,
    totalOrders: 116629,
    avgOrderValue: 16.84,
    dividendsPaid: 132056,
  },
]

export const marketingData: MarketingData = {
  omnisend: {
    subscribers: 24580,
    subscriberGrowth: 15.2,
    openRate: 42.8,
    clickRate: 8.4,
    revenueFromEmail: 38420,
    campaignsSent: 24,
  },
  facebookAds: {
    adSpend: 12450,
    roas: 4.2,
    impressions: 1245000,
    clicks: 18675,
    ctr: 1.5,
    conversions: 892,
    cpa: 13.96,
  },
}

export const investorProfile: InvestorProfile = {
  name: "Alex Chen",
  email: "alex.chen@email.com",
  ownershipPercentage: 12.5,
  investmentDate: "2022-03-15",
  totalInvested: 50000,
  totalDividendsReceived: 16506.97,
}

export const capTable: CapTableEntry[] = [
  {
    investorName: "Founder Holdings LLC",
    ownershipPercentage: 55.0,
    shareClass: "Common",
    investmentAmount: 0,
  },
  {
    investorName: "Alex Chen",
    ownershipPercentage: 12.5,
    shareClass: "Preferred",
    investmentAmount: 50000,
  },
  {
    investorName: "Sarah Johnson",
    ownershipPercentage: 10.0,
    shareClass: "Preferred",
    investmentAmount: 40000,
  },
  {
    investorName: "Michael Park",
    ownershipPercentage: 8.5,
    shareClass: "Preferred",
    investmentAmount: 34000,
  },
  {
    investorName: "Emily Rodriguez",
    ownershipPercentage: 7.0,
    shareClass: "Preferred",
    investmentAmount: 28000,
  },
  {
    investorName: "David Kim",
    ownershipPercentage: 7.0,
    shareClass: "Preferred",
    investmentAmount: 28000,
  },
]

export const dividendHistory: DividendHistoryEntry[] = [
  { id: "1", period: "Dec 2025", amount: 1397.49, payoutDate: "2026-01-15", status: "scheduled" },
  { id: "2", period: "Nov 2025", amount: 1482.68, payoutDate: "2025-12-15", status: "paid" },
  { id: "3", period: "Oct 2025", amount: 1449.01, payoutDate: "2025-11-15", status: "paid" },
  { id: "4", period: "Sep 2025", amount: 1415.09, payoutDate: "2025-10-15", status: "paid" },
  { id: "5", period: "Aug 2025", amount: 1108.98, payoutDate: "2025-09-15", status: "paid" },
  { id: "6", period: "Jul 2025", amount: 1699.29, payoutDate: "2025-08-15", status: "paid" },
  { id: "7", period: "Jun 2025", amount: 1364.57, payoutDate: "2025-07-15", status: "paid" },
  { id: "8", period: "May 2025", amount: 1374.10, payoutDate: "2025-06-15", status: "paid" },
  { id: "9", period: "Apr 2025", amount: 1638.40, payoutDate: "2025-05-15", status: "paid" },
  { id: "10", period: "Mar 2025", amount: 1179.37, payoutDate: "2025-04-15", status: "paid" },
  { id: "11", period: "Feb 2025", amount: 912.01, payoutDate: "2025-03-15", status: "paid" },
  { id: "12", period: "Jan 2025", amount: 1485.98, payoutDate: "2025-02-15", status: "paid" },
]
