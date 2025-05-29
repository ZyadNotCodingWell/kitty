// components/QuickCreateDialog.tsx
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

export function QuickCreateDialog() {
  const [name, setName] = React.useState("")

  const handleSubmit = () => {
    console.log("Creating:", name)
    // TODO: Add backend POST request here later
    setName("")
  }

  return (
    <Dialog>
      <DialogTrigger asChild >
				
        	<Button variant="default" className="col-span-1 flex items-center justify-center">
						<IconPlus className="h-4 w-4" />
						<p className="-translate-x-0.5">
							Quick Create
						</p>
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
        </div>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={!name.trim()}
            >
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
