import React from "react";
import StarRating from "./starRating";

const ReviewsCard = () => {
  const reviews = [
    {
      name: "Harry Doe",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, metus a ultricies vehicula, felis justo aliquam nunc, et varius nisl turpis et metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, metus a ultricies vehicula, felis justo aliquam nunc, et varius nisl turpis et metus. ",
      rating: 4,
    },
    {
      name: "Jane Doe",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, metus a ultricies vehicula, felis justo aliquam nunc, et varius nisl turpis et metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, metus a ultricies vehicula, felis justo aliquam nunc, et varius nisl turpis et metus. ",
      rating: 3,
    },
  ];

  const truncateString = (str: string, num: number) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "... ";
  };

  return (
    <div className="flex flex-col max-w-[600px] w-[40%] min-w-[250px] gap-2   relative rounded-3xl h-[250px] px-5 py-2 overflow-hidden shadow-[0_10px_20px_rgba(228,228,228,_0.7)]">
      <h1 className="text-2xl font-medium"> Reviews</h1>
      {reviews.map((review, index) => (
        <div key={index} className="w-full flex gap-2  flex-row ">
          <div>
            <div
              className="bg-yellow-400 rounded-full
              
               h-10 w-10"
            />
          </div>
          <div className="flex flex-col gap-1  ">
            <p className="text-gray-600  text-[1.1rem]"> {review.name}</p>
            <div className="flex justify-start items-center text-[.7rem] gap-1 divider-x">
              <StarRating rating={review.rating} /> <div>1 week ago</div>{" "}
            </div>
            <p className="text-gray-600  text-[.7rem] ">
              {truncateString(review.review, 100)}
              {review.review.length > 100 ? (
                <button className="text-primary-600">Read More</button>
              ) : null}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsCard;
