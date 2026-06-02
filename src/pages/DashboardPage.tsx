function DashboardPage() {
  return (
    <>
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

      <section className="rounded-lg border bg-card p-10 text-card-foreground" />
    </>
  );
}

export default DashboardPage;