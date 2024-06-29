import { jobsData, saved, recent } from "@/app/lib/data";

import { HeartIcon as Unliked, MapPinIcon } from "@heroicons/react/24/outline";
import { HeartIcon as Liked } from "@heroicons/react/24/solid";
const truncateString = (str: string, num: number) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "... ";
};

interface Props {
  bestMatches?: boolean;
  mostRecent?: boolean;
  savedJobs?: boolean;
}

const JobList = ({ bestMatches, mostRecent, savedJobs }: Props) => {
  if (bestMatches) {
    const data = jobsData;
  } else if (mostRecent) {
    const data = recent;
  } else {
    const data = saved;
  }

  return (
    <div className="flex boader flex-col mt-5  ">
      {jobsData.map((job, index) => (
        <div
          key={index}
          className="flex flex-col gap-1  p-5 border-t-2 border-gray-200 "
        >
          <p className="text-xs text-gray-400"> Posted {job.time}</p>
          <div className="flex items-center justify-between ">
            <h1 className="text-2xl text-gray-500 font-medium  ">
              {job.title}
            </h1>
            {job.saved ? (
              <Liked className="w-6 h-6 text-red-600 " />
            ) : (
              <Unliked className="w-6 h-6  " />
            )}
          </div>
          <p className="text-xs mt-2 text-gray-400">
            {job.type} - {job.experience} - Est. Budget: {job.budget}
          </p>
          <p className="text-black my-5 ">
            {truncateString(job.description, 400)}
            {job.description.length > 400 ? (
              <button className="text-primary-700 hover:text-primary-500">
                Read More
              </button>
            ) : null}
          </p>

          <div className="flex justify-start gap-5 items-center">
            {job.tags.map((tag, index) => (
              <div
                key={index}
                className="bg-slate-200 p-3 flex justify-center items-center  rounded-2xl"
              >
                {tag}
              </div>
            ))}
          </div>
          <p className="text-sm mt-5 flex font-semibold  text-gray-500">
            <MapPinIcon className="w-5 h-5 " /> {job.location}
          </p>
        </div>
      ))}
    </div>
  );
};

export default JobList;
