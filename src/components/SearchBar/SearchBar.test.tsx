import { act, fireEvent, render, screen } from "@testing-library/react";
import { SearchBar } from "./SearchBar";

const mockSetSearchParams = jest.fn();
jest.mock("react-router-dom", () => ({
  useSearchParams: () => [
    {
      get: jest.fn((param) => {
        if (param === "name") return "initialQuery";
        return null;
      }),
    },
    mockSetSearchParams,
  ],
  useLocation: () => ({
    pathname: "/",
    search: "",
    hash: "",
    state: null,
  }),
}));

describe("SearchBar", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockSetSearchParams.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should renders search input", () => {
    render(<SearchBar />);
    expect(
      screen.getByPlaceholderText("Search characters...")
    ).toBeInTheDocument();
  });

  it("should updates query state on input change", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search characters...");
    fireEvent.change(input, { target: { value: "Rick" } });
    expect(input).toHaveValue("Rick");
  });

  it("should updates search params after debounce", () => {
    render(<SearchBar />);
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

  it("should removes search query when input is cleared", () => {
    render(<SearchBar />);
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
