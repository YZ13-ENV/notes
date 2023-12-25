import { notes } from '@/api/notes'
import { cookies } from 'next/headers'
import { Markdown } from '../shared/markdown'
import { DateTime } from 'luxon'
import Link from 'next/link'

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
        <div className="w-full gap-6 h-fit shrink-0 break-inside-avoid xl:columns-4 lg:columns-3 md:columns-2 columns-1">
            {
                notesList.map(note => 
                    <Link href={`/note/${note.doc_id}`} key={note.doc_id} className='rounded-xl p-4 transition-colors border group bg-background hover:bg-card hover:border-primary cursor-pointer relative inline-flex flex-col w-full gap-2 mb-6 h-fit'>
                        <span className='normal-cate text-lg font-semibold'>{note.name}</span>
                        <Markdown>{ note.content.length > 250 ? note.content.slice(0, 250) + '...' : note.content }</Markdown>
                        <hr className='mt-1' />
                        <div className="w-full h-fit flex items-center justify-end">
                            <span className='text-sm normal-case text-muted-foreground'>{ DateTime.fromSeconds(note.createdAt).setLocale('ru').toFormat(' dd MMMM yyyy ') }</span>
                        </div>
                    </Link>
                )
            }
        </div>
    )
}

export default NotesGrid