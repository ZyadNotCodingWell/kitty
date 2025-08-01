/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { FolderIcon, GripVertical } from 'lucide-react'
import {
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar'

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button } from './ui/button'

type Folder = {
  id: string
  name: string
}

function SortableFolder({ id, name }: Folder) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }
  
  const handleSelect = () => {
    localStorage.setItem("active_project_guid", id.split("-").slice(0, 5).join("-"))
    localStorage.setItem("active_project_name", name)
  }


  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex justify-between items-center p-2 bg-muted/30 rounded-md"
    >
      <div className="flex items-center gap-2">
        <GripVertical {...listeners} className="cursor-grab w-4 h-4 text-muted-foreground" />
        <FolderIcon className="w-4 h-4 text-primary" />
        <span className="truncate max-w-[160px]">{name}</span>
        <Button onClick={handleSelect} className="ml-2 text-xs">
          Select
        </Button>
      </div>
    </div>
  )
}

export function ManageFoldersDialog() {
  const [folders, setFolders] = useState<Folder[]>([])

  // Read from localStorage on mount
  useEffect(() => {
    const raw = localStorage.getItem("user_projects")
    if (!raw) return

    try {
      const parsed = JSON.parse(raw)
      const mapped = parsed.map((p: any, i: number) => ({
        id: p.guid + "-" + i,
        name: p.Project_name,
      }))
      setFolders(mapped)
    } catch (e) {
      console.error("Failed to parse projects:", e)
    }
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = folders.findIndex(f => f.id === active.id)
      const newIndex = folders.findIndex(f => f.id === over?.id)
      setFolders(arrayMove(folders, oldIndex, newIndex))
    }
  }
  console.log("Folders after drag:", folders)


  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <FolderIcon className="mr-0" />
            <span>Projects</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </DialogTrigger>

      <DialogContent className="max-w-md text-accent-foreground">
        <DialogHeader>
          <DialogTitle>Projects management</DialogTitle>
          <DialogDescription>
            Manage your current projects.
          </DialogDescription>
        </DialogHeader>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={folders.map(f => f.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {folders.map((folder) => (
                <SortableFolder key={folder.id} id={folder.id} name={folder.name} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </DialogContent>
    </Dialog>
  )
}
