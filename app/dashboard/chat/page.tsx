"use client"

import { useEffect, useRef, useState } from "react"
import TextareaAutosize from "react-textarea-autosize"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Card } from "@/components/ui/card"

const APIKEY = "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"
const APIURL = "https://openrouter.ai/api/v1/chat/completions"

export default function Page() {
	const [messages, setMessages] = useState<{ role: "user" | "assistant", content: string }[]>([])
	const [input, setInput] = useState("")
	const [loading, setLoading] = useState(false)
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [displayedResponse, setDisplayedResponse] = useState("")
	const [typingText, setTypingText] = useState("")
	const bottomRef = useRef<HTMLDivElement | null>(null)

	const scrollToBottom = () => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages, typingText])

	useEffect(() => {
		if (!loading && messages.at(-1)?.role === "assistant") {
			const full = messages.at(-1)!.content
			let i = 0
			setDisplayedResponse("")
			const interval = setInterval(() => {
				setDisplayedResponse(prev => {
					if (i >= full.length) {
						clearInterval(interval)
						return prev
					}
					return prev + full[i++]
				})
			}, 20)
			return () => clearInterval(interval)
		}
	}, [loading, messages])

	const handleSubmit = async () => {
		if (!input.trim()) return
		const userMessage = { role: "user", content: input.trim() }
		setMessages(prev => [...prev, userMessage])
		scrollToBottom()
		setInput("")
		setLoading(true)
		setTypingText("")

		try {
			const res = await fetch(APIURL, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${APIKEY}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					model: "qwen/qwen3-30b-a3b:free",
					messages: [...messages, userMessage],
				}),
			})

			const data = await res.json()
			const reply = data?.choices?.[0]?.message?.content

			if (reply) {
				let i = 0
				const typeInterval = setInterval(() => {
					setTypingText(reply.slice(0, i + 8))
					i++
					if (i === reply.length) {
						clearInterval(typeInterval)
						setMessages(prev => [...prev, { role: "assistant", content: reply }])
						setTypingText("")
						setLoading(false)
					}
				}, 10)
			} else {
				setLoading(false)
			}
		} catch (err) {
			console.error("Failed to fetch AI response:", err)
			setLoading(false)
		}
	}

	return (
  <div className="flex flex-col absolute inset-0 flex-1 px-4 pb-4">
    {/* Chat messages area */}
    <div className="flex-1 overflow-y-auto py-16 ">
      <Card className="w-full p-4 flex flex-col gap-2 shadow-none bg-neutral-100/0 dark:bg-neutral-700/0 border border-neutral-800/0 dark:border-neutral-200/0">
				    <Card
            className={`w-fit max-w-[80%] py-1 px-2 bg-gradient-to-br rounded-sm border overflow-x-auto dark:border-neutral-300/15 border-neutral-800/5 dark:bg-neutral-800/60 bg-neutral-500/10 min-w-16 shadow-none dark:text-neutral-300 ${"self-start"}`}>
            <div>
              <p className="block text-sm text-violet-500 font-semibold">Hello Kitty</p>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>Your data has been analysed and processed, you can ask any question about it</ReactMarkdown>
            </div>
          </Card>
        {messages.map((msg, idx) => (
          <Card
            key={idx}
            className={`w-fit max-w-[80%] py-1 px-2 bg-gradient-to-br rounded-sm border overflow-x-auto dark:border-neutral-300/15 border-neutral-800/5 dark:bg-neutral-800/60 bg-neutral-500/10 min-w-16 shadow-none dark:text-neutral-300 ${
              msg.role === "user" ? "self-end" : "self-start"
            }`}
          >
            <div>
              <p className={msg.role === "user" ? "block text-sm text-violet-500 font-semibold" : "hidden"}>User</p>
              <p className={msg.role === "assistant" ? "block text-sm text-violet-500 font-semibold" : "hidden"}>Hello Kitty</p>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
            </div>
          </Card>
        ))}

        {loading && typingText && (
          <Card className="w-fit max-w-[80%] py-1 px-2 bg-gradient-to-br overflow-x-auto rounded-sm border dark:border-neutral-300/15 border-neutral-800/5 dark:bg-neutral-100/5 bg-neutral-500/10 min-w-16 shadow-none dark:text-neutral-300">
            <div>
              <p className="block text-sm text-violet-500 font-semibold">Hello Kitty</p>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{typingText}</ReactMarkdown>
            </div>
          </Card>
        )}

        {loading && !typingText && (
          <Card className="w-fit max-w-[80%] py-2 px-4 mb-2 text-neutral-800/30 dark:text-neutral-300/40 bg-transparent shadow-none border-0">
            <p>Hello Kitty is typing...</p>
          </Card>
        )}

        <div ref={bottomRef} />
      </Card>
    </div>

    {/* Input area pinned to bottom */}
    <div className="absolute bottom-2 inset-x-4">
      <Card className="w-full py-0.5 rounded-lg px-[3px] bg-neutral-500/10 dark:bg-neutral-800/60 border border-neutral-800/10 dark:border-neutral-200/15 shadow-none">
        <TextareaAutosize
          placeholder="Chat with our AI..."
          value={input}
          disabled={loading}
          minRows={1}
          maxRows={6}
          className="w-full text-lg placeholder:text-lg py-3 px-4 border-0 rounded-lg focus:ring-0 focus:outline-none bg-transparent resize-none scrollbar-hide max-h-13"
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSubmit()
            }
          }}
        />
      </Card>
    </div>
  </div>
)


}
