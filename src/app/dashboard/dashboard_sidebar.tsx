"use client";
import { useRouter } from "next/navigation";
import { SidebarItem } from "../../interfaces.jsx";
// import Sidebar from "@/app/widgets/sidebar";
import { useState } from "react";
import {
  MdAccountCircle,
  MdHome,
  MdLogout,
  MdWorkspaces,
} from "react-icons/md";
import Sidebar from "../widgets/sidebar";

export default function DashboardSidebar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const sidebarItems: SidebarItem[] = [
    {
      text: "Dashboard",
      icon: <MdHome size={24} color="gray" />,
      onClick: () => {
        setActiveIndex(0);
        router.push("/dashboard");
      },
      isSeparator: false,
    },
    {
      text: "Workspace",
      icon: <MdWorkspaces size={24} color="gray" />,
      onClick: () => {
        setActiveIndex(1);
        router.push("/dashboard/workspaces");
      },
      isSeparator: false,
    },
    {
      text: "Account Page",
      icon: null,
      onClick: () => null,
      isSeparator: true,
    },
    {
      text: "Profile",
      icon: <MdAccountCircle size={24} color="gray" />,
      onClick: () => {
        setActiveIndex(3);
        router.push("/dashboard/profile");
      },
      isSeparator: false,
    },
    {
      text: "Signout",
      icon: <MdLogout size={24} color="gray" />,
      onClick: async () => {
        setActiveIndex(4);
        const res = await fetch("/api/signout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
      isSeparator: false,
    },
  ];
  return <Sidebar items={sidebarItems} activeItemIndex={activeIndex} />;
}
