'use client'
import { notes } from "@/api/notes"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { BiPencil, BiTrash } from "react-icons/bi"

type Props = {
    noteId: string
    isAuthor?: boolean
    isMember?: boolean
}
const NoteControls = ({ noteId, isMember=false, isAuthor=false }: Props) => {
    const { push } = useRouter()
    const deleteNote = async() => {
        await notes.deleteOne(noteId)
        push('/')
    }
    const getEditNote = () => {
        push(`/note/new?noteId=${noteId}`)
    }
    return (
        <div className='flex items-center gap-2 mb-6'>
            {
                (isMember || isAuthor) &&
                <Button onClick={getEditNote} variant='outline' className='gap-2'>
                    <BiPencil />
                    Редактировать
                </Button>
            }
            {
                isAuthor &&
                <Button disabled={!isAuthor} variant='destructive' 
                onClick={deleteNote} size='icon'><BiTrash /></Button>
            }
        </div>
    )
}

export default NoteControls