import { vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import useFilters from "./useFilters";
import useFiltersStore from "@/store/useFiltersStore";
import useUserStore from "@/store/useUserStore";
import useGenresQuery from "@/queries/useGenreQuery";
import { sortingOptions } from "@/utils/constants";

vi.mock("@/store/useUserStore", () => ({
  default: vi.fn(() => ({
    accentColor: "#0177d2",
  })),
}));

vi.mock("@/store/useFiltersStore", () => ({
  default: vi.fn(() => ({
    sortBy: sortingOptions[0],
    releaseDate: {
      start: null,
      end: null,
    },
    selectedGenres: [],
    setSort: vi.fn(),
    setStartDate: vi.fn(),
    setEndDate: vi.fn(),
    setGenres: vi.fn(),
  })),
}));

vi.mock("@/queries/useGenreQuery", () => ({
  default: vi.fn(() => ({
    useQuery: vi.fn(),
  })),
}));

describe("use filters hook", () => {
  test("default values for user store", () => {
    const { result } = renderHook(() => useUserStore());
    expect(result.current.accentColor).toBe("#0177d2");
  });

  test("default values for filters store", () => {
    const { result } = renderHook(() => useFiltersStore());
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
});
