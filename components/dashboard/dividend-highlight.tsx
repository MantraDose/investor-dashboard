import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { DividendData } from "@/lib/types"
import { Calendar, Percent } from "lucide-react"

interface DividendHighlightProps {
  data: DividendData
  className?: string
}

export function DividendHighlight({ data, className }: DividendHighlightProps) {
  const { amount, period, ownershipPercentage, payoutDate } = data

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)

  const formattedDate = new Date(payoutDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <Card className={cn("bg-gradient-to-br from-primary/10 via-background to-accent/10 border-primary/20", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium text-muted-foreground">
            Your Dividend
          </CardTitle>
          <Badge variant="secondary" className="font-medium">
            {period}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-4xl font-bold tracking-tight text-primary">
            {formattedAmount}
          </p>
          <p className="text-sm text-muted-foreground">
            Based on quarterly performance
          </p>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Percent className="h-4 w-4" />
            <span>
              <span className="font-medium text-foreground">{ownershipPercentage}%</span>{" "}
              ownership
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              Payout:{" "}
              <span className="font-medium text-foreground">{formattedDate}</span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
