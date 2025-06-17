"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// EXCLUDE non-series keys
const EXCLUDED_KEYS = ["date"] as const

// Generate a list of keys from the data dynamically
const getChartKeys = (data: Record<string, any>[]) => {
  const sample = data[0] || {}
  return Object.keys(sample).filter((key) => !EXCLUDED_KEYS.includes(key as any))
}

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

export function BarChartInteractive({
  data,
}: {
  data: { [key: string]: number | string }[]
}) {
  const chartKeys = getChartKeys(data)
  const [activeChart, setActiveChart] = React.useState(chartKeys[0] ?? "")

  const colorMap = React.useMemo(() => {
    return chartKeys.reduce((acc, key, i) => {
      acc[key] = COLORS[i % COLORS.length]
      return acc
    }, {} as Record<string, string>)
  }, [chartKeys])

  const total = React.useMemo(() => {
    return chartKeys.reduce((acc, key) => {
      acc[key] = data.reduce((sum, item) => sum + (item[key] as number), 0)
      return acc
    }, {} as Record<string, number>)
  }, [data, chartKeys])

  if (!activeChart) return null

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total values for {chartKeys.length} categories
          </CardDescription>
        </div>
        <div className="flex">
          {chartKeys.map((key) => (
            <button
              key={key}
              data-active={activeChart === key}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => setActiveChart(key)}
            >
              <span className="text-xs text-muted-foreground">{key}</span>
              <span className="text-lg font-bold leading-none sm:text-3xl">
                {total[key]?.toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          className="aspect-auto h-[250px] w-full"
          config={{ [activeChart]: { color: colorMap[activeChart] } }}
        >
          <BarChart
            data={data}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <Tooltip
              cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1 }}
              contentStyle={{
                backgroundColor: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: "0.5rem",
                padding: "0.75rem",
                lineHeight: 1.2,
              }}
              labelStyle={{
                color: "var(--foreground)",
                fontWeight: 800,
                fontSize: "0.75rem",
                marginBottom: "0.25rem",
                
              }}
              itemStyle={{
                color: "var(--muted-foreground)",
                fontSize: "0.75rem",
                padding: "0",
                margin: "0",
                
              }}
              labelFormatter={(val) =>
                new Date(val).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <Bar
              dataKey={activeChart}
              fill={colorMap[activeChart]}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
