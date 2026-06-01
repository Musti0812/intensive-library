import {
  ChartColumnStacked,
  SettingsIcon,
  HomeIcon,
} from "lucide-react";
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
import IntensiveLibrary from "../public/IntensiveLibrary.png";
import { TooltipProvider } from "@/components/ui/tooltip";

const libraryItems = [
  {
    title: "Dashboard",
    icon: HomeIcon,
    active: true,
  },
  {
    title: "Categories",
    icon: ChartColumnStacked,
  },
];

function App() {
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
                  {libraryItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={item.active}
                        tooltip={item.title}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
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
            <section className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-4 text-card-foreground">
                <p className="text-sm text-muted-foreground">Total titles</p>
                <p className="mt-2 text-3xl font-semibold">1,248</p>
              </div>

              <div className="rounded-lg border bg-card p-4 text-card-foreground">
                <p className="text-sm text-muted-foreground">Active members</p>
                <p className="mt-2 text-3xl font-semibold">342</p>
              </div>

              <div className="rounded-lg border bg-card p-4 text-card-foreground">
                <p className="text-sm text-muted-foreground">Due this week</p>
                <p className="mt-2 text-3xl font-semibold">27</p>
              </div>
            </section>

            <section className="rounded-lg border bg-card p-10 text-card-foreground"></section>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}

export default App;
