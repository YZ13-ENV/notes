import Link from "next/link"
import NotesMark from "../shared/notes-mark"
import User from "../shared/user-circle"
import { ProjectsGrid } from "ui"
import NotificationsWrapper from '@/components/shared/notifications'
import MenuButton from "../shared/menu-button"

const Header = () => {
    return (
        <header className='w-full h-14 shrink-0 border-b'>
            <div className='w-full flex items-center justify-between px-6 h-full'>
                <div className="w-fit h-fit flex items-center gap-4">
                    <MenuButton />
                    <Link href='/'><NotesMark /></Link>
                </div>
                <div className="w-fit h-fit flex items-center gap-4">
                    <NotificationsWrapper />
                    <ProjectsGrid />
                    <User />
                </div>
            </div>
        </header>
    )
}

export default Header