"use client";
import { useEffect, useState } from "react";
import StarRating from "./starRating";
import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface Review {
  reviewerId: {
    name: string;
    profilePicture?: string;
  };
  comment: string;
  rating: number;
}

const ReviewsCard = () => {
  const [recentReviews, setRecentReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetchWithAuth("/api/reviews?recentReview=true");
      const { recentReviews } = await response.json();
      setRecentReviews(recentReviews);
    };
    fetchReviews();
  }, []);

  const truncateString = (str: string, num: number) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "... ";
  };

  const handleNext = () => {
    if (recentReviews.length <= 2) return;
    setCurrentIndex((prevIndex) =>
      prevIndex + 2 >= recentReviews.length ? 0 : prevIndex + 2
    );
  };

  const handlePrev = () => {
    if (recentReviews.length <= 2) return;
    setCurrentIndex((prevIndex) =>
      prevIndex - 2 < 0 ? Math.max(0, recentReviews.length - 2) : prevIndex - 2
    );
  };

  const visibleReviews = recentReviews.slice(currentIndex, currentIndex + 2);

  return (
    <div className="flex flex-col max-w-[600px] w-[40%] min-w-[250px] gap-2 relative rounded-3xl h-[250px] px-5 py-2 overflow-hidden shadow-[0_10px_20px_rgba(228,228,228,_0.7)]">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium">Reviews</h1>
        {recentReviews.length > 2 && (
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Previous reviews"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Next reviews"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-3"
        >
          {visibleReviews.length > 0 ? (
            visibleReviews.map((review: Review, index: number) => (
              <motion.div
                key={currentIndex + index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="w-full flex gap-2 flex-row"
              >
                <div className="flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-yellow-400 rounded-full h-10 w-10 flex items-center justify-center overflow-hidden"
                  >
                    <Image
                      width={40}
                      height={40}
                      src={
                        review.reviewerId.profilePicture || "/images/image.png"
                      }
                      alt="profile"
                    />
                  </motion.div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-gray-600 text-[1.1rem]">
                    {review.reviewerId.name}
                  </p>
                  <div className="flex justify-start items-center text-[.7rem] gap-1 divider-x">
                    <StarRating rating={review.rating} /> <div>1 week ago</div>
                  </div>
                  <p className="text-gray-600 text-[.7rem]">
                    {truncateString(
                      review.comment || "No comment provided.",
                      100
                    )}
                    {review.comment && review.comment.length > 100 ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="text-primary-600"
                      >
                        Read More
                      </motion.button>
                    ) : null}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-600 text-[.9rem]">No reviews available.</p>
          )}
        </motion.div>
      </AnimatePresence>

      {recentReviews.length > 0 && (
        <div className="flex justify-center gap-1 mt-auto mb-2">
          {Array.from({ length: Math.ceil(recentReviews.length / 2) }).map(
            (_, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0.8 }}
                animate={{
                  scale: Math.floor(currentIndex / 2) === i ? 1 : 0.8,
                  width: Math.floor(currentIndex / 2) === i ? "16px" : "6px",
                  backgroundColor:
                    Math.floor(currentIndex / 2) === i ? "#FBBF24" : "#D1D5DB",
                }}
                transition={{ duration: 0.3 }}
                className="block h-1.5 rounded-full"
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewsCard;
