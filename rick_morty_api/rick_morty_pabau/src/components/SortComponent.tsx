import { useLanguageContext } from "../context/LanguageContext";
import lang from "../translation/translate";

interface SortProps {
  sortByFuc: (sortType: string | null) => void;
}

function SortComponent({ sortByFuc }: SortProps) {
  //adding language context for use
  const { langState } = useLanguageContext();

  //setting the sort feature
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value === "None" ? null : event.target.value;
    sortByFuc(value);
  };

  return (
    <div>
      <label htmlFor="sortBy-filter">Sort By:</label>
      <select onChange={handleSortChange}>
        <option value="None">{lang[langState].translations.none}</option>
        <option value="Name">Name</option>
        <option value="Origin">{lang[langState].translations.origin}</option>
      </select>
    </div>
  );
}

export default SortComponent;
