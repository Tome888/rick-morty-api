import { useLanguageContext } from "../context/LanguageContext";
import lang from "../translation/translate";

interface FilterProps {
  filterTypeStatus?: string | null;
  setFilterTypeStatus: (filterTypeStatus: string | null) => void;

  filterTypeSpecies?: string | null;
  setFilterTypeSpecies: (filterTypeSpecies: string | null) => void;
}

function DropDownFilter({
  setFilterTypeStatus,
  setFilterTypeSpecies,
}: FilterProps) {
  //adding the context for the language to be used
  const { langState } = useLanguageContext();

  //setting the filter for the status
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value === "All" ? null : event.target.value;
    setFilterTypeStatus(value);
  };

  //setting the filter for the species
  const handleSpeciesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value === "All" ? null : event.target.value;
    setFilterTypeSpecies(value);
  };

  return (
    <div className="filterWrapper">
      <div>
        <label htmlFor="status-filter">
          {lang[langState].translations.statusFilter}:
        </label>
        <select id="status-filter" onChange={handleStatusChange}>
          <option value="All">{lang[langState].translations.all}</option>
          <option value="Alive">{lang[langState].translations.alive}</option>
          <option value="Dead">{lang[langState].translations.dead}</option>
          <option value="Unknown">
            {lang[langState].translations.filterUnknown}
          </option>
        </select>
      </div>
      <div>
        <label htmlFor="species-filter">
          {lang[langState].translations.speciesFilter}:
        </label>
        <select id="species-filter" onChange={handleSpeciesChange}>
          <option value="All">{lang[langState].translations.all}</option>
          <option value="Human">
            {lang[langState].translations.filterHuman}
          </option>
          <option value="Alien">
            {lang[langState].translations.filterAlien}
          </option>
        </select>
      </div>
    </div>
  );
}

export default DropDownFilter;
