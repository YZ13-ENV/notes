import dynamic from "next/dynamic";
import HeaderSkeleton from "@/components/skeletons/header";
import { Suspense } from "react";
import Sidebar from "@/components/widgets/side-bar";
const Header = dynamic(() => import('@/components/widgets/header'), {
  loading: () => <HeaderSkeleton />
})

type Props = {
  children: JSX.Element | JSX.Element[]
}
const layout = async({ children }: Props) => {
  return (
    <>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>
      <div style={{ height: `calc(100dvh - 56px)` }} className='w-full h-full flex items-start'>
        <Sidebar />
        { children }
      </div>
    </>
  )
}
export default layout