import { UsersIcon, ClockIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";
import {AreaChart} from "../../ui/tremorChart-components/area-chart";
import {BarChart} from "../../ui/tremorChart-components/bar-chart";
import {BarList} from "../../ui/tremorChart-components/barList-chart";
import { userAgent } from "next/server";

const AnalyticsPage: React.FC = () => {
    return (
        <div className="p-8 min-h-screen bg-gray-100">
            <h1 className="text-3xl font-semibold text-black-800  text-center mb-6">My Analytics</h1>

           

            {/* Charts Section */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Area Chart */}
                <div className="bg-white p-6 shadow-lg rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">User Growth Over Time</h2>
                    <AreaChart data={[]} index={""} categories={[]} />
                </div>

                {/* Bar Chart */}
                <div className="bg-white p-6 shadow-lg rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Sessions per Month</h2>
                    <BarChart data={[]} index={""} categories={[]} />
                </div>

                {/* Bar List Chart */}
                <div className="col-span-1 lg:col-span-2 bg-white p-6 shadow-lg rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Top Revenue Sources</h2>
                    <BarList data={[]} />
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
