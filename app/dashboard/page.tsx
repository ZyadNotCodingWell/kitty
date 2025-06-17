import { SectionCards } from "@/components/section-cards"
import { DynamicAreaChart } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import data from "./data.json"

const randomChartData = Array.from({ length: 180 }, (_, i) => {
  const date = new Date(2025, 0, 1 + i) // Start from Jan 1, 2025
  const isoDate = date.toISOString().split("T")[0]

  return {
    date: isoDate,
    alpha: Math.floor(100 + Math.random() * 100),
    beta: Math.floor(250 + Math.random() * 150),
    gamma: Math.floor(150 + Math.random() * 120),
  }
})

export default function Page() {
  return (
    <>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <DynamicAreaChart data={randomChartData} />
      </div>
      <DataTable data={data} />
    </>
  )
}
