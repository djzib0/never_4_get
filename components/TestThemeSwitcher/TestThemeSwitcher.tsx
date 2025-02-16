'use client'

import { useSettings } from '@/lib/utilComponents/SettingsContext'

const TestThemeSwitcher = () => {

  const { changeTheme } = useSettings();



  return (
    <div>
      <button onClick={changeTheme}>Click to change theme in component</button>
    </div>
  )
}

export default TestThemeSwitcher