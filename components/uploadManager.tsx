'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { TrashIcon, FolderOpenIcon, FileIcon } from 'lucide-react'
import {
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar'

type UploadedFile = {
  id: string
  name: string
}

export function ManageUploadsDialog() {
  const [files, setFiles] = useState<UploadedFile[]>([
    { id: '1', name: 'project_data.csv' },
    { id: '2', name: 'metrics.json' },
    { id: '3', name: 'report.xlsx' }
  ])

  const handleDelete = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id))
    // You can trigger a backend call here later
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <FolderOpenIcon className="mr-0" />
            <span>Manage Uploads</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </DialogTrigger>

      <DialogContent className="max-w-md text-accent-foreground">
        <DialogHeader>
          <DialogTitle>Manage Uploaded Files</DialogTitle>
          <DialogDescription>
            View and delete files associated with this project.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {files.length === 0 ? (
            <p className="text-sm text-muted-foreground">No files uploaded yet.</p>
          ) : (
            files.map((file) => (
              <div
                key={file.id}
                className="flex justify-between items-center p-2 bg-muted/30 rounded-md"
              >
                <div className="flex items-center gap-2">
                  <FileIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="truncate max-w-[160px]">{file.name}</span>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDelete(file.id)}
                >
                  <TrashIcon className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))
          )}
        </div>

        <DialogFooter className="mt-0">
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
