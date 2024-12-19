import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import Card from "../microComponents/Card";
// import CardInfo from "../Types/CardsType";
import { DataType } from "../Types/DataType";

// interface QueryType {
//   query: any;
//   pageNumber: number;
//   setNext: (value: boolean) => void;
//   setPrev: (value: boolean) => void;
//   status: string | null;
//   species: string | null;
// }

// function CharacterList({
//   query,
//   pageNumber,
//   setNext,
//   setPrev,
//   status,
//   species,
// }: QueryType) {
//   //   const { loading, error, data } = useQuery(query, {
//   //     variables: { page: pageNumber },
//   //   });

//   const { loading, error, data } = useQuery(query, {
//     variables: {
//       page: pageNumber,
//       status: status || undefined, // Pass undefined if no filter is set
//       species: species || undefined,
//     },
//   });

//   useEffect(() => {
//     if (data) {
//       setPrev(Boolean(data.characters.info.prev));
//       setNext(Boolean(data.characters.info.next));
//     }
//   }, [data, setPrev, setNext]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div>
//       <div
//         className="wrapperCards"
//         style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
//       >
//         {data.characters.results.map((character: CardInfo) => (
//           <Card
//             key={character.id}
//             id={character.id}
//             name={character.name}
//             status={character.status}
//             species={character.species}
//             gender={character.gender}
//             origin={character.origin}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default CharacterList;

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
  setNext: (value: boolean) => void;
  setPrev: (value: boolean) => void;
  status: string | null;
  species: string | null;
  sortBy: string | null;
}

function CharacterList({
  query,
  pageNumber,
  setNext,
  setPrev,
  status,
  species,
  sortBy,
}: QueryType) {
  const [arrSort, setArrSort] = useState<CardInfo[]>([]);
  const { loading, error, data } = useQuery(query, {
    variables: {
      page: pageNumber,
      status: status || undefined, // Pass undefined if no filter is set
      species: species || undefined, // Pass undefined if no filter is set
    },
  });

  useEffect(() => {
    if (data) {
      setPrev(Boolean(data.characters.info.prev)); // Enable/disable prev button
      setNext(Boolean(data.characters.info.next)); // Enable/disable next button
    }

    if (data) {
      let sortedData = [...data.characters.results]; // Copy the results to avoid mutating the original data

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
  }, [data, setPrev, setNext, sortBy]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div
        className="wrapperCards"
        style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
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
    </div>
  );
}

export default CharacterList;
