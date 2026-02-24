import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { MetricCard } from "@/components/dashboard/metric-card"
import { ProductTable } from "@/components/dashboard/product-table"
import {
  OmnisendCard,
  FacebookAdsCard,
} from "@/components/dashboard/marketing-stats-card"
import {
  marketingData,
} from "@/lib/mock-data"
import { getOverviewData } from "@/lib/get-overview-data"

export default async function DashboardPage() {
  const { metrics, products } = await getOverviewData()

  return (
    <DashboardLayout title="Dashboard">
      <div className="flex flex-col gap-6">
        {/* Metric Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} data={metric} />
          ))}
        </div>

        {/* Product Performance Table */}
        <ProductTable products={products} />

        {/* Marketing Stats (mock for v1) */}
        <div className="grid gap-6 md:grid-cols-2">
          <OmnisendCard data={marketingData.omnisend} />
          <FacebookAdsCard data={marketingData.facebookAds} />
        </div>
      </div>
    </DashboardLayout>
  )
}
