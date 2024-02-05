import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getVisitorId } from "@/helpers/cookies"
import { notes } from "api"
import Link from "next/link"
import SidebarWrapper from "./wrapper"

const Sidebar = async() => {
    const visitorId = getVisitorId()
    const notesList = visitorId ? await notes.getAllForUser(visitorId) : []
    return (
        <SidebarWrapper>
            <Button className="justify-start" variant='ghost'>
                <Link href='/'>Заметки</Link>
            </Button>
            <Separator className="my-4" />
            {
                notesList.map(note =>
                <Button key={note.doc_id + '-aside'} asChild className="justify-start" variant='ghost'>
                    <Link href={`/note/${note.doc_id}`}>{ note.name }</Link>
                </Button>
                )
            }
        </SidebarWrapper>
    )
}

export default Sidebar