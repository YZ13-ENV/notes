import { DocNote } from "@/types/notes"
import Link from "next/link"
import { Markdown } from "./markdown"
import { DateTime } from "luxon"

type Props = {
    note: DocNote
    maxLetters?: number
}
const NoteCard = ({ note, maxLetters=250 }: Props) => {
    return (
            <Link href={`/note/${note.doc_id}`} className='rounded-xl p-4 transition-colors border group bg-background hover:bg-card hover:border-primary cursor-pointer relative inline-flex flex-col w-full gap-2 mb-6 h-fit'>
                <span className='normal-cate text-lg font-semibold'>{note.name}</span>
                <Markdown>{ note.content.length > maxLetters ? note.content.slice(0, maxLetters) + '...' : note.content }</Markdown>
                <hr className='mt-1' />
                <div className="w-full h-fit flex items-center justify-end">
                    <span className='text-sm normal-case text-muted-foreground'>{ DateTime.fromSeconds(note.createdAt).setLocale('ru').toFormat(' dd MMMM yyyy ') }</span>
                </div>
            </Link>
    )
}

export default NoteCard