import { useParams, Link } from "react-router-dom"

import useStore from "@/store";
import { useCustomQuery } from "@/queries"
import { IReview, IMovie, ICast, IGenre } from '@/interfaces'
import { getMovieLanguage } from "@/utils";
import { getMovie } from '@/api'

import {
  LoadingSpinner,
  MovieRating,
  MovieStatus,
  MovieToolbar,
  Movie,
  Actor,
  Review
} from '@/components';

export const MovieDetails = () => {
  const { movieId } = useParams()
  const { sessionId } = useStore()

  const { data: movieDetails, isLoading } = useCustomQuery(getMovie, 'movieDetails', movieId, sessionId)

  return (
    <div>
      {isLoading ? <div className="flex items-center justify-center mt-12"><LoadingSpinner /></div> :
        <div>
          <div
            style={{
              boxShadow: 'inset 0 0 0 100vw rgba(0, 0, 0, 0.7)',
              backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movieDetails.data.backdrop_path})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }}
          >
            <div className="flex flex-col sm:flex-row items-center m-auto gap-9 py-8 w-full md:w-[90%] lg:w-[85%]">
              <img className="rounded-md" src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movieDetails.data.poster_path}`} />

              <div className="text-center sm:text-left">
                <div className="text-4xl text-white">{movieDetails.data.original_title}</div>
                <div className="antialiased italic text-white mt-2 mb-2">{movieDetails.data.tagline}</div>

                <MovieRating vote={movieDetails.data.vote_average} />

                <div className="flex flex-col gap-2.5 mt-2 items-center sm:items-start">
                  <div className="flex gap-2">
                    <span className="text-white font-bold">Genres:</span>
                    <div className="antialiased text-white">{movieDetails.data.genres.map((genre: IGenre) => genre.name).join(', ')}</div>
                  </div>

                  <div className="flex gap-2">
                    <div className="font-bold text-white">Release Date:</div>
                    <div className="antialiased text-white">{movieDetails.data.release_date}</div>
                  </div>

                  <div className="flex gap-2">
                    <div className="font-bold text-white">Status:</div>
                    <div className="antialiased text-white">{movieDetails.data.status}</div>
                  </div>

                  <div className="flex flex-col">
                    <div className="font-bold text-white">Overview:</div>
                    <div className="antialiased leading-7 w-full sm:w-[90%] text-white mt-1">{movieDetails.data.overview}</div>
                  </div>
                </div>

                <MovieToolbar movieDetails={movieDetails.data} />
              </div>

            </div>
          </div>

          <div className="text-2xl px-4 md:px-10 md:px-20 lg:px-20 mt-8 font-semibold">Top Cast</div>

          <div className="mt-2 flex justify-between gap-8 px-4 md:px-10 lg:px-20">
            <div className="flex flex-col w-full md:w-[70%] lg:w-[80%]">
              <div className="overflow-x-auto h-fit p-2">
                <div className="min-w-max flex gap-3">
                  {movieDetails.data.credits.cast.slice(0, 9).map((c: ICast) => (
                    <Actor actor={c} />
                  ))}
                </div>
              </div>

              <div className="mt-5 block md:hidden bg-gray-300 w-full h-[1px]"></div>

              <div className="flex md:hidden flex-col gap-2 mt-4 px-4">
                <div className="flex gap-2">
                  <span className="font-bold">Original Language: </span>
                  <span>{getMovieLanguage(movieDetails.data.original_language)}</span>
                </div>

                <div className="flex gap-2">
                  <span className="font-bold">Budget: </span>
                  <span>${movieDetails.data.budget.toLocaleString()}</span>
                </div>

                <div className="flex gap-2">
                  <span className="font-bold">Revenue: </span>
                  <span>${movieDetails.data.revenue.toLocaleString()}</span>
                </div>

                <span className="font-bold">Keywords: </span>
                <div className="flex gap-2 flex-wrap">
                  {movieDetails.data.keywords.keywords.map((k: IKeyword) => (
                    <span className="text-xs rounded-sm cursor-pointer bg-gray-200 p-2" key={k.key}>{k.name}</span>
                  ))}
                </div>
              </div>

              <div className="text-md font-semibold hover:text-gray-500 cursor-pointer mt-8">Full Cast & Crew</div>
              <div className="mt-5 bg-gray-300 w-full h-[1px]"></div>

              <div className="text-2xl mt-6 font-semibold mb-2">Reviews</div>

              {movieDetails.data.reviews.results.slice(0, 1).map((review: IReview) => (
                <Review review={review} />
              ))}

              <div className="text-md font-semibold hover:text-gray-500 cursor-pointer mt-8">Read All Reviews</div>
              <div className="mt-5 bg-gray-300 w-full h-[1px]"></div>

              <div className="text-2xl mt-5 font-semibold">Recommendations</div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7 mt-4">
                {movieDetails.data.recommendations.results.slice(0, 10).map((movie: IMovie) => (
                  <Link to={`/movie/${movie.id}`}>
                    <Movie key={movie.id} movie={movie} />
                  </Link>
                ))}
              </div>
            </div>

            <MovieStatus movieDetails={movieDetails} />

          </div>
        </div>
      }
    </div>
  )
}