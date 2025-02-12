'use client';

import { updateSettings } from "@/lib/actions";
import { useSettings } from "@/lib/utilComponents/useSettings";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // utilize context
  const { settings } = useSettings();
  console.log(theme, "theme in theme switcher")

  // function to handle refresh after succesfull settings update
  const handleUpdate = () => {
    updateSettings({...settings, isDarkModeOn: !settings.isDarkModeOn})
    console.log("handling update")
    setTheme(theme === "dark" ? "light" : "dark")
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevents hydration issues

  return (
    <button
      className="p-2 border rounded-md"
    // //   onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    //     onClick={() => updateSettings(
    //         {
    //             ...settings, 
    //             isDarkModeOn: !settings.isDarkModeOn,
    //         },
    //     )
    //   }
      onClick={() => handleUpdate()}
    >
      {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
