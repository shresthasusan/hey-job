'use client';

import React, { useEffect, useState } from "react";
import StarRating from "./starRating";
import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";

interface Review {
  _id: string;
  contractId: string;
  reviewerId: {
    _id: string;
    name: string;
  };
  revieweeId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

const ReviewsCard = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetchWithAuth("/api/reviews?recentReview=true");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        // Extract the correct array of reviews
        if (data && Array.isArray(data.recentReviews)) {
          setReviews(data.recentReviews);
        } else {
          console.error("Unexpected response format:", data);
          setError("Unexpected data format received.");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Unable to load reviews. Please try again later.");
      }
    };

    fetchReviews();
  }, []);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col text-center max-w-[600px] w-[40%] min-w-[250px] gap-2 relative rounded-3xl h-auto px-5 py-4 overflow-hidden shadow-lg bg-white">
      <h1 className="text-2xl font-medium"> Reviews</h1>

      {error && <p className="text-red-500">{error}</p>}

      {reviews.length === 0 ? (
        <p className="text-primary-500">No reviews yet. Complete jobs to get reviews.</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="w-full p-3 border-b border-gray-200 flex items-start gap-3">
            {/* Placeholder Avatar */}
            <div className="bg-yellow-400 rounded-full h-10 w-10 flex items-center justify-center text-white font-bold">
              {review.reviewerId.name.charAt(0).toUpperCase()}
            </div>

            <div className="flex flex-col w-full">
              {/* Reviewer Name */}
              <p className="text-gray-700 text-[1.1rem] font-semibold">{review.reviewerId.name}</p>

              {/* Star Rating */}
              <div className="flex items-center text-[0.9rem] gap-1">
                <StarRating rating={review.rating} />
              </div>

              {/* Review Comment */}
              {review.comment ? (
                <p className="text-gray-600 text-[0.9rem]">
                  {expanded[review._id] ? review.comment : `${review.comment.slice(0, 100)}... `}
                  {review.comment.length > 100 && (
                    <span
                      className="text-blue-500 cursor-pointer ml-2"
                      onClick={() => toggleExpand(review._id)}
                    >
                      {expanded[review._id] ? " Show Less" : " Read More"}
                    </span>
                  )}
                </p>
              ) : (
                <p className="text-gray-400 text-[0.9rem] italic">No comment provided</p>
              )}

              {/* Timestamp using native Date formatting */}
              <p className="text-gray-500 text-[0.8rem]">
                {new Date(review.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewsCard;
