"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

/* Components */
import { Button } from "@/components/ui/button";

/* Icons */
import { RiSunLine } from "@remixicon/react";
import { RiMoonLine } from "@remixicon/react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleThemeSwitch = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <Button variant="ghost" onClick={handleThemeSwitch}>
      <motion.div
        key={theme}
        initial={{ opacity: 0, scale: 0.8, rotate: 90 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
        transition={{ duration: 0.4 }}
      >
        {theme === "dark" ? <RiMoonLine /> : <RiSunLine />}
      </motion.div>
    </Button>
  );
};

export default ThemeSwitcher;
