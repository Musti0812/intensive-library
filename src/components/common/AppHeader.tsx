import { Link, NavLink } from "react-router-dom";
import { BookOpen, Tags } from "lucide-react";

function AppHeader() {
  return (
    <header className="border-b bg-card">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:rounded focus:bg-card focus:p-3">Skip to content</a>
      <div className="mx-auto flex min-h-16 w-full max-w-[1440px] flex-wrap items-center gap-x-9 gap-y-3 px-4 py-3 sm:px-8 lg:px-14">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/IntensiveLibrary.png"
            alt=""
            className="size-8 object-contain"
          />
          <span className="text-lg font-semibold">Intensive Library</span>
        </Link>

        <nav aria-label="Main navigation" className="flex gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring ${isActive ? "bg-accent text-primary" : "text-muted-foreground hover:bg-muted"}`
            }
          >
            <BookOpen className="size-5" />
            Collection
          </NavLink>

          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring ${isActive ? "bg-accent text-primary" : "text-muted-foreground hover:bg-muted"}`
            }
          >
            <Tags className="size-5" />
            Categories
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
