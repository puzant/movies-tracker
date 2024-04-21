import { http, HttpResponse } from "msw";

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Drama" },
];

export const handlers = [
  http.get("https://api.themoviedb.org/3/genre/movie/list", () => {
    return HttpResponse.json({ genres });
  }),
];
