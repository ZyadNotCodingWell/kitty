"use client"

import { Card } from "@/components/ui/card"

const adviceList = [
  {
    id: 0,
    title: "Diversify Your Portfolio",
    content:
      "Avoid overexposure to a single asset. Diversification reduces risk and helps stabilize returns.",
  },
  {
    id: 1,
    title: "Mind the Volatility",
    content:
      "High volatility isn’t always opportunity — filter noise and focus on actionable trends.",
  },
  {
    id: 2,
    title: "Follow Volume Spikes",
    content:
      "Unusual volume often precedes significant moves. Combine with other indicators to validate entries.",
  },
  {
    id: 3,
    title: "Use Risk-Adjusted Returns",
    content:
      "Don't just chase performance — consider Sharpe ratios or Sortino to measure real effectiveness.",
  },
  {
    id: 4,
    title: "Watch the Market Regimes",
    content:
      "Strategies that work in uptrends might fail in consolidation or bear phases. Adapt or sit out.",
  },
]


export default function AdvicePage() {
  return (
    <div className="flex flex-col w-full m-2 p-2 gap-6 items-center">
      <header className="text-2xl w-full text-center">Strategy Evaluation</header>
      <header className="text-base w-full text-center text-muted-foreground -translate-y-4">What the AI assistant advises based on the analysis of the uploaded data</header>
      <div className="grid grid-cols-2 gap-4">
        {adviceList.map((advice, idx) => (
          <Card
          key={advice.id}
          className={`p-4 justify-between w-fit`}
          >
            <h3 className="text-xl font-semibold mb-2 w-full text-center">{advice.title}</h3>
            <p className="text-muted-foreground text-lg max-w-xl text-center self-center text-balance">{advice.content}</p>
          </Card>
        ))}
        {adviceList.map((advice, idx) => (
          <Card
          key={advice.id}
          className={`p-4 justify-between w-fit`}
          >
            <h3 className="text-xl font-semibold mb-2 w-full text-center">{advice.title}</h3>
            <p className="text-muted-foreground text-lg max-w-xl text-center self-center text-balance">{advice.content}</p>
          </Card>
        ))}
      </div>  
    </div>
  )
}
