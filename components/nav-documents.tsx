/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"



import {
  IconDots,
  IconFolder,
  IconShare3,
  IconTrash,
  type Icon,
} from "@tabler/icons-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { ConnectDatabaseDialog } from "./ConnectDatabaseDialog"
import { FileUploadDialog }  from "./fileUploadDialog"
import { useEffect, useState } from "react"
{/* import { ManageUploadsDialog } from "./uploadManager" */}

export function NavDocuments({
  items,
}: {
  items: {
    name: string
    url: string
    icon: Icon
  }[]
}) {
  const { isMobile } = useSidebar()


  const [guid, setGuid] = useState(() => localStorage.getItem("active_project_guid"))
  const [projectType, setProjectType] = useState(null)

  // Listen to changes (optional: if other tabs modify localStorage)
  useEffect(() => {
    const handleStorage = () => {
      setGuid(localStorage.getItem("active_project_guid"))
      console.log("Storage changed, new guid:", localStorage.getItem("active_project_guid"))
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  useEffect(() => {
    if (!guid) return

    const fetchProject = async () => {
      try {
        const res = await fetch(`http://localhost:8000/users/projects/${guid}`)
        if (!res.ok) throw new Error("Failed to fetch project")
        const data = await res.json()
        setProjectType(data.data_type)
      } catch (err: any) {
        console.error(err)
        setProjectType(null)
      }
    }

    fetchProject()
  }, [guid])

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Data and connections</SidebarGroupLabel>
      <SidebarMenu>
        { guid && projectType !== "csv" && <ConnectDatabaseDialog guid_project={guid} />}
        { guid && projectType !== "sql" && <FileUploadDialog /> }
        
        {/* <ManageUploadsDialog /> */}
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild className="">
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction
                  showOnHover
                  className="data-[state=open]:bg-accent rounded-sm"
                >
                  <IconDots />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-24 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <IconFolder />
                  <span>Open</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconShare3 />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <IconTrash />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}

      </SidebarMenu>
    </SidebarGroup>
  )
}
