import React, { useState, useEffect, useRef } from "react";
import { gql, useQuery } from "@apollo/client";
import Card from "../microComponents/Card";
// import CardInfo from "../Types/CardsType";
import { DataType } from "../Types/DataType";

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
  query: any;
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
  query,
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
  const [arrSort, setArrSort] = useState<CardInfo[]>([]);
  const [lastScroll, setLastScroll] = useState("bottom");

  const { loading, error, data } = useQuery(query, {
    variables: {
      page: pageNumber,
      status: status || undefined, // Pass undefined if no filter is set
      species: species || undefined, // Pass undefined if no filter is set
    },
  });
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // const div = divRef.current;
    // if (div) {
    //   if (lastScroll === "bottom") {
    //     const scrollToPosition = div.scrollHeight * 0.02;
    //     div.scrollTop = scrollToPosition;
    //   } else {
    //     const scrollToPosition = div.scrollHeight * 0.98;
    //     div.scrollTop = scrollToPosition;
    //   }
    // }

    const div = divRef.current;
    if (div) {
      if (lastScroll === "bottom") {
        const scrollToPosition = div.scrollHeight * 0.02;
        div.scrollTop = scrollToPosition;
      } else if (lastScroll === "top") {
        const scrollToPosition = div.scrollHeight * 0.5;
        div.scrollTop = scrollToPosition;
      }
    }
    if (data) {
      setPrev(Boolean(data.characters.info.prev)); // Enable/disable prev button
      setNext(Boolean(data.characters.info.next)); // Enable/disable next button
    }

    if (data) {
      let sortedData = [...data.characters.results];

      if (sortBy === "Origin") {
        // Sort alphabetically by origin
        sortedData.sort((a, b) => a.origin.name.localeCompare(b.origin.name));
      } else if (sortBy === "Name") {
        // Sort alphabetically by name
        sortedData.sort((a, b) => a.name.localeCompare(b.name));
      }
      setArrSort(sortedData);
      console.log(arrSort);
    }
  }, [data, setPrev, setNext, sortBy, lastScroll]);

  // const handleScroll = () => {
  //   const div = divRef.current;

  //   if (div) {
  //     const isAtBottom = div.scrollHeight - div.scrollTop === div.clientHeight;
  //     const isAtTop = div.scrollTop === 0;
  //     if (isAtBottom) {
  //       if (isNextPage) {
  //         setNumberPage(pageNumber + 1);
  //         setLastScroll("bottom");
  //       }
  //     }

  //     if (isAtTop) {
  //       if (isPrevPage) {
  //         setNumberPage(pageNumber - 1);
  //         setLastScroll("top");
  //       }
  //     }
  //   }
  // };

  const handleScroll = () => {
    const div = divRef.current;

    if (div) {
      const isAtBottom = div.scrollHeight - div.scrollTop === div.clientHeight;
      const isAtTop = div.scrollTop === 0;

      if (isAtBottom) {
        if (isNextPage) {
          setNumberPage(pageNumber + 1);
          setLastScroll("bottom"); // Track that the last scroll was to the bottom
        }
      }

      if (isAtTop) {
        if (isPrevPage) {
          setNumberPage(pageNumber - 1);
          setLastScroll("top"); // Track that the last scroll was to the top
        }
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div
      ref={divRef}
      className="wrapperCards"
      style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
      onScroll={handleScroll}
    >
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
