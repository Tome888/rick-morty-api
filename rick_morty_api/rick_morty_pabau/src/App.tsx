import { useEffect, useState } from "react";
import "./App.css";
import CharacterList from "./components/CharacterList";
import PagiBtns from "./microComponents/PagiBtns";
import { gql } from "@apollo/client";
import DropDownFilter from "./components/DropDownFilter";
import SortComponent from "./components/SortComponent";

const GET_CHARACTERS_FILTER = gql`
  query GetFilteredCharacters($page: Int, $status: String, $species: String) {
    characters(page: $page, filter: { status: $status, species: $species }) {
      results {
        id
        name
        status
        species
        gender
        origin {
          name
        }
      }
      info {
        next
        prev
      }
    }
  }
`;

function App() {
  const [nextActive, setNextActive] = useState(false);
  const [prevActive, setPrevActive] = useState(true);
  const [pageNum, setPageNum] = useState(1);

  const [status, setStatus] = useState<string | null>(null);
  const [species, setSpecies] = useState<string | null>(null);

  const [sort, setSort] = useState<string | null>(null);

  const [lang, setLang] = useState("en");

  useEffect(() => {
    setPageNum(1);
    
  }, [status, species, sort]);

  return (
    // <>
    //   <h1>Rick and Morty Characters</h1>
    //   <DropDownFilter
    //     setFilterTypeStatus={setStatus}
    //     setFilterTypeSpecies={setSpecies}
    //   />
    //   <SortComponent sortByFuc={setSort} />
    //   <CharacterList
    //     query={GET_CHARACTERS_FILTER}
    //     pageNumber={pageNum}
    //     setNext={setNextActive}
    //     setPrev={setPrevActive}
    //     status={status}
    //     species={species}
    //     sortBy={sort}
    //   />
    //   <PagiBtns
    //     pageNum={pageNum}
    //     setPageNum={setPageNum}
    //     isNextActive={nextActive}
    //     isPrevActive={prevActive}
    //   />
    //   <footer></footer>
    // </>
    <main>
      <h1>Rick and Morty Characters</h1>
      <DropDownFilter
        setFilterTypeStatus={setStatus}
        setFilterTypeSpecies={setSpecies}
      />
      <SortComponent sortByFuc={setSort} />
      <CharacterList
        query={GET_CHARACTERS_FILTER}
        pageNumber={pageNum}
        setNext={setNextActive}
        setPrev={setPrevActive}
        status={status}
        species={species}
        sortBy={sort}
      />
      <PagiBtns
        pageNum={pageNum}
        setPageNum={setPageNum}
        isNextActive={nextActive}
        isPrevActive={prevActive}
      />
      <footer>
        <button></button>
      </footer>
    </main>
  );
}

export default App;
