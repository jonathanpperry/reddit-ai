import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { SearchForm } from "@/components/search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  SidebarNavigation,
  type SidebarCommunity,
} from "@/components/sidebar-navigation";
import ReddishLogo from "@/images/Reddish Full.png";
import { getSubreddits } from "@/sanity/lib/subreddit/getSubreddits";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const subreddits = await getSubreddits();

  const communities: SidebarCommunity[] =
    subreddits?.map((subreddit: any) => ({
      title: subreddit.title || "",
      url: `/community/${subreddit.slug}`,
    })) || [];

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <Image
                  src={ReddishLogo}
                  alt="logo"
                  width={150}
                  height={150}
                  className="object-contain"
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SearchForm />
      </SidebarHeader>

      <SidebarContent>
        <SidebarNavigation communities={communities} />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
