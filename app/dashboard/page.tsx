/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { DynamicAreaChart } from "@/components/chart-area-interactive"
import { DynamicBarChart } from "@/components/chart-bar-interactive"
import { DynamicPieChart } from "@/components/chart-pie-interactive"
import { DynamicRadarChart } from "@/components/chart-radar-interactive"
import { useState } from "react"

export default function Page() {
  const [apiData, setApiData] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasFetched, setHasFetched] = useState(false)

  const handleFetch = async () => {
    setLoading(true)
    setError(null)
    setHasFetched(true)
    try {
      const res = await fetch("http://localhost:8000/run-visualizations/")
      const json = await res.json()
      setApiData(json)
    } catch (err) {
      console.error(err)
      setError("Failed to load visualizations.")
    } finally {
      setLoading(false)
    }
  }

  const renderChart = (chartType: string, fileUrl: string) => {
    if (!fileUrl) return <p className="text-sm text-red-500">Missing fileUrl</p>
    const proxiedUrl = fileUrl.replace("http://localhost:9000", "http://localhost:9000")

    switch (chartType.toLowerCase()) {
      case "bar charts":
        return <DynamicBarChart fileUrl={proxiedUrl} />
      case "pie charts":
        return <DynamicPieChart fileUrl={proxiedUrl} />
      case "radar chart":
        return <DynamicRadarChart fileUrl={proxiedUrl} />
      case "area chart":
        return <DynamicAreaChart fileUrl={proxiedUrl} />
      default:
        return <p className="text-sm text-gray-400">Chart type not supported: {chartType}</p>
    }
  }

  return (
    <div className="px-4 lg:px-6 py-8 space-y-6">
      <div className="text-center">
        <button
          onClick={handleFetch}
          className="px-6 py-2 bg-primary text-white rounded-md shadow hover:bg-primary/90 transition"
        >
          Run Visualizations
        </button>
      </div>

      {loading && <p className="text-center mt-4">Loading visualizations...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {apiData && (
        <div className="mt-8">
          <ul className="space-y-8">
            {apiData.indexed_visualizations_ids.map((viz: any, index: number) => (
              <li key={viz.file_url} className="">
                <h3 className="font-medium text-accent-foreground text-lg mb-1">{viz.titre}</h3>
                <p className="text-sm text-muted-foreground mb-2">{viz.description}</p>
                {renderChart(viz.suggested_chart, viz.file_url)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!hasFetched && (
        <p className="text-center text-muted-foreground">Click the button to generate visualizations.</p>
      )}
    </div>
  )
}
