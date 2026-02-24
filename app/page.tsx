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
  marketingData,
} from "@/lib/mock-data"
import { getOverviewData } from "@/lib/get-overview-data"

export default async function DashboardPage() {
  const { metrics, products } = await getOverviewData()

  return (
    <DashboardLayout title="Overview">
      <div className="flex flex-col gap-6">
        {/* Dividend Highlight (mock for v1) */}
        <DividendHighlight data={currentDividend} />

        {/* Metric Cards Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} data={metric} />
          ))}
        </div>

        {/* Product Performance Table */}
        <ProductTable products={products} />

        {/* Marketing Stats (mock for v1) */}
        <div className="grid gap-4 md:grid-cols-2">
          <OmnisendCard data={marketingData.omnisend} />
          <FacebookAdsCard data={marketingData.facebookAds} />
        </div>
      </div>
    </DashboardLayout>
  )
}
