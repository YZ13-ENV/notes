'use client'

import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
}
const SidebarWrapper = ({ children }: Props) => {
  const searchParams = useSearchParams()
  const sideParam = searchParams.get('side')
  const side = sideParam ? parseInt(sideParam) : 0
  if (!side) return null
  return (
    <aside className={cn(
      side === 1 ? "md:w-80 w-full" : "w-0",
      'md:relative absolute z-20 bg-background left-0 shrink-0 px-6 flex flex-col py-12 h-full'
    )}>
      { children }
    </aside>
  )
}

export default SidebarWrapper