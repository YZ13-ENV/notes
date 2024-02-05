import { notes } from "@/api/notes"
import NoteCard from "../shared/note-card"
import { getVisitorId } from "@/helpers/cookies"

const RecentNotes = async() => {
    const visitorId = getVisitorId()
    const notesList = visitorId ? await notes.getAllForUser(visitorId) : []
    const sortedNotes = notesList.length > 0 ? notesList
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 3)
    : []
    if (notesList.length === 0) return (
        <div className="w-full h-64 flex items-center justify-center">
            <span className="text-sm text-muted-foreground text-center">Нет последних заметок</span>
        </div>
    )
    return (
        <div className="w-full h-fit flex flex-col gap-4">
            {
                sortedNotes.map(note => <NoteCard key={'recent-' + note.doc_id}
                maxLetters={100} note={note} />)
            }
        </div>
    )
}

export default RecentNotes