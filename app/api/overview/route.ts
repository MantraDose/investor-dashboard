/**
 * Overview data for the dashboard (metrics and product performance).
 * Fetches from Zoho Inventory when configured; falls back to mock on error or missing config.
 * No Zoho-specific errors or credentials are exposed to the client.
 */

import { NextResponse } from "next/server"
import { getOverviewData } from "@/lib/get-overview-data"

export async function GET() {
  const data = await getOverviewData()
  return NextResponse.json(data)
}
