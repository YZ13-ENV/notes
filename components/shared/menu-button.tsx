'use client'

import { usePathname, useSearchParams } from "next/navigation"
import { Button } from "../ui/button"
import Link from "next/link"
import { BiMenu, BiX } from "react-icons/bi"

const MenuButton = () => {
  const searchParams = useSearchParams()
  const sideParam = searchParams.get('side')
  const side = sideParam ? parseInt(sideParam) : 0
  const path = usePathname()
  const link = `${path}?side=${side === 0 ? 1 : 0}`
  const size = 20
  return (
    <Button asChild variant='ghost' size='icon'>
      <Link href={link}>
        {
          side
          ? <BiX size={size} />
          : <BiMenu size={size} />
        }
      </Link>
    </Button>
  )
}

export default MenuButton