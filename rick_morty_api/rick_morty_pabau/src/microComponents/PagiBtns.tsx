import PagiProps from "../Types/PagiType";

function PagiBtns({
  pageNum,
  setPageNum,
  isNextActive,
  isPrevActive,
}: PagiProps) {
  return (
    <div>
      <button onClick={() => setPageNum(pageNum - 1)} disabled={!isPrevActive}>
        prev
      </button>
      <h3>Page {pageNum}</h3>
      <button onClick={() => setPageNum(pageNum + 1)} disabled={!isNextActive}>
        next
      </button>
    </div>
  );
}
export default PagiBtns;
