'use client'

import { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { UploadIcon } from 'lucide-react'

export function FileUploadDialog() {
  const [file, setFile] = useState<File | null>(null)

  const isValidFile = (file: File) =>
    ['text/csv', 'application/json', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(file.type)

  const handleFile = (f: File) => {
    if (isValidFile(f)) {
      setFile(f)
    } else {
      alert('Invalid file type. Only .csv, .xlsx, and .json allowed.')
    }
  }

  const handleSubmit = () => {
    if (file) {
      // Placeholder logic: you can replace this with your actual file logic
      alert(`Submitted file: ${file.name}`)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <UploadIcon className="" />
            <span>Upload File</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-accent-foreground'>Upload File</DialogTitle>
          <DialogDescription>Upload your dataset (.csv, .xlsx, or .json)</DialogDescription>
        </DialogHeader>

        <div
          className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-muted rounded-xl cursor-pointer hover:bg-muted/40 transition-colors mt-4"
          onDrop={(e) => {
            e.preventDefault()
            const droppedFile = e.dataTransfer.files[0]
            if (droppedFile) handleFile(droppedFile)
          }}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <UploadIcon className="w-8 h-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            {file ? file.name : 'Click or drag & drop a file here'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Accepted: .csv, .xlsx, .json</p>
        </div>

        <input
          id="file-input"
          type="file"
          accept=".csv,.xlsx,.json"
          className="hidden"
          onChange={(e) => {
            const selected = e.target.files?.[0]
            if (selected) handleFile(selected)
          }}
        />

        <DialogFooter className="mt-4">
          <Button className="w-full" onClick={handleSubmit} disabled={!file}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
