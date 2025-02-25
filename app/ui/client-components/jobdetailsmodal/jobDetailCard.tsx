'use client';
import React from 'react';
import { ClockIcon, CurrencyDollarIcon, MapPinIcon, TagIcon, UserIcon } from '@heroicons/react/24/outline';
import { getTimeAgo } from '../../dashboard-components/job-list/jobList';
import Link from 'next/link';

interface Job {
    _id: string;
    fullName: string;
    location: string;
    createdAt: string;
    budget: number;
    tags: string[];
    title: string;
    description: string;
    proposalCount: number;
    // Add other job properties as needed
}

interface JobDetailsModalProps {
    job: Job | null;
    onClose: () => void;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ job, onClose }) => {
    if (!job) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white border rounded-2xl p-10 shadow-lg w-full max-w-5xl max-h-5xl overflow-y-auto">
                <h2 className="text-4xl font-bold mb-2">{job.title}</h2>

                <div className="space-y-2 border-b text-sm flex pb-4 gap-5 justify-between">
                    <div className="flex items-center">
                        <UserIcon className="w-5 h-5 mr-2 text-gray-600" />
                        <p className="text-gray-600">{job.fullName}</p>
                    </div>
                    <div className="flex items-center">
                        <MapPinIcon className="w-5 h-5 mr-2 text-gray-600" />
                        <p className="text-gray-600">{job.location}</p>
                    </div>
                    <div className="flex items-center">
                        <ClockIcon className="w-5 h-5 mr-2 text-gray-600" />
                        <p className="text-gray-600">
                            {getTimeAgo(job.createdAt)}
                        </p>
                    </div>
                    <div className="flex items-center">
                        <CurrencyDollarIcon className="w-5 h-5 mr-2 text-gray-600" />
                        <p className="text-gray-600">Est. Budget: ${job.budget}</p>
                    </div>
                </div>

                <div className="mt-4 border-b pb-4">
                    <h3 className="text-xl p-4 font-semibold mb-2">Job Description</h3>
                    <p className="text-gray-800">{job.description}</p>
                </div>

                <div className="mt-4 border-b pb-4">
                    <h3 className="text-xl p-4 font-semibold mb-2">Required Skills</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                        {job.tags.map((tag, index) => (
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

                <div className="mt-4 border-b pb-4">
                    <h3 className="text-xl text-green-600 p-4">
                        {job.proposalCount} Proposals <Link className='underline' href={`/client/job-proposal/${job._id}`}>View all the proposals</Link>
                    </h3>
                </div>

                <div className="mt-4 justify-between flex gap-4">
                    <button
                        className="px-4 py-2 bg-gray-400 text-white rounded-full hover:bg-gray-600"
                        onClick={onClose}
                    >
                        Edit
                    </button>
                    <button
                        className="px-4 py-2 bg-red-400 text-white rounded-full hover:bg-red-600"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobDetailsModal;