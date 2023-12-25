'use client'

import NewNoteForm from "@/app/(note)/_components/new-note-form"
import { useAuthState } from "@/hooks/useAuthState"
import { auth } from "@/utils/app"

const Page = () => {
    const [user] = useAuthState(auth)
    if (!user) return null
    return <NewNoteForm user={user} />
}

export default Page