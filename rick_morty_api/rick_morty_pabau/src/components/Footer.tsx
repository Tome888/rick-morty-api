import { useLanguageContext } from "../context/LanguageContext";

function Footer() {
  const { langState, toggleLangState } = useLanguageContext();

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
