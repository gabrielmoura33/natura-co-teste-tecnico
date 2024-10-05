import React from 'react'
import { Star } from 'lucide-react'

interface RatingProps {
  rating: number
  starColor?: string
  emptyStarColor?: string
}

const Rating: React.FC<RatingProps> = ({
  rating,
  starColor = 'text-yellow-500',
  emptyStarColor = 'text-gray-300',
}) => {
  const MAX_RATING = 5

  return (
    <div className="flex items-center space-x-1">
      {[...Array(MAX_RATING)].map((_, index) => {
        const fullStar = index + 1 <= rating // Estrela cheia
        const halfStar = index < rating && index + 1 > rating // Estrela parcial

        return (
          <div key={index} className="relative">
            <Star className={`w-6 h-6 ${emptyStarColor}`} fill="none" />
            {fullStar && (
              <Star
                className={`w-6 h-6 absolute inset-0 ${starColor}`}
                fill="currentColor"
              />
            )}
            {halfStar && (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${(rating - index) * 100}%` }}
              >
                <Star className={`w-6 h-6 ${starColor}`} fill="currentColor" />
              </div>
            )}
          </div>
        )
      })}
      <span className="ml-2 text-gray-700">
        {rating.toFixed(1)}/{MAX_RATING}
      </span>
    </div>
  )
}

export default Rating
