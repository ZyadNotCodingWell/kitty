/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function DynamicPieChart({ fileUrl }: { fileUrl: string }) {
  const [data, setData] = React.useState<any[]>([])
  const [labelKey, setLabelKey] = React.useState<string>("")
  const [valueKey, setValueKey] = React.useState<string>("")
  const [activeLabel, setActiveLabel] = React.useState<string>("")
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:8000/proxy-csv?fileUrl=${encodeURIComponent(fileUrl)}`)
        const json = await res.json()
        if (!json.length) throw new Error("Empty data")

        const sample = json[0]
        const allKeys = Object.keys(sample)
        const label = allKeys.find(k => typeof sample[k] === "string") || allKeys[0]
        const value = allKeys.find(k => typeof sample[k] === "number") || allKeys[1]

        setData(json)
        setLabelKey(label)
        setValueKey(value)
        setActiveLabel(json[0]?.[label])
      } catch (err) {
        setError("Failed to load chart data")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [fileUrl])

  const chartConfig: ChartConfig = React.useMemo(() => {
    return data.reduce((acc, entry, idx) => {
      const key = entry[labelKey]
      acc[key] = {
        label: key,
        color: `var(--chart-${(idx % 5) + 1})`,
      }
      return acc
    }, {} as ChartConfig)
  }, [data, labelKey])

  const activeIndex = data.findIndex((item) => item[labelKey] === activeLabel)

  if (loading) return <p className="text-center">Loading pie chart...</p>
  if (error) return <p className="text-center text-red-500">{error}</p>
  if (!data.length || !labelKey || !valueKey) return null

  return (
    <Card className="flex flex-col h-full">
      <ChartStyle id="pie-interactive" config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">

        <Select value={activeLabel} onValueChange={setActiveLabel}>
          <SelectTrigger className="ml-auto h-7 w-[130px] rounded-lg pl-2.5" aria-label="Select a value">
            <SelectValue placeholder="Select key" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {data.map((entry, idx) => {
              const key = entry[labelKey]
              return (
                <SelectItem key={idx} value={key} className="rounded-lg [&_span]:flex">
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{ backgroundColor: chartConfig[key]?.color ||  `var(--chart-${(idx % 5) + 1})` }}
                    />
                    {key}
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id="pie-interactive"
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey={valueKey}
              nameKey={labelKey}
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-accent-foreground text-3xl font-bold"
                        >
                          {data[activeIndex]?.[valueKey]?.toLocaleString() || "0"}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Value
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
