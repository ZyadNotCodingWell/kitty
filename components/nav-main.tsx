"use client"

import { IconMail, type Icon } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ManageFoldersDialog } from "./ProjectManager"
import { QuickCreateDialog } from "./QuickCreateDialog"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="grid grid-cols-2 items-center gap-1">
            <QuickCreateDialog />
            <div className="col-span-1 flex justify-start">
              <Button
                size="icon"
                className="size-9 group-data-[collapsible=icon]:opacity-0 hover:bg-neutral-950/30 transition duration-200"
                variant="outline"
                >
                <IconMail />
                <span className="sr-only">Inbox</span>
              </Button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <ManageFoldersDialog />
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <a href={item.url}>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </a>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
