"use client";

import React, { createContext, useContext } from "react";
import { useTranslation } from "react-i18next";

// Define the shape of the context's value
interface InternationalizationContextProps {
  currentLanguage: string; // The current language being used
  changeLanguage: (language: string) => void; // Function to change the language
}

// Create a context for internationalization with an undefined default value
const InternationalizationContext = createContext<
  InternationalizationContextProps | undefined
>(undefined);

// Provider component to wrap parts of the app that need access to internationalization
export const InternationalizationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { i18n } = useTranslation(); // Access i18n instance from react-i18next

  // Function to change the current language
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language); // Update the language using i18n
  };

  return (
    // Provide the current language and changeLanguage function to the context
    <InternationalizationContext.Provider
      value={{
        currentLanguage: i18n.language, // Current language from i18n
        changeLanguage, // Function to change the language
      }}
    >
      {children}
    </InternationalizationContext.Provider>
  );
};

// Custom hook to use the InternationalizationContext
export const useInternationalization = () => {
  const context = useContext(InternationalizationContext);
  if (!context) {
    // Throw an error if the hook is used outside of the provider
    throw new Error(
      "useInternationalization must be used within an InternationalizationProvider"
    );
  }
  return context;
};
