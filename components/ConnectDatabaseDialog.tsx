// components/ConnectDatabaseDialog.tsx
"use client"

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

export function ConnectDatabaseDialog() {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-muted"
        >
					<IconDatabase className="h-4 w-4 -translate-x-1" />
          <p className="-translate-x-1">
						Connect to Database
					</p>
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
				  {/* Port Input (Column 1) */}
				  <div className="flex flex-col gap-2">
				    <Label htmlFor="port">Host</Label>
				    <Input id="host" placeholder="/localhost:" />
				  </div>
				  <div className="grid gap-4">
				    <div className="flex flex-col gap-2">
				      <Label htmlFor="user">Name</Label>
				      <Input id="user" placeholder="database_name" />
				    </div>
				  </div>
				  {/* Port Input (Column 1) */}
				  <div className="flex flex-col gap-2">
				    <Label htmlFor="port">Port</Label>
				    <Input id="port" placeholder="5432" />
				  </div>
				  <div className="grid gap-4">
				    <div className="flex flex-col gap-2">
				      <Label htmlFor="user">User</Label>
				      <Input id="user" placeholder="admin" />
				    </div>
				  </div>

				  {/* User & Password (Column 2) */}
				  <div className="flex flex-col gap-2 col-span-2">
				    <Label htmlFor="password">Password</Label>
				    <Input id="password" type="password" placeholder="" />
				  </div>
				</div>

				<DialogFooter className="mt-2">
				  <Button className="w-full">Connect</Button>
				</DialogFooter>

      </DialogContent>
    </Dialog>
  )
}
