import { SectionCards } from "@/components/section-cards"
import { DynamicAreaChart } from "@/components/chart-area-interactive"
import { BarChartInteractive } from "@/components/chart-bar-interactive"
import { LineChartInteractive } from "@/components/chart-line-interactive"
import { ChartPieInteractive } from "@/components/chart-pie-interactive"
import { RadarChartInteractive } from "@/components/chart-radar-interactive"
import { RadialChart } from "@/components/chart-radial"
import { MixedBarChart } from "@/components/chart-bar-mixed"
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
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
      <div className="px-4 lg:px-6">
        <DynamicAreaChart data={randomChartData} />
      </div>
      <div className="px-4 lg:px-6">
        <BarChartInteractive data={randomChartData} />
      </div>
      <div className="px-4 lg:px-6">
        <LineChartInteractive />
      </div>
      <div className="grid xl:grid-cols-3 xl:grid-rows-1 grid-row-3 grid-cols-1 px-2">
        <div className="px-4 xl:px-6 xl:col-span-1 row-span-1 col-span-3 xl:row-span-3">
          <ChartPieInteractive />
        </div>
        <div className="px-4 xl:px-6 xl:col-span-1 row-span-1 col-span-3 xl:row-span-3">
          <RadarChartInteractive />
        </div>
        <div className="px-4 xl:px-6 xl:col-span-1 row-span-1 col-span-3 xl:row-span-3">
          <RadialChart />
        </div>
      </div>
      <div className="px-4 lg:px-6">
        <MixedBarChart />
      </div>
    </div>
  )
}
