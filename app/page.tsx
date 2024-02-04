import NotesGrid from "@/components/widgets/notes-grid";
import RecentNotes from "@/components/widgets/recent-note";
import { cookies } from "next/headers";
import LoginDrawer from "./(auth)/_components/login/login-drawer";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { notes } from "api";
import Link from "next/link";
import dynamic from "next/dynamic";
import HeaderSkeleton from "@/components/skeletons/header";
const Header = dynamic(() => import('@/components/widgets/header'), {
  loading: () => <HeaderSkeleton />
})

export default async function Home() {
    const cookiesList = cookies()
    const uidCookie = cookiesList.get('uid')
    const uid = uidCookie ? uidCookie.value : null
    const notesList = uid ? await notes.getAllForUser(uid) : []
    if (!uid) return (
      <main style={{ height: 'calc(100vh - 64px)' }} className="w-full h-full">
        <div className="w-full h-full flex items-center justify-center">
          <span>Необходимо авторизоваться</span>
        </div>
        <LoginDrawer />
      </main>
    )
    return (
      <>
        <Suspense fallback={<HeaderSkeleton />}>
          <Header />
        </Suspense>
        <div style={{ height: `calc(100dvh - 56px)` }} className='w-full h-full flex items-start'>
          <aside className='w-80 shrink-0 px-6 flex flex-col py-12 h-full'>
            <Button className="justify-start" variant='ghost'>Заметки</Button>
            <Separator className="my-4" />
            {
              notesList.map(note =>
                <Button key={note.doc_id + '-aside'} asChild className="justify-start" variant='ghost'>
                  <Link href={`/note/${note.doc_id}`}>{ note.name }</Link>
                </Button>
              )
            }
          </aside>
          <main className="w-full h-full px-6 py-12 flex flex-col gap-6 items-center justify-center">
            <span className="text-center text-sm text-muted-foreground">Выберите заметку</span>
          </main>
        </div>
      </>
    )
}
