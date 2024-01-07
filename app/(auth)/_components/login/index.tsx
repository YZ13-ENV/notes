'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAuthState } from "@/hooks/useAuthState"
import { auth } from "@/utils/app"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Suspense } from "react"

const GoogleLogin = dynamic(() => import("./google-login"), {
    loading: () => <ButtonLoader />
})
const GithubLogin = dynamic(() => import("./github-login"), {
    loading: () => <ButtonLoader />
})

const ButtonLoader = () => <div className="w-full h-12 rounded-lg bg-muted animate-pulse" />

const LoginCenter = () => {
    const [user] = useAuthState(auth)
    const signOut = async() => await auth.signOut()
    if (user) return (
        <div className="w-full h-96 flex items-center justify-center gap-4 flex-col">
            <Avatar className="rounded-full w-20 h-20">
                <AvatarImage src={user.photoURL || undefined} alt="@shadcn" className="rounded-full" />
                <AvatarFallback>{user.displayName ? user.displayName?.slice(0, 2) : 'UR'}</AvatarFallback>
            </Avatar>
            <span className="text-center text-2xl text-accent-foreground font-semibold">{user.displayName || 'Пользователь'}</span>
            <div className="w-fit h-fit flex items-center justify-center gap-2">
                <Button variant='outline'><Link href='/'>Вернуться</Link></Button>
                <Button onClick={signOut} variant='destructive'>Выйти</Button>
            </div>
        </div>
    )
    return (
        <>
            <div className="w-full h-fit px-6 pt-6 flex flex-col gap-4">
                <span className='text-center text-sm text-muted-foreground'>Войдите в аккаунт DM Family</span>
            </div>
            <div className="w-full h-fit p-6 flex flex-col gap-4">
                <Suspense fallback={ <ButtonLoader /> }>
                    <GithubLogin />
                </Suspense>
                <Suspense fallback={ <ButtonLoader /> }>
                    <GoogleLogin />
                </Suspense>
                <Separator />
                <Button disabled variant='link'>Войти через почту</Button>
            </div>
        </>
    )
}

export default LoginCenter