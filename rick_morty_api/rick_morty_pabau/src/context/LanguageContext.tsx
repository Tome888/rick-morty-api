import React, { createContext, useContext, useState, useEffect } from "react";

// Define the context type
interface LanguageContextType {
  langState: number; // 0 or 1
  toggleLangState: () => void;
}
interface ProviderProps {
  children: React.ReactElement;
}

// Create the context with a default value (we'll update this later)
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Create a provider component to wrap your app
export function LanguageProvider({ children }: ProviderProps) {
  const [langState, setLangState] = useState<number>(0);

  // Load from localStorage if present
  useEffect(() => {
    const savedLangState = localStorage.getItem("langState");
    if (savedLangState) {
      setLangState(parseInt(savedLangState, 10));
    }
  }, []);

  // Toggle between 0 and 1, and persist in localStorage
  const toggleLangState = () => {
    const newLangState = langState === 0 ? 1 : 0;
    setLangState(newLangState);
    localStorage.setItem("langState", newLangState.toString());
  };

  return (
    <LanguageContext.Provider value={{ langState, toggleLangState }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Create a custom hook to use the context
export const useLanguageContext = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguageContext must be used within a LanguageProvider"
    );
  }
  return context;
};
