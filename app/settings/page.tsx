import React from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { investorProfile, capTable } from "@/lib/mock-data"
import { User, Mail, Calendar, DollarSign, Percent } from "lucide-react"

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string | number
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0">
      <div className="flex items-center gap-3 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span className="text-sm">{label}</span>
      </div>
      <span className="font-medium">{value}</span>
    </div>
  )
}

export default function SettingsPage() {
  const investmentDate = new Date(investorProfile.investmentDate).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric" }
  )

  return (
    <DashboardLayout
      title="Settings"
      breadcrumbs={[{ label: "Settings" }]}
    >
      <div className="flex flex-col gap-6">
        {/* Account Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your investor profile details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder-avatar.jpg" alt={investorProfile.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">
                    {investorProfile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold">{investorProfile.name}</h3>
                  <p className="text-sm text-muted-foreground">{investorProfile.email}</p>
                  <Badge variant="secondary" className="w-fit mt-1">
                    Preferred Shareholder
                  </Badge>
                </div>
              </div>
              <div className="flex-1 md:border-l md:pl-6">
                <InfoRow icon={User} label="Full Name" value={investorProfile.name} />
                <InfoRow icon={Mail} label="Email" value={investorProfile.email} />
                <InfoRow icon={Calendar} label="Investment Date" value={investmentDate} />
                <InfoRow
                  icon={DollarSign}
                  label="Total Invested"
                  value={formatCurrency(investorProfile.totalInvested)}
                />
                <InfoRow
                  icon={Percent}
                  label="Ownership"
                  value={`${investorProfile.ownershipPercentage}%`}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Investment Summary */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Invested</CardDescription>
              <CardTitle className="text-2xl">
                {formatCurrency(investorProfile.totalInvested)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Initial investment</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Dividends Received</CardDescription>
              <CardTitle className="text-2xl text-primary">
                {formatCurrency(investorProfile.totalDividendsReceived)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-emerald-600">
                {((investorProfile.totalDividendsReceived / investorProfile.totalInvested) * 100).toFixed(1)}% return
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Ownership Percentage</CardDescription>
              <CardTitle className="text-2xl">
                {investorProfile.ownershipPercentage}%
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Preferred shares</p>
            </CardContent>
          </Card>
        </div>

        {/* Cap Table */}
        <Card>
          <CardHeader>
            <CardTitle>Cap Table</CardTitle>
            <CardDescription>Current ownership structure</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Investor</TableHead>
                  <TableHead className="text-right">Ownership</TableHead>
                  <TableHead className="text-right">Share Class</TableHead>
                  <TableHead className="text-right">Investment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {capTable.map((entry) => (
                  <TableRow
                    key={entry.investorName}
                    className={
                      entry.investorName === investorProfile.name
                        ? "bg-primary/5"
                        : ""
                    }
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {entry.investorName}
                        {entry.investorName === investorProfile.name && (
                          <Badge variant="outline" className="text-xs">
                            You
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${entry.ownershipPercentage}%` }}
                          />
                        </div>
                        <span className="w-12">{entry.ownershipPercentage}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">{entry.shareClass}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {entry.investmentAmount > 0
                        ? formatCurrency(entry.investmentAmount)
                        : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Manage how you receive updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Dividend Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications when dividends are issued
                  </p>
                </div>
                <Badge variant="default">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between py-2 border-t">
                <div>
                  <p className="font-medium">Monthly Performance Reports</p>
                  <p className="text-sm text-muted-foreground">
                    Get monthly summaries of company performance
                  </p>
                </div>
                <Badge variant="default">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between py-2 border-t">
                <div>
                  <p className="font-medium">Product Launch Announcements</p>
                  <p className="text-sm text-muted-foreground">
                    Stay informed about new product releases
                  </p>
                </div>
                <Badge variant="secondary">Disabled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
