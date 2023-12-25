import NotesMark from "../shared/notes-mark"

const HeaderSkeleton = () => {
    return (
        <div className='flex items-center justify-between w-full h-full'>
            <NotesMark />
            <div className="flex items-center h-full gap-2 w-fit">
                <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />
            </div>
        </div>
    )
}

export default HeaderSkeleton