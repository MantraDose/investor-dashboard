import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DividendHighlight } from "@/components/dashboard/dividend-highlight"
import { MetricCard } from "@/components/dashboard/metric-card"
import { ProductTable } from "@/components/dashboard/product-table"
import {
  OmnisendCard,
  FacebookAdsCard,
} from "@/components/dashboard/marketing-stats-card"
import {
  currentDividend,
  dashboardMetrics,
  productPerformance,
  marketingData,
} from "@/lib/mock-data"

export default function DashboardPage() {
  return (
    <DashboardLayout title="Overview">
      <div className="flex flex-col gap-6">
        {/* Dividend Highlight */}
        <DividendHighlight data={currentDividend} />

        {/* Metric Cards Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardMetrics.map((metric) => (
            <MetricCard key={metric.label} data={metric} />
          ))}
        </div>

        {/* Product Performance Table */}
        <ProductTable products={productPerformance} />

        {/* Marketing Stats */}
        <div className="grid gap-4 md:grid-cols-2">
          <OmnisendCard data={marketingData.omnisend} />
          <FacebookAdsCard data={marketingData.facebookAds} />
        </div>
      </div>
    </DashboardLayout>
  )
}
