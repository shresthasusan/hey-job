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
import { useContext, useState } from "react";
import SaveButton from "../saveButton";
import Image from "next/image";
import { motion } from "framer-motion";

// Define the formatDate function
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const TalentDetailsSlider: React.FC = () => {
  const {
    talentData: freelancer,
    talentDetailsVisible,
    setTalentDetailsVisible,
  } = useContext(Appcontext);

  const [selectedProject, setSelectedProject] = useState<any>(null);

  const onClose = () => {
    setTalentDetailsVisible(false);
  };

  const handleImageClick = (project: any) => {
    setSelectedProject(project);
  };

  const closeProjectPopup = () => {
    setSelectedProject(null);
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
          <div className="mt-4 border-b pb-16">
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              Project Portfolio
            </h3>
            {freelancer?.projectPortfolio.map((project: any, index: number) => (
              <div key={index} className="mb-4">
                <div className="flex flex-row flex-wrap ">
                  {project.portfolioFiles
                    .slice(0, 1)
                    .map((file: string, index: number) => (
                      <span
                        key={index}
                        className="w-[200px] h-[200px] my-10 hover:shadow-xl border-neutral-200 border-2 hover:scale-105  rounded-lg transition-all duration-300"
                        onClick={() => handleImageClick(project)}
                      >
                        <Image
                          key={index}
                          src={file || "/placeholder.svg"}
                          alt={`Project image ${index + 1}`}
                          width={150}
                          height={150}
                          className="rounded-lg object-cover w-full h-full "
                        />
                        <p
                          className="font-medium mt-5 text-primary-600"
                          onClick={() => handleImageClick(project)}
                        >
                          {project.projectTitle}
                        </p>
                      </span>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Apply Button */}
        {/* <div className="mt-6">
            <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition">
              Apply for this Job
            </button>
          </div> */}
      </div>

      {/* Project Pop-up Card */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
          onClick={closeProjectPopup}
        >
          <button
            className=" top-0  text-3xl sticky text-gray-500 hover:text-gray-700"
            onClick={closeProjectPopup}
          >
            <span className="sr-only">Close</span>
            &times;
          </button>
          <motion.div
            className="bg-white pr-20 p-10 rounded-lg shadow-lg max-w-screen-xl w-[90%] relative overflow-scroll"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the card
            initial={{ opacity: 0, scale: 0.8, height: "50%" }}
            animate={{ opacity: 1, scale: 1, height: "85%" }}
            transition={{ duration: 0.3 }}
          >
            <button
              className=" top-2 left-full text-3xl sticky text-gray-500 hover:text-gray-700"
              onClick={closeProjectPopup}
            >
              <span className="sr-only">Close</span>
              &times;
            </button>
            <button
              className=" top-2 left-full text-3xl sticky text-gray-500 hover:text-gray-700"
              onClick={closeProjectPopup}
            >
              <span className="sr-only">Close</span>
              &times;
            </button>
            <button
              className=" top-2 left-full text-3xl sticky text-gray-500 hover:text-gray-700"
              onClick={closeProjectPopup}
            >
              <span className="sr-only">Close</span>
              &times;
            </button>
            <button
              className=" top-2 left-full text-3xl sticky text-gray-500 hover:text-gray-700"
              onClick={closeProjectPopup}
            >
              <span className="sr-only">Close</span>
              &times;
            </button>
            <button
              className=" top-2 left-full text-3xl sticky text-gray-500 hover:text-gray-700"
              onClick={closeProjectPopup}
            >
              <span className="sr-only">Close</span>
              &times;
            </button>
            <div className="flex flex-row gap-4 relative space-between">
              <div className="sticky top-0 w-1/2 h-full overflow-y-auto">
                <h3 className="text-4xl font-semibold mb-4">
                  {selectedProject.projectTitle}
                </h3>
                <p className="text-gray-600 mb-4 mt-10">project Description</p>
                <p className="text-gray-800 mb-4">
                  {selectedProject.projectDescription}
                </p>
                <p className="text-gray-600 mb-5 mt-10">Technologies Used</p>
                <div className="flex flex-wrap gap-4 mb-4">
                  {selectedProject.technologies.map(
                    (tech: string, index: number) => (
                      <span
                        key={index}
                        className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-10 justify-center w-1/2 m-auto align-center items-center mt-2 overflow-y-auto">
                {selectedProject.portfolioFiles.map(
                  (file: string, index: number) => (
                    <Image
                      key={index}
                      src={file || "/placeholder.svg"}
                      alt={`Project image ${index + 1}`}
                      width={800}
                      height={800}
                      className="rounded-lg object-cover w-full"
                    />
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TalentDetailsSlider;
