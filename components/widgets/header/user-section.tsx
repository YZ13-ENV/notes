import NotificationsWrapper from '@/components/shared/notifications'
import User from '@/components/shared/user-circle'
import { ProjectsGrid } from 'ui'

const UserSection = () => {
  return (
    <div className="w-fit h-fit flex items-center gap-4">
      <NotificationsWrapper />
      <ProjectsGrid />
      <User />
    </div>
  )
}

export default UserSection