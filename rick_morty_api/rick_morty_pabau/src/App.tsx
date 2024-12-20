import { useEffect, useState } from "react";
import "./App.css";
import CharacterList from "./components/CharacterList";
import PagiBtns from "./microComponents/PagiBtns";
import { gql } from "@apollo/client";
import DropDownFilter from "./components/DropDownFilter";
import SortComponent from "./components/SortComponent";
import Footer from "./components/Footer";
import { useLanguageContext } from "./context/LanguageContext";
import lang from "./translation/translate";

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

  const { langState } = useLanguageContext();

  useEffect(() => {
    setPageNum(1);
  }, [status, species, sort]);

  return (
    <main>
      <h1>Rick and Morty {lang[langState].translations.characters}</h1>
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
        setNumberPage={setPageNum}
        isNextPage={nextActive}
        isPrevPage={prevActive}
      />
      <PagiBtns
        pageNum={pageNum}
        setPageNum={setPageNum}
        isNextActive={nextActive}
        isPrevActive={prevActive}
      />
      <Footer />
    </main>
  );
}

export default App;
