interface SortProps {
  sortByFuc: (sortType: string | null) => void;
}

function SortComponent({ sortByFuc }: SortProps) {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value === "None" ? null : event.target.value;
    sortByFuc(value);
  };
  return (
    <div>
      <label htmlFor="sortBy-filter">Sort By:</label>
      <select onChange={handleSortChange}>
        //the fucntion should be here
        <option value="None">None</option>
        <option value="Name">Name</option>
        <option value="Origin">Origin</option>
      </select>
    </div>
  );
}

export default SortComponent;
