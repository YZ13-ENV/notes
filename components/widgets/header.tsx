import Link from "next/link"
import NotesMark from "../shared/notes-mark"
import User from "../shared/user"
import { Button } from "../ui/button"

const Header = () => {
    return (
        <header className='w-full h-16 shrink-0 border-b bg-card'>
            <div className='w-full max-w-7xl mx-auto flex items-center justify-between px-6 h-full'>
                <Link href='/'><NotesMark /></Link>
                <div className="w-fit h-fit flex items-center gap-4">
                    <Button size='sm'><Link href='/note/new'>Добавить</Link></Button>
                    <User />
                </div>
            </div>
        </header>
    )
}

export default Header