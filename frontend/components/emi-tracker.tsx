"use client"

import { AlertCircle, Calendar } from "lucide-react"
import { format, addMonths } from "date-fns"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const today = new Date()

const loans = [
  {
    id: 1,
    name: "Home Loan",
    lender: "SBI",
    totalAmount: 3500000,
    remainingAmount: 2800000,
    emi: 28000,
    nextDueDate: addMonths(today, 0).setDate(5),
    totalTenure: 180,
    paidTenure: 42,
    interestRate: 8.5,
  },
  {
    id: 2,
    name: "Car Loan",
    lender: "HDFC Bank",
    totalAmount: 800000,
    remainingAmount: 480000,
    emi: 12000,
    nextDueDate: addMonths(today, 0).setDate(10),
    totalTenure: 60,
    paidTenure: 24,
    interestRate: 9.25,
  },
  {
    id: 3,
    name: "Personal Loan",
    lender: "ICICI Bank",
    totalAmount: 300000,
    remainingAmount: 180000,
    emi: 9500,
    nextDueDate: addMonths(today, 0).setDate(15),
    totalTenure: 36,
    paidTenure: 12,
    interestRate: 12.5,
  },
  {
    id: 4,
    name: "Education Loan",
    lender: "Axis Bank",
    totalAmount: 500000,
    remainingAmount: 200000,
    emi: 8000,
    nextDueDate: addMonths(today, 0).setDate(20),
    totalTenure: 60,
    paidTenure: 36,
    interestRate: 10.75,
  },
]

export function EmiTracker() {
  // Calculate days until next payment
  const getDaysUntil = (date: number | Date) => {
    const dueDate = new Date(date)
    const timeDiff = dueDate.getTime() - today.getTime()
    return Math.ceil(timeDiff / (1000 * 3600 * 24))
  }

  // Get badge color based on days remaining
  const getBadgeVariant = (days: number) => {
    if (days < 0) return "destructive"
    if (days <= 3) return "destructive"
    if (days <= 7) return "warning"
    return "outline"
  }

  // Get badge text based on days remaining
  const getBadgeText = (days: number) => {
    if (days < 0) return "Overdue"
    if (days === 0) return "Due Today"
    return `${days} days left`
  }

  // Calculate total monthly EMI
  const totalMonthlyEmi = loans.reduce((sum, loan) => sum + loan.emi, 0)

  return (
    <>
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>EMI Payment Reminder</AlertTitle>
        <AlertDescription>
          Your Home Loan EMI of ₹28,000 is due in {getDaysUntil(loans[0].nextDueDate)} days. Make sure to keep
          sufficient balance in your account.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>EMI Summary</CardTitle>
          <CardDescription>Your total monthly EMI burden is ₹{totalMonthlyEmi.toLocaleString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {loans.map((loan) => {
              const progressPercent = (loan.paidTenure / loan.totalTenure) * 100
              const daysUntilPayment = getDaysUntil(loan.nextDueDate)

              return (
                <div key={loan.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{loan.name}</h3>
                      <p className="text-sm text-muted-foreground">{loan.lender}</p>
                    </div>
                    <Badge variant={getBadgeVariant(daysUntilPayment)}>{getBadgeText(daysUntilPayment)}</Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Next Due: {format(loan.nextDueDate, "dd MMM yyyy")}</span>
                    </div>
                    <span>EMI: ₹{loan.emi.toLocaleString()}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>
                        Progress: {loan.paidTenure}/{loan.totalTenure} months
                      </span>
                      <span>{progressPercent.toFixed(0)}%</span>
                    </div>
                    <Progress value={progressPercent} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Loan</p>
                      <p>₹{(loan.totalAmount / 100000).toFixed(1)} Lakh</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Remaining</p>
                      <p>₹{(loan.remainingAmount / 100000).toFixed(1)} Lakh</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </>
  )
}

