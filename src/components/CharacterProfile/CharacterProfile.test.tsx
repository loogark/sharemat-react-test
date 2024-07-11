import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useCharacterProfile } from "../../hooks";
import { Character } from "../../types";
import { CharacterProfile } from "./CharacterProfile";

jest.mock("../../hooks/api/useCharacterProfile", () => ({
  useCharacterProfile: jest.fn(() => ({
    character: null,
    isLoading: false,
    error: null,
    backLinkParams: "",
  })),
}));

const mockUseCharacterProfile = useCharacterProfile as jest.MockedFunction<
  typeof useCharacterProfile
>;

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

describe("CharacterProfile", () => {
  it("should render loading spinner when isLoading is true", () => {
    mockUseCharacterProfile.mockReturnValue({
      character: null,
      isLoading: true,
      backLinkParams: "",
      error: null,
    });

    render(<CharacterProfile />);

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("should render error message when there is an error", () => {
    mockUseCharacterProfile.mockReturnValue({
      character: null,
      isLoading: false,
      backLinkParams: "",
      error: new Error("Test error"),
    });

    render(
      <MemoryRouter>
        <CharacterProfile />
      </MemoryRouter>
    );

    expect(screen.getByText("Test error")).toBeInTheDocument();
  });

  it("should render character profile when data is loaded", () => {
    mockUseCharacterProfile.mockReturnValue({
      character: mockCharacter,
      isLoading: false,
      backLinkParams: "?page=1",
      error: null,
    });

    render(
      <MemoryRouter>
        <CharacterProfile />
      </MemoryRouter>
    );

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Status: Alive")).toBeInTheDocument();
    expect(screen.getByText("Species: Human")).toBeInTheDocument();
    expect(screen.getByText("Gender: Male")).toBeInTheDocument();
    expect(screen.getByText("Origin: Earth (C-137)")).toBeInTheDocument();
    expect(screen.getByText("No.of Episodes: 2")).toBeInTheDocument();
    expect(screen.getByAltText("Rick Sanchez")).toHaveAttribute(
      "src",
      mockCharacter.image
    );
  });

  it("should render back link with correct params", () => {
    mockUseCharacterProfile.mockReturnValue({
      character: null,
      isLoading: false,
      backLinkParams: "?page=2",
      error: null,
    });

    render(
      <MemoryRouter>
        <CharacterProfile />
      </MemoryRouter>
    );

    const backLink = screen.getByText("Back to all characters");
    expect(backLink).toHaveAttribute("href", "/?page=2");
  });
});
