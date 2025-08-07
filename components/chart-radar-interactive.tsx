"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo } from "react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export function DynamicRadarChart({ data }: { data: any[] }) {
  const angleKey = useMemo(() => {
    if (!data.length) return ""
    const sample = data[0]
    return Object.keys(sample).find(k => typeof sample[k] === "string") || Object.keys(sample)[0] || ""
  }, [data])

  const chartKeys = useMemo(() => {
    if (!data.length) return []
    return Object.keys(data[0]).filter(k => k !== angleKey && typeof data[0][k] === "number")
  }, [data, angleKey])

  const chartConfig: ChartConfig = useMemo(() => {
    return chartKeys.reduce((acc, key, i) => {
      acc[key] = {
        label: key,
        color: `var(--chart-${(i % 5) + 1})`,
      }
      return acc
    }, {} as ChartConfig)
  }, [chartKeys])

  if (!data.length || !angleKey || !chartKeys.length) return null

  return (
    <Card className="h-full">
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={data}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey={angleKey} />
            <PolarGrid />
            {chartKeys.map((key) => (
              <Radar
                key={key}
                dataKey={key}
                fill={`var(--color-${key})`}
                fillOpacity={0.6}
              />
            ))}
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
