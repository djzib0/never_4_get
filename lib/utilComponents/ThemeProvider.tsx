'use client'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode, useEffect, useState } from "react";
import { useSettings } from "./useSettings";

const ThemeProvider = ({children}: {children: ReactNode}) => {

  const [theme, setTheme] = useState<string | undefined>();
  const [loaded, setLoaded] = useState(false);
  const { settings } = useSettings();
  
  useEffect(() => {
    const fetchTheme = async () => {
      console.log(settings.isDarkModeOn === false ? "light" : "dark", " will aply this")
      setTheme(settings.isDarkModeOn === false ? "light" : "dark")
      setLoaded(true);
    };
    
    fetchTheme();
  }, [theme, settings.isDarkModeOn])
  
  if (!loaded) return null; // Prevents hydration mismatch

  console.log(theme, " before returning")

  return (
    <NextThemesProvider attribute="class" defaultTheme={theme}>{children}</NextThemesProvider>
  )
}

export default ThemeProvider