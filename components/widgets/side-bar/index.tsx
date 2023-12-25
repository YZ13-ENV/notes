
const Sidebar = () => {
    return (
        <aside className='w-80 p-6 h-full border-r'>
            <div className="w-full h-10 rounded-lg hover:bg-muted cursor-pointer flex items-center px-3">
                <span className="text-accent-foreground">Заметки</span>
            </div>
            <div className="w-full h-10 rounded-lg hover:bg-muted cursor-pointer flex items-center px-3">
                <span className="text-accent-foreground">Новая заметка</span>
            </div>
            <hr className="my-2" />
            <div className="w-full h-10 rounded-lg hover:bg-muted cursor-pointer flex items-center px-3">
                <span className="text-accent-foreground">**Название заметки**</span>
            </div>
        </aside>
    )
}

export default Sidebar