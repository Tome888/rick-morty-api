import React, { createContext, useContext, useState, useEffect } from "react";

// creating props to be able to make context
interface LanguageContextType {
  langState: number;
  toggleLangState: () => void;
}
interface ProviderProps {
  children: React.ReactElement;
}

//context created
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: ProviderProps) {
  const [langState, setLangState] = useState<number>(0);

  useEffect(() => {
    //checking to see if we have a set language from before
    const savedLangState = localStorage.getItem("langState");
    if (savedLangState) {
      setLangState(parseInt(savedLangState, 10));
    }
  }, []);

  // Updates the langState in the component, and stores the new value in localStorage to persist the language preference across page reloads or sessions
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

//will throw error if not used properly
export const useLanguageContext = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguageContext must be used within a LanguageProvider"
    );
  }
  return context;
};
