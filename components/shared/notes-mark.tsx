import Image from "next/image"
import { cdn } from "@/helpers/cdn"
import { config } from "@/app.config"

const NotesMark = () => {
    return (
        <div className="flex items-center gap-2 w-fit h-fit">
            <Image src={cdn('dm/icons/keeper-dark.svg')} width={24} height={24} alt="keeper-logo" />
            <span className="text-xl md:inline hidden font-semibold text-center text-accent-foreground">{ config.name }</span>
        </div>
    )
}

export default NotesMark