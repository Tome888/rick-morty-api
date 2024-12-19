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
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value === "All" ? null : event.target.value;
    setFilterTypeStatus(value); // Update status with the selected value
  };

  const handleSpeciesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value === "All" ? null : event.target.value;
    setFilterTypeSpecies(value); // Update species with the selected value
  };

  return (
    <div>
      <div>
        <label htmlFor="status-filter">Status</label>
        <select id="status-filter" onChange={handleStatusChange}>
          <option value="All">All</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="Unknown">Unknown</option>
        </select>
      </div>
      <div>
        <label htmlFor="species-filter">Species</label>
        <select id="species-filter" onChange={handleSpeciesChange}>
          <option value="All">All</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
        </select>
      </div>
    </div>
  );
}

export default DropDownFilter;
