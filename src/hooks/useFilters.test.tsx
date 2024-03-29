import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, act } from "@testing-library/react";

import useFilters from "./useFilters";
import { sortingOptions } from "@/utils/constants";

const queryClient = new QueryClient();

const wrapper = ({ children }: any) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

afterEach(() => {
  queryClient.clear();
});

describe("use filters hook", () => {
  test("default values for useFilters", () => {
    const { result } = renderHook(() => useFilters(), { wrapper });

    expect(result.current.accentColor).toBe("#0177d2");
    expect(result.current.sortBy).toStrictEqual({
      id: 1,
      key: "popularity.desc",
      name: "Popularity Descending",
    });
    expect(result.current.releaseDate).toStrictEqual({
      start: null,
      end: null,
    });
    expect(result.current.selectedGenres).toStrictEqual([]);
  });

  test("it updates sortBy property correctly", () => {
    const { result } = renderHook(() => useFilters(), { wrapper });
    act(() => {
      result.current.setSort(sortingOptions[1]);
    });

    expect(result.current.sortBy).toStrictEqual(sortingOptions[1]);
  });

  test("it updates genres property correctly", () => {
    const { result } = renderHook(() => useFilters(), { wrapper });
    const mockGenre = { id: 1, name: "Drama" };
    act(() => {
      result.current.setGenres(mockGenre);
    });

    expect(result.current.selectedGenres).toStrictEqual([{ id: 1, name: "Drama" }]);
  });

  test("should update release date (start) correctly", () => {
    const { result } = renderHook(() => useFilters(), { wrapper });
    act(() => {
      result.current.setStartDate(new Date("2022-01-01"));
    });

    expect(result.current.releaseDate.start).toEqual(new Date("2022-01-01"));
  });

  test("should update release date (end) correctly", () => {
    const { result } = renderHook(() => useFilters(), { wrapper });
    act(() => {
      result.current.setEndDate(new Date("2024-01-01"));
    });

    expect(result.current.releaseDate.end).toEqual(new Date("2024-01-01"));
  });
});
