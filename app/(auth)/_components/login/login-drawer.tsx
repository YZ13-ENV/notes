import { Drawer, DrawerContent } from '@/components/ui/drawer'
import LoginCenter from '.'

const LoginDrawer = () => {
    return (
        <Drawer open={true}>
            <DrawerContent className='max-w-sm mx-auto w-full shrink-0'>
                <LoginCenter />
            </DrawerContent>
        </Drawer>
    )
}

export default LoginDrawer