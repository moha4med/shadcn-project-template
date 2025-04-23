"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { RiFullscreenLine } from "@remixicon/react";
import { RiFullscreenExitLine } from "@remixicon/react";
import { RiNotification3Line } from "@remixicon/react";

interface HeaderProps {
  title: string;
  description: string;
}

const Header = ({ title, description }: HeaderProps) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    const elem = document.documentElement;

    if (!isFullScreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
      }
    }
  };

  return (
    <div className="w-full bg-gray-400/10 flex justify-between items-center gap-4 px-8 py-6 sm:px-20 border-b border-zinc-300">
      <div>
        <h1 className="text-xl font-medium font-[family-name:var(--font-geist-sans)]">
          {title}
        </h1>
        <p className="text-sm font-light font-[family-name:var(--font-geist-sans)]">
          {description}
        </p>
      </div>

      <div className="flex justify-center items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost">
              <RiNotification3Line />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="mr-4 p-4" sideOffset={10}>
            <div className="flex flex-col gap-4 min-h-32"></div>
          </PopoverContent>
        </Popover>

        <ThemeSwitcher />

        <Button variant="ghost" onClick={handleFullScreen}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
          >
            {isFullScreen ? <RiFullscreenExitLine /> : <RiFullscreenLine />}
          </motion.div>
        </Button>

        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default Header;
