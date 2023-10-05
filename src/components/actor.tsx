export const Actor = ({ actor }) => {
  return (
    <div className="border shadow-md flex-1 rounded-xl">
      <img className="w-full h-[200px] rounded-t-md object-cover" src={`https://image.tmdb.org/t/p/w185/${actor.profile_path}`} />
      <div className="p-4">
        <span className="block font-bold">{actor.name}</span>
        <span className="w-[130px] block break-words">{actor.character}</span>
      </div>
    </div>
  )
}