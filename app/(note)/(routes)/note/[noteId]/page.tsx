import { notes } from "@/api/notes"
import { cookies } from "next/headers"
import { MDXRemote } from 'next-mdx-remote/rsc'
import NoteControls from "@/app/(note)/_components/note-controls"

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
    if (!hasAccess || !note) return null
    return (
        <div className="max-w-6xl mx-auto w-full flex flex-col px-6 py-12 md-layout">
            <h1 className='lg:text-5xl text-2xl font-semibold normal-case text-accent-foreground'>{ note.name }</h1>
            {
                (isAuthor || isMember) &&
                <NoteControls noteId={params.noteId} 
                isMember={isMember} isAuthor={isAuthor} />
            }
            <MDXRemote source={ note.content } />
        </div>
    )
}

export default Page