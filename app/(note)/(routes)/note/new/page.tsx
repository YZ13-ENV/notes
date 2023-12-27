
import { notes } from "@/api/notes"
import NewNoteForm from "@/app/(note)/_components/new-note-form"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
type Props = {
    searchParams: {
        noteId?: string
    }
}
const page = async ({ searchParams }: Props) => {
    const cookiesList = cookies()
    const uidCookie = cookiesList.get('uid')
    const uid = uidCookie ? uidCookie.value : null
    const noteId = searchParams.noteId
    const note = noteId ? await notes.getNoteById(noteId) : null
    if (!uid) redirect('/')
    if (uid && noteId && !note) redirect('/note/new')
    return <NewNoteForm noteId={noteId} preloadNote={note} />
}

export default page