"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { updateSettings } from "../actions";

const SettingsContext = createContext();

export function SettingsProvider({ children, settings, userId }) {

  const [settingsData, setSettingsData] = useState({
    isDarkModeOn: false
  });

  useEffect(() => {
    async function fetchSettings() {
      const res = userId && await fetch(`${process.env.API_URL}/api/settings/${userId}`);
      if (res.ok) {
        const data = await res.json();
        console.log(data, " data")
        setSettingsData(data)
      }
    }
    fetchSettings();
  }, [userId]);

  console.log("userId is now:", userId)

  useEffect(() => {
    if (settingsData.isDarkModeOn) {
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
    }

    if (settingsData.isDarkModeOn === false) {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    }

  }, [settingsData.isDarkModeOn])

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
    <SettingsContext.Provider value={{ settings, changeTheme }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
