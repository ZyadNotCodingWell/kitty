"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IconDatabase } from "@tabler/icons-react"

export function ConnectDatabaseDialog({ guid_project }: { guid_project: string }) {
  const [open, setOpen] = useState(false)
  const [host, setHost] = useState("")
  const [port, setPort] = useState("")
  const [dbname, setDbname] = useState("")
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleConnect = async () => {
    setLoading(true)

    try {
      await fetch(`http://localhost:8000/Visualizer_DB/connect/${guid_project}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dbname,
          user,
          password,
          host,
          port: parseInt(port),
        }),
      })
    } catch (err) {
      console.error("Connection failed", err)
    } finally {
      console.log("✅ Request sent")
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start hover:bg-muted">
          <IconDatabase className="h-4 w-4 -translate-x-1" />
          <p className="-translate-x-1">Connect to Database</p>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] text-accent-foreground">
        <DialogHeader>
          <DialogTitle>Connect to Database</DialogTitle>
          <DialogDescription>
            Enter your database connection details below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="host">Host</Label>
            <Input id="host" value={host} onChange={(e) => setHost(e.target.value)} placeholder="localhost" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="dbname">Database Name</Label>
            <Input id="dbname" value={dbname} onChange={(e) => setDbname(e.target.value)} placeholder="my_database" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="port">Port</Label>
            <Input id="port" value={port} onChange={(e) => setPort(e.target.value)} placeholder="5432" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="user">User</Label>
            <Input id="user" value={user} onChange={(e) => setUser(e.target.value)} placeholder="admin" />
          </div>
          <div className="flex flex-col gap-2 col-span-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>

        <DialogFooter className="mt-2">
          <Button className="w-full" onClick={handleConnect} disabled={loading}>
            {loading ? "Connecting..." : "Connect"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
