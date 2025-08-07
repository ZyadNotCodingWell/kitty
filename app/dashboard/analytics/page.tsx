"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

type Recommendation = {
  recommendation: string
}

export default function AdvicePage() {
  const [adviceList, setAdviceList] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const userGuid = localStorage.getItem("guid")
    const projectGuid = localStorage.getItem("active_project_guid")

    if (!userGuid || !projectGuid) {
      setError("Missing user or project ID in localStorage")
      setLoading(false)
      return
    }

    const filename = `${userGuid}/${projectGuid}/recommendation.json`

    const fetchAdvice = async () => {
      try {
        const res = await fetch(`http://localhost:8000/DB_Save/Get_from_Minio/${filename}`)
        if (!res.ok) {
          throw new Error("Failed to fetch recommendations")
        }
        const data = await res.json()
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received")
        }
        setAdviceList(data)
      } catch (err: any) {
        console.error(err)
        setError(err.message || "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchAdvice()
  }, [])

  return (
    <div className="flex flex-col w-full m-2 p-2 gap-6 items-center">
      <header className="text-2xl w-full text-center">Strategy Evaluation</header>
      <header className="text-base w-full text-center text-muted-foreground -translate-y-4">
        What the AI assistant advises based on the analysis of the uploaded data
      </header>

      {loading && <p className="text-muted-foreground">Loading recommendations...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-2 gap-4">
          {adviceList.map((advice, idx) => (
            <Card key={idx} className="p-4 justify-between w-fit">
              <p className="text-muted-foreground text-lg max-w-xl text-center self-center text-balance">
                {advice.recommendation}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
