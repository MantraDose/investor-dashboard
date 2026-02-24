import { getOverviewData } from "@/lib/get-overview-data"
import { ProductsPageContent } from "./products-page-content"

export default async function ProductsPage() {
  const { products } = await getOverviewData()

  return <ProductsPageContent initialProducts={products} />
}
