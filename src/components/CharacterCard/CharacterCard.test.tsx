import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Character } from "../../types";
import CharacterCard from "./CharacterCard";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: () => [
    {
      get: (param: string) => {
        if (param === "page") return "1";
        if (param === "name") return "Rick";
        return null;
      },
    },
  ],
}));

const mockCharacter: Character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: {
    name: "Earth (C-137)",
    url: "https://rickandmortyapi.com/api/location/1",
  },
  location: {
    name: "Citadel of Ricks",
    url: "https://rickandmortyapi.com/api/location/3",
  },
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: [
    "https://rickandmortyapi.com/api/episode/1",
    "https://rickandmortyapi.com/api/episode/2",
  ],
  url: "https://rickandmortyapi.com/api/character/1",
  created: "2017-11-04T18:48:46.250Z",
};

describe("CharacterCard", () => {
  it("should renders character information correctly", () => {
    render(
      <MemoryRouter>
        <CharacterCard character={mockCharacter} />
      </MemoryRouter>
    );

    expect(screen.getByRole("img")).toHaveAttribute("src", mockCharacter.image);
    expect(screen.getByRole("img")).toHaveAttribute("alt", mockCharacter.name);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      mockCharacter.name
    );

    expect(
      screen.getByText(`${mockCharacter.status} - ${mockCharacter.species}`)
    ).toBeInTheDocument();

    expect(screen.getByText("Gender:")).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.gender)).toBeInTheDocument();

    expect(screen.getByText("Last known location:")).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.location.name)).toBeInTheDocument();

    expect(screen.getByText("Origin:")).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.origin.name)).toBeInTheDocument();
  });

  it("should render links to correct character page with correct state", () => {
    render(
      <MemoryRouter>
        <CharacterCard character={mockCharacter} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/character/${mockCharacter.id}`);
    expect(link).toHaveAttribute("class", "character-link");
  });
});
