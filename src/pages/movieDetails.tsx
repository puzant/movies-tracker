import { useParams } from "react-router-dom"

import { getMovie } from '@/api'
import { useCustomQuery } from "@/queries"
import { LoadingSpinner } from '@/components';

export const MovieDetails = () => {
  const { movieId } = useParams()

  const { data: movieDetails, isLoading } = useCustomQuery(getMovie, 'movieDetails', movieId)

  return (
    <div>
      {
        isLoading ? '...loading' :
          <div
            // style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movieDetails.data.backdrop_path})` }}
            className="bg-indigo-500"
          >
            <div className="flex gap-6 py-8">
              <img className="rounded-xl" src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movieDetails.data.poster_path}`} />

              <div>
                <div>{movieDetails.data.original_title}</div>
                <div>{movieDetails.data.release_date}</div>
                <div>{movieDetails.data.genres.map(genre => genre.name)}</div>
                <div>{movieDetails.data.runtime}</div>
                <div>{movieDetails.data.tagline}</div>
                <div>{movieDetails.data.overview}</div>
              </div>
            </div>
          </div>
      }
    </div>
  )
}