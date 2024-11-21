import { StarIcon } from "lucide-react";

function StarRatingComponent({ rating, handleRatingChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          className={`cursor-pointer transition-transform ${
            star <= rating
              ? "text-yellow-500 scale-110"
              : "text-gray-400 hover:text-yellow-500"
          }`}
          onClick={handleRatingChange ? () => handleRatingChange(star) : null}
        >
          <StarIcon
            className={`w-4 h-4 transition-colors ${
              star <= rating ? "fill-yellow-500" : "fill-gray-300"
            } hover:fill-yellow-500`}
          />
        </div>
      ))}
    </div>
  );
}

export default StarRatingComponent;
