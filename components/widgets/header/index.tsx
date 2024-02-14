import Link from "next/link"
import MenuButton from "@/components/shared/menu-button"
import NotesMark from "@/components/shared/notes-mark"
import dynamic from "next/dynamic"
const UserSection = dynamic(() => import("./user-section"), {
    ssr: false,
    loading: () => <div className="w-fit h-fit flex items-center gap-2">
        <div className="w-9 aspect-square rounded-full bg-muted animate-pulse" />
        <div className="w-9 aspect-square rounded-full bg-muted animate-pulse" />
        <div className="w-9 aspect-square rounded-full bg-muted animate-pulse" />
    </div>
})

const Header = () => {
    return (
        <header className='w-full h-14 shrink-0 border-b'>
            <div className='w-full flex items-center justify-between px-6 h-full'>
                <div className="w-fit h-fit flex items-center gap-4">
                    <MenuButton />
                    <Link href='/'><NotesMark /></Link>
                </div>
                <UserSection />
            </div>
        </header>
    )
}

export default Header