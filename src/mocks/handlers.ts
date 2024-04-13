import { http, HttpResponse } from 'msw'

export const handlers = [
	http.get('https://api.themoviedb.org/3/discover/movie?language=en&page=1&sort_by=popularity.desc&api_key=63d59f2df02d27e6739533218ba6c9d9', (resolver) => {
		return HttpResponse.json([])
	})
]