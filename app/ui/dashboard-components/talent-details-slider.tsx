"use client";

import { Appcontext } from "@/app/context/appContext";
import {
  ArrowLeftIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  UserIcon,
  TagIcon,
  DocumentTextIcon,
  BriefcaseIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react";

// Define the formatDate function
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
import SaveButton from "../saveButton";
import Image from "next/image";

const TalentDetailsSlider: React.FC = () => {
  const {
    talentData: freelancer,
    talentDetailsVisible,
    setTalentDetailsVisible,
  } = useContext(Appcontext);

  const onClose = () => {
    setTalentDetailsVisible(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-100 ${
        talentDetailsVisible ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {/* Dark overlay */}
      <div
        className={`absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-1000 ${
          talentDetailsVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      ></div>

      {/* Slide-in panel */}
      <div
        className={`relative bg-white w-full max-w-4xl h-full p-6 shadow-xl transform transition-transform duration-1000 overflow-y-auto ${
          talentDetailsVisible ? "translate-x-0" : "translate-x-full"
        } rounded-l-lg`}
      >
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            className="text-gray-500 hover:text-gray-700 flex items-center"
            onClick={onClose}
          >
            <ArrowLeftIcon className="w-6 h-6 mr-1" /> <span>Back</span>
          </button>
          <SaveButton
            itemId={freelancer?.freelancerId}
            saved={freelancer?.saved}
            itemType={"freelancer"}
          />
        </div>

        {/* Profile Section */}
        <div className="flex flex-row items-center space-y-10 border-b p-5 gap-10">
          <span className="flex items-center justify-center w-40 h-40 rounded-full overflow-hidden">
            <Image
              src={freelancer?.profilePicture}
              width={200}
              height={200}
              alt={"dp"}
            />
          </span>
          <span className="flex flex-col gap-4">
            <h2 className="text-5xl font-medium mb-2">
              {freelancer?.fullName}
            </h2>
            <div className="text-md flex pb-4 gap-5">
              <div className="flex items-center">
                <MapPinIcon className="w-4 h-4 mr-2 text-gray-600" />
                <p className="text-gray-600">{freelancer?.location}</p>
              </div>
              <div className="flex items-center">
                <CurrencyDollarIcon className="w-5 h-5 mr-2 text-gray-600" />
                <p className="text-gray-600"> {freelancer?.rate} $/hr</p>
              </div>
            </div>
          </span>
        </div>

        {/* Bio Section */}
        <div className="mt-4 border-b pb-4">
          <h3 className="text-2xl font-semibold my-3">About Me</h3>
          <p className="text-gray-800 text-md  ">{freelancer?.bio}</p>
        </div>

        {/* Skills */}
        <div className="mt-4 border-b pb-4">
          <h3 className="text-2xl font-semibold my-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {freelancer?.skills.map((skill: string, index: number) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full flex items-center"
              >
                <TagIcon className="w-4 h-4 mr-1" />
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Work Experience */}
        {freelancer?.workExperience?.length > 0 && (
          <div className="mt-4 border-b pb-4">
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              Employment History
            </h3>
            {freelancer?.workExperience.map((job: any) => (
              <div key={job._id} className="mb-4 flex  flex-col">
                <h3 className="text-xl font-medium mt-2">{job.jobTitle}</h3>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-md  text-gray-500">
                  {formatDate(job.startDate)} - {formatDate(job.endDate)}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {freelancer?.education?.length > 0 && (
          <div className="mt-4 border-b pb-4">
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              Education
            </h3>
            {freelancer?.education.map((edu: any) => (
              <div key={edu._id} className="mb-4">
                <span className="flex justify-between items-center">
                  <h3 className="text-xl font-medium">{edu.degree}</h3>
                  <p className="text-md  text-gray-500">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                </span>
                <p className="text-gray-600">{edu.institution}</p>
              </div>
            ))}
          </div>
        )}
        {/* Project Portfolio */}
        {freelancer?.projectPortfolio?.length > 0 && (
          <div className="mt-4 border-b pb-4">
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              Project Portfolio
            </h3>
            {freelancer?.projectPortfolio.map((project: any, index: number) => (
              <div key={index} className="mb-4">
                <p className="text-xl font-medium">{project.projectTitle}</p>
                <p className="text-gray-600">{project.projectDescription}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.technologies.map((tech: string, index: number) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-row flex-wrap mt-2">
                  {project.portfolioFiles.map((file: string, index: number) => (
                    <span key={index} className="w-20 h-20 rounded-sm ">
                      <Image
                        key={index}
                        src={file || "/placeholder.svg"}
                        alt={`Project image ${index + 1}`}
                        width={50}
                        height={50}
                        className="rounded-lg object-cover w-full h-32"
                      />
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Apply Button */}
        <div className="mt-6">
          <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition">
            Apply for this Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalentDetailsSlider;
