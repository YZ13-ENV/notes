import Link from "next/link"
import NotesMark from "../shared/notes-mark"
import { cookies } from "next/headers"
import User from "../shared/user-circle"
import { ProjectsGrid } from "ui"

const Header = () => {
    const cookiesList = cookies()
    const uidCookie = cookiesList.get('uid')
    const uid = uidCookie ? uidCookie.value : null
    return (
        <header className='w-full h-16 shrink-0 border-b'>
            <div className='w-full max-w-7xl mx-auto flex items-center justify-between px-6 h-full'>
                <Link href='/'><NotesMark /></Link>
                <div className="w-fit h-fit flex items-center gap-4">
                    <ProjectsGrid />
                    <User />
                </div>
            </div>
        </header>
    )
}

export default Header