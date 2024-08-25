"use client";
import { useRouter } from "next/navigation";
import { SidebarItem } from "../../interfaces.jsx";
import { useState } from "react";
import {
  MdAccountCircle,
  MdHome,
  MdLogout,
  MdWorkspaces,
} from "react-icons/md";
import Sidebar from "../widgets/sidebar";
import Fetch from "@/helper/fetch";

type Props = {
  onSignoutError: (message: string) => void;
};
export default function DashboardSidebar({ onSignoutError }: Props) {
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
        try {
          await Fetch.postData<string>("/api/signout", undefined);
          router.replace("/auth");
        } catch (error) {
          onSignoutError(`Error: ${error}`);
        }
      },
      isSeparator: false,
    },
  ];
  return <Sidebar items={sidebarItems} activeItemIndex={activeIndex} />;
}
