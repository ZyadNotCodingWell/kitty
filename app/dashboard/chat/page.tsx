'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Paperclip, Send } from 'lucide-react'
import TextareaAutosize from 'react-textarea-autosize'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useParams } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const BACKEND_URL = 'http://localhost:8000'

type ChatMessage = {
	role: 'user' | 'assistant'
	answer: string
}

export default function ChatPage() {
	const projectGuid = localStorage.getItem('active_project_guid') || useParams()
	const [messages, setMessages] = useState<ChatMessage[]>([])
	const [input, setInput] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const messagesEndRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const fetchConversation = async () => {
			try {
				const res = await fetch(`${BACKEND_URL}/chatbot/conversation/${projectGuid}`)
				if (!res.ok) throw new Error('Failed to fetch conversation')
				const data = await res.json()

				if (!data || !Array.isArray(data.messages)) {
					throw new Error('Invalid conversation format')
				}

				// Convert backend format to ChatMessage[]
				const loadedMessages: ChatMessage[] = data.messages.flatMap((msg: any) => {
					const result: ChatMessage[] = []
					if (msg.question) {
						result.push({ role: 'user', answer: msg.question })
					}
					if (msg.answer) {
						result.push({ role: 'assistant', answer: msg.answer })
					}
					return result
				})

				setMessages(loadedMessages)
			} catch (err) {
				console.error('Error fetching conversation:', err)
			}
		}

		if (projectGuid) {
			fetchConversation()
		}
	}, [projectGuid])

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!input.trim()) return

		const userMessage: ChatMessage = { role: 'user', answer: input.trim() }
		setMessages(prev => [...prev, userMessage])
		setInput('')
		setIsLoading(true)

		try {
			const res = await fetch(`${BACKEND_URL}/chatbot/chat/${projectGuid}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ question: input.trim() }),
			})

			if (!res.ok) throw new Error('Failed to fetch response')
			const data = await res.json()

			let fullReply = data.answer
			if (!fullReply) fullReply = 'Sorry, I could not generate a response.'

			// Typing animation
			let typedReply = ''
			for (let i = 0; i < fullReply.length; i++) {
				typedReply += fullReply[i]
				setMessages(prev => {
					const newMessages = [...prev]
					if (newMessages[prev.length - 1]?.role === 'assistant') {
						newMessages[prev.length - 1] = { role: 'assistant', answer: typedReply }
					} else {
						newMessages.push({ role: 'assistant', answer: typedReply })
					}
					return newMessages
				})
				await new Promise(res => setTimeout(res, 10)) // simulate typing speed
			}
		} catch (err) {
			console.error(err)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="flex flex-col h-[85dvh] pl-4 py-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted">
			<div className="flex-1 overflow-y-auto">
				{messages.map((msg, i) => (
					<div key={i} className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
						<div
							className={`inline-block px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-accent text-primary-foreground max-w-2xl'
								}`}
						>
							<ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.answer}</ReactMarkdown>
						</div>
					</div>
				))}
				<div ref={messagesEndRef} />
			</div>

			<form onSubmit={handleSubmit} className="flex items-end gap-2 mt-4">
				<Button variant="ghost" size="icon" type="button">
					<Paperclip className="w-5 h-5" />
				</Button>
				<TextareaAutosize
					value={input}
					onChange={e => setInput(e.target.value)}
					minRows={1}
					maxRows={4}
					placeholder="Type your message..."
					className="flex-1 resize-none border rounded-lg px-4 py-2"
				/>
				<Button type="submit" disabled={isLoading}>
					<Send className="w-5 h-5" />
				</Button>
			</form>
		</div>
	)
}
