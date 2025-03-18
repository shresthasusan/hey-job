"use client"

import { useEffect, useState } from "react"
import Sidebar from "../ui/admin-components/sidebar"
import "../ui/globals.css"
import Charts from "../ui/admin-components/dashboard-charts/dashboard-charts"
import FinancialHighlights from "../ui/admin-components/financial-stats"
import { fetchWithAuth } from "../lib/fetchWIthAuth"

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

const Page = () => {
  const [financeStats, setFinanceStats] = useState<FinanceStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const res = await fetchWithAuth("/api/admin/finance-stats?type=month")
        const data = await res.json()
        if (data.success) {
          setFinanceStats(data.data)
        }
      } catch (error) {
        console.error("Error fetching finance stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex p-6 flex-col md:p-10 w-full">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        {/* Charts Section */}
        
        <div className="grid grid-cols-1  gap-6 mb-8">
          <Charts />
        </div>

        {/* Financial Highlights Component */}
        <FinancialHighlights financeStats={financeStats} isLoading={isLoading} />

        {/* Additional Components */}
        <div className="flex flex-col gap-6">{/* Add any additional components here */}</div>
      </div>
    </div>
  )
}

export default Page

