import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { SearchBar } from "../SearchBar";

jest.mock("../../hooks/useDebounce.ts", () => ({
  useDebounce: jest.fn((value) => [value]),
}));

const mockSetSearchParams = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: () => [
    {
      get: jest.fn((param) => {
        if (param === "name") return "initialQuery";
        return null;
      }),
    },
    mockSetSearchParams,
  ],
}));

describe("SearchBar", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockSetSearchParams.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const renderWithRouter = (initialEntries = ["/"], route = "/") => {
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path={route} element={<SearchBar />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it("should render search input", () => {
    renderWithRouter();
    expect(
      screen.getByPlaceholderText("Search characters...")
    ).toBeInTheDocument();
  });

  it("should update query state on input change", () => {
    renderWithRouter();
    const input = screen.getByPlaceholderText("Search characters...");
    fireEvent.change(input, { target: { value: "Rick" } });
    expect(input).toHaveValue("Rick");
  });

  it("should update search params after debounce", () => {
    renderWithRouter();
    const input = screen.getByPlaceholderText("Search characters...");

    fireEvent.change(input, { target: { value: "Morty" } });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(mockSetSearchParams).toHaveBeenCalledWith(expect.any(Function));
    const setParamsFn = mockSetSearchParams.mock.calls[0][0];
    const mockPrev = {
      delete: jest.fn(),
      set: jest.fn(),
    };
    setParamsFn(mockPrev);
    expect(mockPrev.delete).toHaveBeenCalledWith("page");
    expect(mockPrev.set).toHaveBeenCalledWith("name", "Morty");
  });

  it("should remove search query when input is cleared", () => {
    renderWithRouter(["/?name=initialQuery"]);
    const input = screen.getByPlaceholderText("Search characters...");

    fireEvent.change(input, { target: { value: "" } });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(mockSetSearchParams).toHaveBeenCalledWith(expect.any(Function));
    const setParamsFn = mockSetSearchParams.mock.calls[0][0];
    const mockPrev = {
      delete: jest.fn(),
      set: jest.fn(),
    };
    setParamsFn(mockPrev);
    expect(mockPrev.set).toHaveBeenCalledWith("page", "1");
    expect(mockPrev.delete).toHaveBeenCalledWith("name");
  });
});
