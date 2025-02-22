'use client';
import React, { useEffect, useState } from 'react';

interface Job {
    id: string;
    title: string;
    description: string;
    fullName: string;
    location: string;
    createdAt: string;
    budget: number;
    tags: string[];
}

interface AllJobsPageProps {
    userId: string;
}

const AllJobsPage: React.FC<AllJobsPageProps> = ({ userId }) => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (userId) {
            // Fetch jobs posted by the user
            const fetchJobs = async () => {
                try {
                    const response = await fetch(`/api/fetchJobs?userId=${userId}`);
                    const data = await response.json();
                    console.log('Fetched jobs:', data.jobs); // Log the fetched jobs
                    setJobs(data.jobs);
                } catch (error) {
                    console.error('Error fetching jobs:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchJobs();
        }
    }, [userId]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            {jobs.length === 0 ? (
                <div className="text-center">
                    <p className="text-xl">You haven&apos;t posted any job yet.</p>
                </div>
            ) : (
                <div className="space-y-8">
                    <p className="text-xl mb-4">Here are all the jobs you have posted:</p>
                    <ul className="space-y-4">
                        {jobs.map((job) => (
                            <li
                            key={`${job.id}-${job.title}`}
                                className="border p-6 rounded-full hover:bg-gray-100 shadow hover:shadow-lg transition-shadow duration-300 relative cursor-pointer"
                            >
                                <h2 className="text-3xl font-semibold mb-2">{job.title}</h2>
                                <p className="text-gray-700">{job.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AllJobsPage;