"use client";

import {
  FolderGit2,
  GalleryVerticalEnd,
  Lightbulb,
  Notebook,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Ranok Raihan",
    email: "ranokraihan@gmail.com",
    avatar: "/avatars/avatar.jpg",
  },
  teams: [
    {
      name: "Admin",
      logo: GalleryVerticalEnd,
      plan: "admin in controll",
    },
  ],
  navMain: [
    {
      title: "projects",
      url: "#",
      icon: FolderGit2,
      isActive: true,
      items: [
        {
          title: "Create Project",
          url: "/projects/create",
        },
        {
          title: "Manage Projects",
          url: "/projects",
        },
      ],
    },
    {
      title: "skills",
      url: "#",
      icon: Lightbulb,
      isActive: false,
      items: [
        {
          title: "Create Skill",
          url: "/skills/create",
        },
        {
          title: "Manage Skills",
          url: "/skills",
        },
      ],
    },
    {
      title: "blog",
      url: "#",
      icon: Notebook,
      items: [
        {
          title: "Write Blog",
          url: "/blogs/write",
        },
        {
          title: "Manage blogs",
          url: "/blogs",
        },
      ],
    },
    // {
    //   title: "users",
    //   url: "#",
    //   icon: User,
    //   isActive: false,
    //   items: [
    //     {
    //       title: "Create User",
    //       url: "/users/create",
    //     },
    //     {
    //       title: "Manage Users",
    //       url: "/users",
    //     },
    //   ],
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
