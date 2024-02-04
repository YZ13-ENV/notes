import { notes } from "@/api/notes"
import { cookies } from "next/headers"
import { MDXRemote } from 'next-mdx-remote/rsc'
import NoteControls from "@/app/(note)/_components/note-controls"
import dynamic from "next/dynamic";
import HeaderSkeleton from "@/components/skeletons/header";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
const Header = dynamic(() => import('@/components/widgets/header'), {
  loading: () => <HeaderSkeleton />
})
type Props = {
    params: {
        noteId: string
    }
}
const Page = async({ params }: Props) => {
    const cookiesList = cookies()
    const uidCookie = cookiesList.get('uid')
    const uid = uidCookie ? uidCookie.value : null
    const note = uid ? await notes.getNoteById(params.noteId) : null
    const isAuthor = note && uid ? uid === note.author : false
    const isMember = note && note.members && uid ? note.members.includes(uid) : false
    const hasAccess = note ? isAuthor || isMember : false
    const notesList = uid ? await notes.getAllForUser(uid) : []
    if (!hasAccess || !note) return null
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
                <main className="w-full flex max-w-6xl mx-auto flex-col px-6 py-12 md-layout">
                    <h1 className='lg:text-5xl text-2xl font-semibold normal-case text-accent-foreground'>{ note.name }</h1>
                    {
                        (isAuthor || isMember) &&
                        <NoteControls noteId={params.noteId}
                        isMember={isMember} isAuthor={isAuthor} />
                    }
                    <MDXRemote source={ note.content } />
                </main>
            </div>
        </>
    )
}

export default Page