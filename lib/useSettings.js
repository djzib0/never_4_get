"use client";
import { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext(null);

export function SettingsProvider({ children, userId }) {
  const [settings, setSettings] = useState({
    isDarkModeOn: false,
  });

  useEffect(() => {
    async function fetchSettings() {
      const res = await fetch(`http://localhost:3000/api/settings/${userId}`);
      if (res.ok) {
        setSettings(await res.json());
      }
    }
    fetchSettings();
  }, [userId]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
