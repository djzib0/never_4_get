'use client';

import { updateSettings } from "@/lib/actions";
import { useSettings } from "@/lib/utilComponents/useSettings";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  

  // utilize context
  const { settings } = useSettings();

  // function to handle refresh after succesfull settings update
  const handleUpdate = async () => {
    await updateSettings({...settings, isDarkModeOn: !settings.isDarkModeOn})
    await router.refresh();
  }

  useEffect(() => {
    setMounted(true);
  }, [theme, settings]);

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
