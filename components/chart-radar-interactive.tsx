/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState, useMemo } from "react"
import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export function DynamicRadarChart({ fileUrl }: { fileUrl: string }) {
  const [data, setData] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:8000/proxy-csv?fileUrl=${encodeURIComponent(fileUrl)}`)
        const json = await res.json()
        setData(json)
      } catch (err) {
        setError("Failed to load radar chart data")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [fileUrl])

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

  if (loading) return <p className="text-center">Loading radar chart...</p>
  if (error) return <p className="text-center text-red-500">{error}</p>
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
