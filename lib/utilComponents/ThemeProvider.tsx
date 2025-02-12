'use client'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode, useEffect, useState } from "react";
import { getSettingsData } from "../data";

const ThemeProvider = ({children, userId}: {children: ReactNode, userId: string}) => {

  
  const [theme, setTheme] = useState<string | undefined>();
  const [loaded, setLoaded] = useState(false);

  // const [defaultTheme, setDefaultTheme] = useState<string>();
  console.log(theme, "in Theme Provider")
  console.log(userId, "in Theme Provider")
  
  useEffect(() => {
    const fetchTheme = async () => {
      const settings = await getSettingsData(userId)
      setTheme(settings.isDarkModeOn ? "dark" : "light")
      setLoaded(true);
    };
    fetchTheme();
  }, [userId, setTheme])
  
  if (!loaded) return null; // Prevents hydration mismatch

  return (
    <NextThemesProvider attribute="class" defaultTheme={theme}>{children}</NextThemesProvider>
  )
}

export default ThemeProvider