interface Character {
  __typename: string;
  id: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: {
    __typename: string;
    name: string;
  };
}

interface Info {
  __typename: string;
  next: number | null;
  prev: number | null;
}

interface DataType {
  characters: {
    __typename: string;
    results: Character[];
    info: Info;
  };
}
export type { DataType };
