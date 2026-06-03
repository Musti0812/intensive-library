import { ChartColumnStacked, SettingsIcon, HomeIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";

function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip="Intensive Library">
              <div className="flex size-8 items-center justify-center rounded-md text-sidebar-primary-foreground">
                <img src="/IntensiveLibrary.png" alt="Icon" />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="truncate font-semibold">
                  Intensive Library
                </span>
                <span className="truncate text-xs text-sidebar-foreground/70">
                  Building our future. Page by page.
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuButton
                isActive={location.pathname === "/"}
                tooltip="Dashboard"
                render={<NavLink to="/" />}
              >
                <HomeIcon />
                <span>Dashboard</span>
              </SidebarMenuButton>

              <SidebarMenuButton
                isActive={location.pathname === "/categories"}
                tooltip="Categories"
                render={<NavLink to="/categories" />}
              >
                <ChartColumnStacked />
                <span>Categories</span>
              </SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <SettingsIcon />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
