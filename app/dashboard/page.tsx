"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react"
import { DynamicBarChart } from "@/components/chart-bar-interactive"
import { DynamicPieChart } from "@/components/chart-pie-interactive"
import { DynamicRadarChart } from "@/components/chart-radar-interactive"
import { DynamicAreaChart } from "@/components/chart-area-interactive"

type Visualization = {
  title: string
  description: string
  suggested_chart: string
  result_url: string
}

type FetchedChart = Visualization & {
  chartData: { label: string; value: number }[]
}

export default function Page() {
  const [charts, setCharts] = useState<FetchedChart[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getChartComponent = (type: string, data: any) => {
    switch (type.toLowerCase()) {
      case "bar":
        return <DynamicBarChart data={data} />
      case "pie":
        return <DynamicPieChart data={data} />
      case "radar":
        return <DynamicRadarChart data={data} />
      case "area":
        return <DynamicAreaChart data={data} />
      default:
        return <p className="text-sm text-gray-400">Unsupported chart type: {type}</p>
    }
  }

  const fetchAndRenderCharts = async () => {
    setLoading(true)
    setError(null)
    setCharts([])

    try {
      const projectGuid = localStorage.getItem("active_project_guid")

      if (!projectGuid) {
        throw new Error("Missing project info in localStorage.")
      }

      // ✅ STEP 0 – Fetch project info from backend instead of relying on localStorage
      const projectInfoRes = await fetch(`http://localhost:8000/users/projects/${projectGuid}`)
      if (!projectInfoRes.ok) throw new Error("Failed to fetch project info")

      const projectInfo = await projectInfoRes.json()
      const projectType = projectInfo.data_type?.toLowerCase()
      if (!projectType) throw new Error("Invalid project type")

      // STEP 1 – Try to get saved visualizations
      let visualizations: Visualization[] = []
      const savedRes = await fetch(`http://localhost:8000/DB_Save/Elastic_GetByProject/${projectGuid}`)

      if (savedRes.ok) {
        console.log("no saved visualizations found, falling back to generation")
        visualizations = await savedRes.json()
      } else {
        // STEP 2 – Fallback to generation
        console.log("Starting generation for project:", projectGuid)
        console.log("Project type:", projectType)

        const genUrl =
          projectType === "csv"
            ? `http://localhost:8000/Visualizer_csv/analyst/${projectGuid}`
            : `http://localhost:8000/Visualizer_DB/generate-JSON/${projectGuid}`

        const genRes = await fetch(genUrl)
        if (!genRes.ok) throw new Error("Failed to generate visualizations")
        visualizations = await genRes.json()
      }

      console.log("Fetched visualizations:", visualizations)

      // STEP 3 – Deduplicate & filter
      const deduped = Array.from(
        new Map(visualizations.map((v) => [v.result_url, v])).values()
      ).filter((v) => v.result_url)

      // STEP 4 – Fetch and normalize each dataset
      const chartDataPromises = deduped.map(async (viz) => {
        console.log("Fetching data for:", viz.title, "from", viz.result_url)

        const fileUrl = `http://localhost:8000/DB_Save/Get_from_Minio/${viz.result_url}`
        const fileRes = await fetch(fileUrl)
        if (!fileRes.ok) throw new Error(`Failed to load data for ${viz.title}`)

        const rawData = await fileRes.json()

        const normalizedData = rawData.map((row: any) => {
          const keys = Object.keys(row)
          return {
            label: String(row[keys[0]] ?? "unknown"),
            value: parseFloat(row[keys[1]]) || 0,
          }
        })

        console.log("Parsed data for", viz.title, normalizedData)
        return { ...viz, chartData: normalizedData }
      })

      const fullCharts = await Promise.all(chartDataPromises)
      setCharts(fullCharts)
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-4 lg:px-6 py-8 space-y-6">
      <div className="text-center">
        <button
          onClick={fetchAndRenderCharts}
          className="px-6 py-2 bg-primary text-white rounded-md shadow hover:bg-primary/90 transition"
        >
          Show Visualizations
        </button>
      </div>

      {loading && <p className="text-center mt-4">Crunching charts... 🎯📊</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {charts.length > 0 && (
        <ul className="space-y-10 mt-8">
          {charts.map((viz) => (
            <li key={viz.result_url}>
              <h3 className="text-lg font-semibold text-accent-foreground mb-1">{viz.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{viz.description}</p>
              <p>
                {viz.chartData.length} data points
              </p>
              {getChartComponent(viz.suggested_chart, viz.chartData)}
              {/* Optional: debug viewer */}
              {/* <pre className="text-xs bg-muted p-2 rounded">{JSON.stringify(viz.chartData, null, 2)}</pre> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
