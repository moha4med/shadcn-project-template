"use client";

import { useInternationalization } from "@/context/InternationalizationContext";

import { Button } from "@/components/ui/button";
import { RiGlobalLine } from "@remixicon/react";

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage } = useInternationalization();

  const handleLanguageSwitch = () => {
    const newLanguage = currentLanguage === "en" ? "fr" : "en";
    changeLanguage(newLanguage);
  };

  return (
    <div>
      <Button variant="ghost" onClick={handleLanguageSwitch}>
        <RiGlobalLine />
        <span className="ml-1">{currentLanguage === "en" ? "FR" : "EN"}</span>
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
