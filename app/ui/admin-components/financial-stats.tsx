'use client"'


import type React from "react"
import { CurrencyDollarIcon, TrophyIcon, ChartBarIcon } from "@heroicons/react/24/outline"
import { use } from "react"

interface FinanceStats {
  topSpender: {
    _id: string
    totalSpent: number
  }[]
  topEarner: {
    _id: string
    totalEarned: number
  }[]
}

interface FinancialHighlightsProps {
  financeStats: FinanceStats | null
  isLoading: boolean
}

const FinancialHighlights: React.FC<FinancialHighlightsProps> = ({ financeStats, isLoading }) => {
  const formatCurrency = (amount: number) => {
    return `Rs ${amount.toLocaleString("en-IN")}`
  }

  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <ChartBarIcon className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Financial Highlights</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Top Spender Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Top Spender</h3>
              <div className="p-2 bg-green-100 rounded-full">
                <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
            {isLoading ? (
              <div className="animate-pulse h-10 bg-gray-200 rounded"></div>
            ) : financeStats?.topSpender[0] ? (
              <>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(financeStats.topSpender[0].totalSpent)}
                </p>
              </>
            ) : (
              <p className="text-gray-500">No data available</p>
            )}
          </div>
          {!isLoading && financeStats?.topSpender[0] && (
            <div className="bg-gray-50 px-6 py-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">User ID:</span>
                <span className="text-xs font-medium text-gray-700 truncate max-w-[180px]">
                  {financeStats.topSpender[0]._id}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Top Earner Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Top Earner</h3>
              <div className="p-2 bg-yellow-100 rounded-full">
                <TrophyIcon className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            {isLoading ? (
              <div className="animate-pulse h-10 bg-gray-200 rounded"></div>
            ) : financeStats?.topEarner[0] ? (
              <>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(financeStats.topEarner[0].totalEarned)}
                </p>
              </>
            ) : (
              <p className="text-gray-500">No data available</p>
            )}
          </div>
          {!isLoading && financeStats?.topEarner[0] && (
            <div className="bg-gray-50 px-6 py-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">User ID:</span>
                <span className="text-xs font-medium text-gray-700 truncate max-w-[180px]">
                  {financeStats.topEarner[0]._id}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Average Transaction Card - Placeholder */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Avg. Transaction</h3>
              <div className="p-2 bg-blue-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">Rs 5,280</p>
          </div>
          <div className="bg-gray-50 px-6 py-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">This month</span>
              <span className="text-xs font-medium text-green-600">↑ 12.5%</span>
            </div>
          </div>
        </div>

        {/* Total Revenue Card - Placeholder */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
              <div className="p-2 bg-purple-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">Rs 3,25,750</p>
          </div>
          <div className="bg-gray-50 px-6 py-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">This month</span>
              <span className="text-xs font-medium text-green-600">↑ 8.2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinancialHighlights

