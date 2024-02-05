import LoginDrawer from "./(auth)/_components/login/login-drawer";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import HeaderSkeleton from "@/components/skeletons/header";
import Sidebar from "@/components/widgets/side-bar";
import { getVisitorId } from "@/helpers/cookies";
import RecentNotes from "@/components/widgets/recent-note";
const Header = dynamic(() => import('@/components/widgets/header'), {
  loading: () => <HeaderSkeleton />
})

export default function Home() {
  const visitorId = getVisitorId()
  if (!visitorId) return (
    <main style={{ height: 'calc(100vh - 64px)' }} className="w-full h-full">
      <div className="w-full h-full flex items-center justify-center">
        <span>Необходимо авторизоваться</span>
      </div>
      <LoginDrawer />
    </main>
  )
  return (
    <>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>
      <div style={{ height: `calc(100dvh - 56px)` }} className='w-full h-full flex items-start'>
        <Sidebar />
        <main className="max-w-6xl w-full h-full mx-auto px-6 py-12 flex flex-col gap-6 ">
          <span className="text-2xl font-bold text-accent-foreground">Недавно созданные</span>
          <RecentNotes />
        </main>
      </div>
    </>
  )
}
