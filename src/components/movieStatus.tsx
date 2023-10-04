import { getMovieLanguage } from "@/utils";

export const MovieStatus = ({ movieDetails }) => {
  return (
    <div className="flex flex-col gap-2 w-[20%]">
      <div className="flex flex-col">
        <span className="font-bold">Status: </span>
        <span>{movieDetails.data.status}</span>
      </div>

      <div className="flex flex-col">
        <span className="font-bold">Original Language: </span>
        <span>{getMovieLanguage(movieDetails.data.original_language)}</span>
      </div>

      <div className="flex flex-col">
        <span className="font-bold">Budget: </span>
        <span>${movieDetails.data.budget.toLocaleString()}</span>
      </div>

      <div className="flex flex-col">
        <span className="font-bold">Revenue: </span>
        <span>${movieDetails.data.revenue.toLocaleString()}</span>
      </div>

      <span className="font-bold">Keywords: </span>
      <div className="flex gap-2 flex-wrap">
        {movieDetails.data.keywords.keywords.map(k => (
          <span className="text-xs rounded-sm cursor-pointer bg-gray-200 p-2" key={k.key}>{k.name}</span>
        ))}
      </div>
    </div>
  )
}