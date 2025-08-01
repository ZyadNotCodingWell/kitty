/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { IconPlus } from "@tabler/icons-react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function QuickCreateDialog() {
  const [name, setName] = React.useState("")
  const [isSQL, setIsSQL] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  const handleSubmit = async () => {
    const guid = localStorage.getItem("guid")
    if (!guid) {
      setError("User ID not found")
      return
    }

    setLoading(true)
    setError("")

    try {
      const res = await fetch("http://localhost:8000/users/projects/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Project_name: name.trim(),
          data_type: isSQL ? "sql" : "csv",
          data_url_clean: "string",
          data_prute_url: "string",
          metadata_url:"string",
          guid_user: guid,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.detail?.[0]?.msg || "Failed to create project")
      }

      // Success
      setName("")
      setIsSQL(false)
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="col-span-1 flex items-center justify-center">
          <IconPlus className="h-4 w-4" />
          <p className="-translate-x-0.5">Quick Create</p>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-accent-foreground">Enter project name</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            className="text-accent-foreground"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="flex items-center justify-between">
            <Label>Data Type: {isSQL ? "SQL" : "CSV"}</Label>
            <Switch
              checked={isSQL}
              onCheckedChange={setIsSQL}
              className="ml-2"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={!name.trim() || loading}
            >
              {loading ? "Creating..." : "Submit"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
