'use client'
import { notes } from "@/api/notes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Note, PartialDocNote } from "@/types/notes"
import { DateTime } from "luxon"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ForwardRefEditor } from "@/components/shared/markdown-v2-forward-ref"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/utils/app"

type Props = {
    preloadNote: PartialDocNote | null
    noteId: string | undefined
}
const NewNoteForm = ({ noteId: providedNoteId, preloadNote }: Props) => {
    const note = preloadNote
    const [user] = useAuthState(auth)
    const [name, setName] = useState<string>(note ? note.name : '')
    const [loading, setLoading] = useState<boolean>(false)
    const [content, setContent] = useState<string>(note ? note.content : '')
    const regExp = /[\w\[\]`!@#$%\^&*()={}:;<>+'-]*/g
    const nameIdRegExp = /[^a-zA-Z 0-9 -]+/g
    const { push } = useRouter()
    const id = name
        .toLowerCase()
        .replace(nameIdRegExp,'')
        .replaceAll(' ', '-')
        .replaceAll('--', '-')

    const validName = regExp.test(name)
    const clearForm = () => {
        setName('')
        setContent('')
    }
    const createNote = async() => {
        if (user) {
            setLoading(true)
            const note: Note = {
                name: name,
                content: content,
                createdAt: DateTime.now().toSeconds(),
                author: user.uid,
                pinned: false
            }
            if (preloadNote && providedNoteId) {
                const targetPath = providedNoteId
                delete preloadNote.doc_id
                const noteForUpdate: Note = {
                    ...preloadNote,
                    ...note,
                    author: preloadNote.author,
                    createdAt: preloadNote.createdAt,
                    updatedAt: DateTime.now().toSeconds()
                }
                const isUpdated = await notes.updateOne(targetPath, noteForUpdate)
                if (isUpdated) {
                    setLoading(false)
                    clearForm()
                    push(`/note/${targetPath}`)
                } else setLoading(false)
            } else {
                const createdNote = await notes.addOne(id, note)
                if (createdNote) {
                    push(`/note/${createdNote.doc_id}`)
                    setLoading(false)
                } else setLoading(false)
            }

        }
    }
    return (
        <div className="max-w-6xl w-full mx-auto px-6 py-12 flex flex-col">
            { process.env.NODE_ENV === 'development' ? <span className="text-muted-foreground">Пост будет доступен по id: {id}</span> : <div></div> }
            <Input placeholder='Введите название заметки' value={name} onChange={ e => setName(e.target.value ) } disabled={!!note}
            className="px-0 lg:text-5xl text-2xl font-semibold normal-case text-accent-foreground border-0 h-fit !ring-0"/>
            <div className="w-fit h-fit py-6 flex items-center gap-2">
                <Button onClick={createNote} disabled={loading || !validName}>
                    {note ? 'Обновить' : 'Создать'}
                </Button>
            </div>
            <ForwardRefEditor markdown={content} onChange={markdown => setContent(markdown)} />
        </div>
    )
}

export default NewNoteForm