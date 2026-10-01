import { TooltipProvider } from "@/components/ui/tooltip";
import AppHeader from "./components/common/AppHeader";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <AppHeader />
        <main id="main-content" className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-6 sm:px-8 lg:px-14">
          <Outlet />
        </main>
      </div>
    </TooltipProvider>
  );
}

export default App;
