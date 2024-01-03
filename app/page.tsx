import NotesGrid from "@/components/widgets/notes-grid";
import RecentNotes from "@/components/widgets/recent-note";

export default function Home() {
    return (
      <main className="max-w-6xl w-full h-full mx-auto px-6 py-12 flex flex-col gap-6">
        <div className="w-full h-fit flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-accent-foreground">Последние добавленные</h1>
          <RecentNotes />
        </div>
        <section className="w-full h-fit flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-accent-foreground">Все заметки</h1>
          <NotesGrid />
        </section>
      </main>
    )
}
