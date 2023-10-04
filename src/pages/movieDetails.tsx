import { useParams, Link } from "react-router-dom"

import { getMovie } from '@/api'
import { useCustomQuery } from "@/queries"
import { IReview, IMovie } from '@/interfaces'
import { LoadingSpinner, MovieRating, MovieStatus, MovieToolbar, Movie } from '@/components';

export const MovieDetails = () => {
  const { movieId } = useParams()

  const { data: movieDetails, isLoading } = useCustomQuery(getMovie, 'movieDetails', movieId)

  return (
    <div>
      {
        isLoading ? <div className="flex items-center justify-center mt-12"><LoadingSpinner /></div> :
          <div>
            <div
              style={{
                boxShadow: 'inset 0 0 0 100vw rgba(0, 0, 0, 0.7)',
                backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movieDetails.data.backdrop_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center'
              }}
            >
              <div className="flex flex-col sm:flex-row items-center m-auto gap-9 py-8 w-[85%]">
                <img className="rounded-md" src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movieDetails.data.poster_path}`} />

                <div className="text-center sm:text-left">
                  <div className="text-4xl text-white">{movieDetails.data.original_title}</div>
                  <div className="antialiased italic text-white mt-2 mb-2">{movieDetails.data.tagline}</div>

                  <MovieRating vote={movieDetails.data.vote_average} />

                  <div className="flex flex-col gap-2.5 mt-2 items-center sm:items-start">
                    <div className="flex gap-2">
                      <span className="text-white font-bold">Genres:</span>
                      <div className="antialiased text-white">{movieDetails.data.genres.map(genre => genre.name).join(', ')}</div>
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

                  <MovieToolbar />
                </div>

              </div>
            </div>

            <div className="text-2xl px-20 mt-8 font-semibold">Top Cast</div>

            <div className="mt-2 flex justify-between gap-12 px-20">
              <div className="flex flex-col w-[80%]">
                <div className="overflow-x-auto h-fit p-2">
                  <div className="min-w-max flex gap-3">
                    {movieDetails.data.credits.cast.slice(0, 9).map(c => (
                      <div className="border shadow-md flex-1 rounded-xl">
                        <img className="w-full h-[200px] rounded-t-md object-cover" src={`https://image.tmdb.org/t/p/w185/${c.profile_path}`} />
                        <div className="p-4">
                          <span className="block font-bold">{c.name}</span>
                          <span className="w-[130px] block break-words">{c.character}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-md font-semibold hover:text-gray-500 cursor-pointer mt-8">Full Cast & Crew</div>
                <div className="mt-5 bg-gray-300 w-full h-[1px]"></div>

                <div className="text-2xl mt-6 font-semibold mb-2">Reviews</div>

                {movieDetails.data.reviews.results.slice(0, 1).map((review: IReview) => (
                  <div className="shadow-md border rounded-md p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center text-white text-xl rounded-full bg-indigo-500 w-[32px] h-[32px]">{review.author.slice(0, 1)}</div>
                      <span className="font-bold text-xl">A review by {review.author}</span>
                    </div>

                    <div className="mt-2">{review.content.substring(0, 550)}</div>
                  </div>
                ))}

                <div className="text-md font-semibold hover:text-gray-500 cursor-pointer mt-8">Read All Reviews</div>
                <div className="mt-5 bg-gray-300 w-full h-[1px]"></div>

                <div className="text-2xl mt-5 font-semibold">Recommendations</div>

                <div className="grid grid-cols-5 gap-7 mt-4">
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