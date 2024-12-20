import { useEffect } from "react";
import { useLanguageContext } from "../context/LanguageContext";
import lang from "../translation/translate";

function Footer() {
  const { langState, toggleLangState } = useLanguageContext();
  useEffect(() => {
    console.log(lang[langState]);
  }, [langState]);

  return (
    <footer>
      <p onClick={toggleLangState}>
        <span className={langState ? "" : "activeLang"}>EN</span>|
        <span className={langState ? "activeLang" : ""}>DE</span>
      </p>
    </footer>
  );
}
export default Footer;
