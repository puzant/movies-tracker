import { ICast } from "@/interfaces";

export const Actor = ({ actor }: { actor: ICast }) => {
  return (
    <div className="border shadow-md flex-1 rounded-xl">
      <img
        className="w-full h-[200px] rounded-t-md object-cover"
        src={`${
          actor.profile_path !== null
            ? `https://image.tmdb.org/t/p/w185/${actor.profile_path}`
            : "https://d3uscstcbhvk7k.cloudfront.net/static/images/slider-placeholder-2x.png"
        }`}
      />
      <div className="p-4">
        <span className="block font-bold">{actor.name}</span>
        <span className="w-[130px] block break-words">{actor.character}</span>
      </div>
    </div>
  );
};
