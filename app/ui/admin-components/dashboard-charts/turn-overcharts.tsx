"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { AreaChart } from "../../tremorChart-components/area-chart";
import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";

interface ChartData {
  _id: string;
  turnOver: number;
}

interface ChartProps {
  timeframe: string;
}

const TurnOverChart = ({ timeframe }: ChartProps) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchChartData() {
      setLoading(true);
      const res = await fetchWithAuth(
        `/api/admin/transcations-chart?timeframe=${timeframe}`
      );
      const data: ChartData[] = await res.json();
      setChartData(data);
      setLoading(false);
    }

    fetchChartData();
  }, [timeframe]);

  return (
    <>
      {/* Loading Animation */}
      {loading ? (
        <motion.div
          className="h-60 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-8 h-8 border-4 border-primary-500 border-dashed rounded-full animate-spin"></div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Area Chart */}
          <AreaChart
            data={chartData}
            categories={["turnOver"]}
            index="_id"
            colors={["blue"]}
            yAxisWidth={50}
            title="Turn Over Metrics"
            xAxisLabel="Time"
            yAxisLabel="Amount"
          />
          <p className="text-center flex gap-4 mt-6 text-sm">
            <span className="text-blue-500">
              Total Turnover: ${chartData[0]?.turnOver}
            </span>
          </p>
        </motion.div>
      )}
    </>
  );
};

export default TurnOverChart;
