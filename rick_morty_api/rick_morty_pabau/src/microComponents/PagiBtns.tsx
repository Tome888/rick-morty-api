import { useLanguageContext } from "../context/LanguageContext";
import lang from "../translation/translate";
import PagiProps from "../Types/PagiType";

function PagiBtns({
  pageNum,
  setPageNum,
  isNextActive,
  isPrevActive,
}: PagiProps) {
  const { langState } = useLanguageContext();
  return (
    <div className="pagiWrapper">
      <button onClick={() => setPageNum(pageNum - 1)} disabled={!isPrevActive}>
        ←
      </button>
      <h3>
        {lang[langState].translations.pageNumber} {pageNum}
      </h3>
      <button onClick={() => setPageNum(pageNum + 1)} disabled={!isNextActive}>
        →
      </button>
    </div>
  );
}
export default PagiBtns;
