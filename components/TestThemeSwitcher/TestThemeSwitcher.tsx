'use client'

import { updateSettings } from '@/lib/actions';
import { useSettings } from '@/lib/utilComponents/useSettings'
import React, { useEffect, useState } from 'react'

const TestThemeSwitcher = () => {

  const { settings } = useSettings();

  const [settingsData, setSettingsData] = useState(
    {
      isDarkModeOn: false
    }
  )

  useEffect(() => {
      console.log("Activating useEffect 1 in test switcher")
      if (settingsData.isDarkModeOn) {
        document.documentElement.classList.remove('light')
        document.documentElement.classList.add('dark')
      }
  
      if (settingsData.isDarkModeOn === false) {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('light')
      }
  
    }, [settingsData.isDarkModeOn])

  useEffect(() => {
      console.log("Activating useEffect 2 in test switcher")
      if (settingsData.isDarkModeOn) {
        document.documentElement.classList.remove('light')
        document.documentElement.classList.add('dark')
      }
  
      if (settingsData.isDarkModeOn === false) {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('light')
      }
  
    }, [settingsData.isDarkModeOn])
  
    console.log(settings, "I'm in the provider")
  
    const changeTheme = () => {
      
      if (settingsData.isDarkModeOn === true) {
        document.documentElement.classList.remove('light')
        document.documentElement.classList.add('dark')
        updateSettings({...settings, isDarkModeOn: false})
        setSettingsData({isDarkModeOn: false})
      } 
  
      if (settingsData.isDarkModeOn === false) {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('light')
        updateSettings({...settings, isDarkModeOn: true})
        setSettingsData({isDarkModeOn: true})
      }
    }

  return (
    <div>
      <button onClick={changeTheme}>Click to change theme in component</button>
    </div>
  )
}

export default TestThemeSwitcher