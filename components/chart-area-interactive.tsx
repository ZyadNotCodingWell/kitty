/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

export const DynamicAreaChart = ({ fileUrl }: { fileUrl: string }) => {
  const [data, setData] = React.useState<any[]>([])
  const [timeRange, setTimeRange] = React.useState<"90d" | "30d" | "7d">("90d")
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchJson() {
      try {
        const res = await fetch(`http://localhost:8000/proxy-csv?fileUrl=${encodeURIComponent(fileUrl)}`)
        const json = await res.json()
        setData(json)
      } catch (err) {
        setError("Error loading chart data")
      } finally {
        setLoading(false)
      }
    }
    fetchJson()
  }, [fileUrl])

  const timeKey = React.useMemo(() => {
    if (!data.length) return ""
    const sample = data[0]
    return Object.keys(sample).find(k => typeof sample[k] === "string" && !isNaN(Date.parse(sample[k]))) || ""
  }, [data])

  const variableKeys = React.useMemo(() => {
    if (!data.length) return []
    return Object.keys(data[0]).filter((key) => key !== timeKey && typeof data[0][key] === "number")
  }, [data, timeKey])

  const latestDate = React.useMemo(() => {
    if (!data.length || !timeKey) return new Date()
    const lastEntry = data[data.length - 1]
    return new Date(lastEntry[timeKey])
  }, [data, timeKey])

  const filteredData = React.useMemo(() => {
    if (!timeKey) return []
    const from = new Date(latestDate)
    const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90
    from.setDate(from.getDate() - days)
    return data.filter((d) => new Date(d[timeKey]) >= from)
  }, [data, timeKey, timeRange, latestDate])

  if (loading) return <p className="text-center">Loading area chart...</p>
  if (error) return <p className="text-center text-red-500">{error}</p>
  if (!filteredData.length || !timeKey || variableKeys.length === 0) return null

  return (
    <Card className="shadow-sm border rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <ToggleGroup
          type="single"
          value={timeRange}
          onValueChange={(val) => val && setTimeRange(val)}
          className="border"
        >
          <ToggleGroupItem value="90d" className="text-sm px-4 py-2">3M</ToggleGroupItem>
          <ToggleGroupItem value="30d" className="text-sm px-4 py-2">30D</ToggleGroupItem>
          <ToggleGroupItem value="7d" className="text-sm px-4 py-2">7D</ToggleGroupItem>
        </ToggleGroup>
      </CardHeader>

      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData}>
            <defs>
              {variableKeys.map((key) => (
                <linearGradient key={key} id={`fill-${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--color-muted)" stopOpacity={0.02} />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey={timeKey}
              tickFormatter={(val) =>
                new Date(val).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
              tickLine={false}
              axisLine={false}
              style={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
            />

            <Tooltip
              cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1 }}
              contentStyle={{
                backgroundColor: "var(--foreground)",
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

            {variableKeys.map((key) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke="var(--color-primary)"
                fill={`url(#fill-${key})`}
                fillOpacity={1}
                strokeWidth={2}
                animationDuration={600}
                isAnimationActive
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
