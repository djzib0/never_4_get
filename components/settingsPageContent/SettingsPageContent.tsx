'use client'
import AvatarImgUrlForm from './avatarImgUrlForm/AvatarImgUrlForm'

const SettingsPageContent = ({userId}: {userId: string}) => {

  return (
    <div>
      <p className='font-semibold uppercase'>Change avatar</p>
      <AvatarImgUrlForm userId={userId} />
    </div>
  )
}

export default SettingsPageContent