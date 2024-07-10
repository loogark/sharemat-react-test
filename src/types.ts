export type ApiResponse<T> = {
  results: T extends Character[] ? T : T;
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
};

export interface QueryParams {
  [key: string]: string | number | boolean;
}

// Character type

type Status = "Alive" | "Dead" | "Unknown";
type Species = "Human" | "Alien" | "Mythological Creature";

export type Character = {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: {
    name: string;
    url: string;
  };
  name: string;
  origin: {
    name: string;
    url: string;
  };
  species: Species;
  status: Status;
  type: string;
  url: string;
};
