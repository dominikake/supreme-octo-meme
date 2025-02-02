"use client"

import { useState } from "react"
import { addDays, addMonths, addYears, format, subDays, subMonths, subYears } from "date-fns"
import { Calendar } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DateCalculator() {
  const [date, setDate] = useState<Date>(new Date())
  const [operation, setOperation] = useState<"add" | "subtract">("add")
  const [unit, setUnit] = useState<"days" | "months" | "years">("days")
  const [amount, setAmount] = useState<number>(1)
  const [resultDate, setResultDate] = useState<Date>(new Date())

  const calculateNewDate = (
    baseDate: Date,
    op: "add" | "subtract",
    amt: number,
    timeUnit: "days" | "months" | "years",
  ) => {
    if (op === "add") {
      switch (timeUnit) {
        case "days":
          return addDays(baseDate, amt)
        case "months":
          return addMonths(baseDate, amt)
        case "years":
          return addYears(baseDate, amt)
      }
    } else {
      switch (timeUnit) {
        case "days":
          return subDays(baseDate, amt)
        case "months":
          return subMonths(baseDate, amt)
        case "years":
          return subYears(baseDate, amt)
      }
    }
  }

  const handleCalculation = () => {
    const newDate = calculateNewDate(date, operation, amount, unit)
    setResultDate(newDate)
  }

  // Recalculate whenever any input changes
  useState(() => {
    handleCalculation()
  }, [date, operation, amount, unit])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 dark:from-gray-900 dark:to-gray-800">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Date Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Operation</Label>
            <RadioGroup
              defaultValue="add"
              onValueChange={(value) => setOperation(value as "add" | "subtract")}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="add" id="add" />
                <Label htmlFor="add">Add</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="subtract" id="subtract" />
                <Label htmlFor="subtract">Subtract</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                type="number"
                min={1}
                value={amount}
                onChange={(e) => setAmount(Number.parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="space-y-2">
              <Label>Unit</Label>
              <Select value={unit} onValueChange={(value) => setUnit(value as any)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="days">Days</SelectItem>
                  <SelectItem value="months">Months</SelectItem>
                  <SelectItem value="years">Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm font-medium text-muted-foreground">Result:</p>
            <p className="mt-1 text-lg font-semibold">{format(resultDate, "EEEE, MMMM d, yyyy")}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

