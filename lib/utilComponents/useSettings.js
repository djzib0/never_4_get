"use client";
import { createContext, useContext } from "react";

const SettingsContext = createContext();

export function SettingsProvider({ children, settings }) {
  // const [settings, setSettings] = useState({
  //   isDarkModeOn: false,
  // });

  // useEffect(() => {
  //   async function fetchSettings() {
  //     const res = await fetch(`http://localhost:3000/api/settings/${userId}`);
  //     if (res.ok) {
  //       setSettings(await res.json());
  //     }
  //   }
  //   fetchSettings();
  // }, [userId]);

  return (
    <SettingsContext.Provider value={{ settings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
