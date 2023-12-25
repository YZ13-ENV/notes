'use client'
import { notes } from "@/api/notes"
import { Markdown } from "@/components/shared/markdown"
import Textarea from "@/components/shared/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Note } from "@/types/notes"
import { User } from "firebase/auth"
import { DateTime } from "luxon"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { BiHide, BiShow } from "react-icons/bi"

type Props = {
    user: User
}
const NewNoteForm = ({ user }: Props) => {
    const [name, setName] = useState<string>('')
    const [preview, setPreview] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [content, setContent] = useState<string>('')
    const regExp = /[\w\[\]`!@#$%\^&*()={}:;<>+'-]*/g
    const nameIdRegExp = /[^a-zA-Z 0-9 -]+/g
    const { push } = useRouter()
    const id = name
        .toLowerCase()
        .replace(nameIdRegExp,'')
        .replaceAll(' ', '-')
        .replaceAll('--', '-')

    const validName = regExp.test(name)
    const createNote = async() => {
        setLoading(true)
        const note: Note = {
            name: name,
            content: content,
            createdAt: DateTime.now().toSeconds(),
            author: user.uid,
            pinned: false
        }
        const createdNote = await notes.addOne(id, note)
        if (createdNote) {
            push(`/note/${createdNote.doc_id}`)
            setLoading(false)
        } else setLoading(false)
    }
    return (
        <div className="max-w-6xl w-full mx-auto px-6 py-12 flex flex-col">
            { process.env.NODE_ENV === 'development' ? <span className="text-muted-foreground">Пост будет доступен по id: {id}</span> : <div></div> }
            <Input placeholder='Введите название заметки' value={name} onChange={ e => setName(e.target.value ) }
            className="px-0 lg:text-5xl text-2xl font-semibold normal-case text-accent-foreground border-0 h-fit !ring-0"/>
            <div className="w-fit h-fit py-6 flex items-center gap-2">
                <Button onClick={() => setPreview(!preview)} size='icon' variant={preview ? 'default' : 'outline'}>{ preview ? <BiHide /> : <BiShow />}</Button>
                <Button onClick={createNote} disabled={loading || !validName}>Создать</Button>
            </div>
            {
                preview
                ? <Markdown pageMode>{content || '### Введите содержание поста'}</Markdown>
                : <Textarea value={content} className="w-full" onChange={ e => setContent(e.target.value) } placeholder="Введите содержание заметки"  />
            }
        </div>
    )
}

export default NewNoteForm