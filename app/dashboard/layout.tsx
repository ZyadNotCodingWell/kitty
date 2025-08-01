'use client'

import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar'
import { ReactNode, useEffect } from 'react'

export default function MainLayout({ children }: { children: ReactNode }) {
  const guid = localStorage.getItem("guid")
  const name = localStorage.getItem("name_comple")
  const email = localStorage.getItem("email")
  console.log("MainLayout guid:", guid, "name:", name, "email:", email)
  useEffect(() => {
  const guid = localStorage.getItem("guid")
  if (!guid) return

  const fetchProjects = async () => {
    try {
      const res = await fetch(`http://localhost:8000/users/users/${guid}/projects`)

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.detail?.[0]?.msg || "Failed to fetch projects")
      }

      const data = await res.json()
      console.log("Fetched projects:", data)

      // Store in localStorage
      localStorage.setItem("user_projects", JSON.stringify(data))

      // ✅ Set default active project if not already set
      if (!localStorage.getItem("active_project_guid") && data.length > 0) {
        const last = data[data.length - 1]
        localStorage.setItem("active_project_guid", last.guid.split("-").slice(0, 5).join("-"))
        localStorage.setItem("active_project_name", last.Project_name)
        console.log("Set default active project:", last.Project_name)
      }
    } catch (err) {
      console.error("Project fetch error:", err)
    }
  }

  fetchProjects()
}, [])





  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" guid={guid!} name={name!} email={email!} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
