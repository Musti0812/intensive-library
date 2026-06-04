import CreateBookDialog from "@/components/books/CreateBookDialog";

function DashboardPage() {
  return (
    <>
      <section className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
          </div>
        </div>
      </section>

      <div>
        <CreateBookDialog />
      </div>

      <section className="rounded-lg border bg-card p-10 text-card-foreground" />
    </>
  );
}

export default DashboardPage;
