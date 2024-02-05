import { notes } from "@/api/notes"
import { MDXRemote } from 'next-mdx-remote/rsc'
import NoteControls from "@/app/(note)/_components/note-controls"
import { getVisitorId } from "@/helpers/cookies";

type Props = {
    params: {
        noteId: string
    }
}
const Page = async({ params }: Props) => {
    const visitorId = getVisitorId()
    const note = visitorId ? await notes.getNoteById(params.noteId) : null
    const isAuthor = note && visitorId ? visitorId === note.author : false
    const isMember = note && note.members && visitorId ? note.members.includes(visitorId) : false
    const hasAccess = note ? isAuthor || isMember : false
    if (!hasAccess || !note) return null
    return (
        <main className="w-full flex max-w-6xl mx-auto flex-col px-6 py-12 md-layout">
            <h1 className='lg:text-5xl text-2xl font-semibold normal-case text-accent-foreground'>{ note.name }</h1>
            {
                (isAuthor || isMember) &&
                <NoteControls noteId={params.noteId}
                isMember={isMember} isAuthor={isAuthor} />
            }
            <MDXRemote source={ note.content } />
        </main>
    )
}

export default Page