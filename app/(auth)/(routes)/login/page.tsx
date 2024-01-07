import dynamic from "next/dynamic";
import LoginCenter from "../../_components/login";
const GoogleLogin = dynamic(() => import("../../_components/login/google-login"), {
    loading: () => <ButtonLoader />
})
const GithubLogin = dynamic(() => import("../../_components/login/github-login"), {
    loading: () => <ButtonLoader />
})

const ButtonLoader = () => <div className="w-full h-12 rounded-lg bg-muted animate-pulse" />

const page = () => {
    return (
        <div style={{ height: 'calc(100% - 64px)' }} className="flex flex-col items-center justify-center w-full max-w-xs gap-2 mx-auto">
            <LoginCenter />
        </div>
    )
}

export default page