"use client";

import { Appcontext } from "@/app/context/appContext";
import {
  ArrowLeftIcon,
  MapPinIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserIcon,
  TagIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react";
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
            <div className="text-md flex pb-4 gap-5 ">
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

        {/* Job Description */}
        <div className="mt-4 border-b pb-4">
          <h3 className="text-lg  mb-2">Bio</h3>
          <p className="text-gray-800">{freelancer?.bio}</p>
        </div>

        {/* Skills & Tags */}
        <div className="mt-4 border-b pb-4">
          <h3 className="text-lg  mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {freelancer?.skills.map((tag: string, index: number) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full flex items-center"
              >
                <TagIcon className="w-4 h-4 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* File Attachments */}
        {freelancer?.fileUrls && (
          <div className="mt-4 border-b pb-4">
            <h3 className="text-lg  mb-2">Attachments</h3>
            <div className="flex items-center space-x-2">
              <DocumentTextIcon className="w-5 h-5 text-gray-600" />
              {freelancer.fileUrls.map((url: string, index: number) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Attachment {index + 1}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Apply Button */}
        <div className="mt-6">
          <button className="w-full bg-primary-600 text-white py-3 rounded-lg  hover:bg-primary-700 transition">
            Apply for this Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalentDetailsSlider;
