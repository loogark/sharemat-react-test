import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UseCharacters } from "../../hooks";
import { UseCharactersResult } from "../../hooks/api/useCharacters";
import { Character } from "../../types";
import { Characters } from "./Characters";

// Mock UseCharacters hook and debounce hook
jest.mock("../../hooks", () => ({
  UseCharacters: jest.fn(),
  useDebounce: jest.fn((value) => [value]),
}));

const mockUseCharacters = UseCharacters as jest.MockedFunction<
  typeof UseCharacters
>;

describe("Characters", () => {
  it("should renders loading spinner when isLoading is true", () => {
    mockUseCharacters.mockReturnValue({
      isLoading: true,
      characters: null,
      info: null,
      error: null,
      currentPage: 1,
    } as UseCharactersResult);

    render(
      <MemoryRouter>
        <Characters />
      </MemoryRouter>
    );
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("should renders NotFound when there is an error", () => {
    mockUseCharacters.mockReturnValue({
      isLoading: false,
      characters: null,
      info: null,
      error: new Error("Test error"),
      currentPage: 1,
    } as UseCharactersResult);

    render(
      <MemoryRouter>
        <Characters />
      </MemoryRouter>
    );
    expect(screen.getByText(`No Character Found`)).toBeInTheDocument();
  });

  it("should renders character cards and pagination when data is loaded", () => {
    const mockCharacters: Character[] = [
      {
        id: 1,
        name: "Rick",
        status: "Alive",
        species: "Human",
        type: "",
        gender: "Male",
        origin: { name: "Earth", url: "" },
        location: { name: "Earth", url: "" },
        image: "rick.jpg",
        episode: [""],
        url: "",
        created: "",
      },
      {
        id: 2,
        name: "Morty",
        status: "Alive",
        species: "Human",
        type: "",
        gender: "Male",
        origin: { name: "Earth", url: "" },
        location: { name: "Earth", url: "" },
        image: "morty.jpg",
        episode: [""],
        url: "",
        created: "",
      },
    ];

    mockUseCharacters.mockReturnValue({
      isLoading: false,
      characters: mockCharacters,
      info: { pages: 2, count: 2, next: null, prev: null },
      error: null,
      currentPage: 1,
    } as UseCharactersResult);

    render(
      <MemoryRouter>
        <Characters />
      </MemoryRouter>
    );
    expect(screen.getByText("Rick")).toBeInTheDocument();
    expect(screen.getByText("Morty")).toBeInTheDocument();
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
  });

  it("should always renders SearchBar", () => {
    mockUseCharacters.mockReturnValue({
      isLoading: false,
      characters: null,
      info: null,
      error: null,
      currentPage: 1,
    } as UseCharactersResult);

    render(
      <MemoryRouter>
        <Characters />
      </MemoryRouter>
    );
    expect(
      screen.getByPlaceholderText("Search characters...")
    ).toBeInTheDocument();
  });
});
