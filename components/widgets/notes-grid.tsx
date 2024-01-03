import { notes } from '@/api/notes'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { BiPlus } from 'react-icons/bi'
import NoteCard from '../shared/note-card'

const NotesGrid = async() => {
    const cookiesList = cookies()
    const uidCookie = cookiesList.get('uid')
    const uid = uidCookie ? uidCookie.value : null
    const notesList = uid ? await notes.getAllForUser(uid) : []
    if (notesList.length === 0) return (
        <div className="w-full h-96 flex flex-col items-center justify-center">
            <span className='text-muted-foreground'>У вас нет заметок</span>
        </div>
    )
    return (
        // 
        <div className="w-full gap-6 h-fit shrink-0 break-inside-avoid xl:columns-4 lg:columns-3 md:columns-2 columns-1">
            {
                notesList.map(note => <NoteCard key={note.doc_id} note={note} /> )
            }
            <Link href="/note/new" className='rounded-xl p-4 transition-colors border bg-background hover:bg-card hover:border-primary cursor-pointer inline-flex flex-col w-full items-center justify-center gap-2 mb-6 h-32'>
                <BiPlus size={24} className='text-muted-foreground' />
            </Link>
        </div>
    )
}

export default NotesGrid