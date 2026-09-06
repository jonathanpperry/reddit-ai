"use client";

import { FlameIcon, HomeIcon, Minus, Plus, TrendingUpIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import CreateCommunityButton from "@/components/header/CreateCommunityButton";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";

export type SidebarCommunity = {
  title: string;
  url: string;
};

type SidebarNavigationProps = {
  communities: SidebarCommunity[];
};

const primaryNavigation = [
  {
    title: "Home",
    url: "/",
    icon: HomeIcon,
  },
  {
    title: "Popular",
    url: "/popular",
    icon: TrendingUpIcon,
  },
  {
    title: "Hot/Controversial",
    url: "/hot",
    icon: FlameIcon,
  },
] as const;

export function SidebarNavigation({ communities }: SidebarNavigationProps) {
  const pathname = usePathname();
  const { setOpen, setOpenMobile } = useSidebar();

  const closeSidebar = () => {
    setOpen(false);
    setOpenMobile(false);
  };

  return (
    <>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <CreateCommunityButton />
            </SidebarMenuButton>

            {primaryNavigation.map((item) => {
              const isActive = pathname === item.url;
              const Icon = item.icon;

              return (
                <SidebarMenuButton
                  key={item.url}
                  asChild
                  isActive={isActive}
                  className="p-5 data-[active=true]:font-semibold"
                >
                  <Link
                    href={item.url}
                    aria-current={isActive ? "page" : undefined}
                    onClick={closeSidebar}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              );
            })}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarMenu>
          <Collapsible asChild defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger
                asChild
                aria-controls="sidebar-communities-content"
              >
                <SidebarMenuButton>
                  Communities
                  <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                  <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                </SidebarMenuButton>
              </CollapsibleTrigger>

              {communities.length ? (
                <CollapsibleContent id="sidebar-communities-content">
                  <SidebarMenuSub>
                    {communities.map((community) => {
                      const isActive =
                        pathname === community.url ||
                        pathname.startsWith(`${community.url}/`);

                      return (
                        <SidebarMenuSubItem key={community.url}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={isActive}
                            className="data-[active=true]:font-semibold"
                          >
                            <Link
                              href={community.url}
                              aria-current={isActive ? "page" : undefined}
                              onClick={closeSidebar}
                            >
                              {community.title}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}
