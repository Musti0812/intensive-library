function AppHeader() {
  return (
    <header className="flex h-[65px] shrink-0 items-center gap-3 border-b px-4">
      <div className="h-9 w-px bg-border" />
      <div>
        <h1 className="text-base font-semibold">Intensive Library</h1>
        <p className="text-sm text-muted-foreground">
          Keep track of the library's collection, manage categories, and log
          who's borrowed what. All in one place.
        </p>
      </div>
    </header>
  );
}

export default AppHeader;
