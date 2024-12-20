import { useState, useEffect, useRef } from "react";
import { gql, useQuery } from "@apollo/client";
import Card from "../microComponents/Card";

interface CardInfo {
  id: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: {
    name: string;
  };
}

interface QueryType {
  pageNumber: number;
  setNumberPage: (pageNumber: number) => void;
  setNext: (value: boolean) => void;
  setPrev: (value: boolean) => void;
  status: string | null;
  species: string | null;
  sortBy: string | null;
  isNextPage: boolean;
  isPrevPage: boolean;
}

function CharacterList({
  pageNumber,
  setNumberPage,
  setNext,
  setPrev,
  status,
  species,
  sortBy,
  isNextPage,
  isPrevPage,
}: QueryType) {
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
  const [arrSort, setArrSort] = useState<CardInfo[]>([]);
  const [lastScroll, setLastScroll] = useState("bottom");

  //fetching the data with desired schema
  const { loading, error, data } = useQuery(GET_CHARACTERS_FILTER, {
    variables: {
      page: pageNumber,
      status: status || undefined,
      species: species || undefined,
    },
  });

  const divRef = useRef<HTMLDivElement>(null);

  //this effect does acouple of things 1. sets the scroll of the wrapper cards 2.enables and desables the button for pagination 3. creates a new data array depending on the sort method
  useEffect(() => {
    const div = divRef.current;
    if (div) {
      if (lastScroll === "bottom") {
        const scrollToPosition = div.scrollHeight * 0.02;
        div.scrollTop = scrollToPosition;
      } else if (lastScroll === "top") {
        const scrollToPosition = div.scrollHeight * 0.55;
        div.scrollTop = scrollToPosition;
      }
    }
    if (data) {
      setPrev(Boolean(data.characters.info.prev));
      setNext(Boolean(data.characters.info.next));
    }

    if (data) {
      let sortedData = [...data.characters.results];

      if (sortBy === "Origin") {
        sortedData.sort((a, b) => a.origin.name.localeCompare(b.origin.name));
      } else if (sortBy === "Name") {
        sortedData.sort((a, b) => a.name.localeCompare(b.name));
      }
      setArrSort(sortedData);
    }
  }, [data, setPrev, setNext, sortBy, lastScroll]);

  //changes page with scroll
  const handleScroll = () => {
    const div = divRef.current;

    if (div) {
      const isAtBottom = div.scrollHeight - div.scrollTop === div.clientHeight;
      const isAtTop = div.scrollTop === 0;

      if (isAtBottom) {
        if (isNextPage) {
          setNumberPage(pageNumber + 1);
          setLastScroll("bottom");
        }
      }

      if (isAtTop) {
        if (isPrevPage) {
          setNumberPage(pageNumber - 1);
          setLastScroll("top");
        }
      }
    }
  };

  if (loading)
    return (
      <div className="wrapperCards cloneWrapper">
        <div id="loading"></div>
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="wrapperCards cloneWrapper">
        <p>Error: {error.message}</p>
      </div>
    );

  return (
    <div ref={divRef} className="wrapperCards" onScroll={handleScroll}>
      {!sortBy &&
        data.characters.results.map((character: CardInfo) => (
          <Card
            key={character.id}
            id={character.id}
            name={character.name}
            status={character.status}
            species={character.species}
            gender={character.gender}
            origin={character.origin}
          />
        ))}
      {sortBy &&
        arrSort.map((character: CardInfo) => (
          <Card
            key={character.id}
            id={character.id}
            name={character.name}
            status={character.status}
            species={character.species}
            gender={character.gender}
            origin={character.origin}
          />
        ))}
    </div>
  );
}

export default CharacterList;
