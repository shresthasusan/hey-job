import React from 'react';

interface Freelancer {
    userId: string;
    proposal: string;
}

const freelancers: Freelancer[] = [
    { userId: 'user1', proposal: 'I am very interested in this job because...' },
    { userId: 'user2', proposal: 'I have the skills required for this job...' },
    // Add more freelancers as needed
];

const JobProposalPage: React.FC = () => {
    return (
        <div className="p-5 font-sans">
            <h1 className="text-center text-2xl font-bold text-gray-800">Job Proposals</h1>
            <div className="flex flex-col items-center mt-5">
                {freelancers.map((freelancer, index) => (
                    <div key={index} className="bg-white border border-gray-300 rounded-lg p-4 m-2 w-4/5 shadow-md">
                        <h2 className="text-lg font-semibold text-gray-700">{freelancer.userId}</h2>
                        <p className="text-gray-600">{freelancer.proposal}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobProposalPage;