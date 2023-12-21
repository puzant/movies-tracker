import React from "react";
import { IReview } from "@/interfaces";

export const Review = ({ review }: { review: IReview }) => {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

  return (
    <div className="shadow-md border rounded-md p-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center text-white text-xl rounded-full bg-indigo-500 w-[32px] h-[32px]">
          {review.author.slice(0, 1)}
        </div>
        <span className="font-bold text-xl">A review by {review.author}</span>
      </div>

      <div className="mt-2">
        {isExpanded ? (
          <span>{review.content}</span>
        ) : (
          <span>{review.content.substring(0, 550)}</span>
        )}
        <span
          className="underline cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? " Read Less" : "...Read More"}
        </span>
      </div>
    </div>
  );
};
