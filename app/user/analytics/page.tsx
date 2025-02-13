"use client";

import { UsersIcon, ClockIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";

const AnalyticsPage: React.FC = () => {
    return (
        <div className="p-8 min-h-screen bg-gray-100">
            <h1 className="text-3xl  text-gray-800 text-center mb-6">My Analytics</h1>
            
            <div className="flex flex-wrap justify-center gap-8">
                {/* Users Analytics */}
                <div className="w-80 p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
                    <UsersIcon className="w-12 h-12 text-blue-500" />
                    <h2 className="text-xl font-semibold mt-3"> My Users</h2>
                    <p className="text-gray-600 mt-2">Total Users: <span className="font-bold text-gray-800">1,200</span></p>
                </div>

                {/* Sessions Analytics */}
                <div className="w-80 p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
                    <ClockIcon className="w-12 h-12 text-green-500" />
                    <h2 className="text-xl font-semibold mt-3">My Sessions</h2>
                    <p className="text-gray-600 mt-2">Total Sessions: <span className="font-bold text-gray-800">3,000</span></p>
                </div>

                {/* Revenue Analytics */}
                <div className="w-80 p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
                    <CurrencyDollarIcon className="w-12 h-12 text-yellow-500" />
                    <h2 className="text-xl font-semibold mt-3">Revenue</h2>
                    <p className="text-gray-600 mt-2">Total Revenue: <span className="font-bold text-gray-800">$5,000</span></p>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
