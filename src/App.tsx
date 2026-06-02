import { ChartColumnStacked, SettingsIcon, HomeIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import IntensiveLibrary from "../public/IntensiveLibrary.png";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  const location = useLocation();

  return (
    <TooltipProvider>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" tooltip="Intensive Library">
                  <div className="flex size-8 items-center justify-center rounded-md text-sidebar-primary-foreground">
                    <img src={IntensiveLibrary} alt="IB Icon" />
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

        <SidebarInset>
          <header className="flex h-[65px] shrink-0 items-center gap-3 border-b px-4">
            <div className="h-9 w-px bg-border" />
            <div>
              <h1 className="text-base font-semibold">Intensive Library</h1>
              <p className="text-sm text-muted-foreground">
                Keep track of the library's collection, manage categories, and
                log who's borrowed what. All in one place.
              </p>
            </div>
          </header>

          <main className="flex flex-1 flex-col gap-6 p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}

export default App;
