"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { fetchWithAuth } from "@/app/lib/fetchWIthAuth"
import JobDetailsModal from "@/app/ui/client-components/jobdetailsmodal/jobdetailscard"
import {
  BriefcaseIcon,
  MapPinIcon,
  CalendarIcon,
  CurrencyRupeeIcon,
  TagIcon,
  DocumentTextIcon,
  UserGroupIcon,
  PlusCircleIcon,
  ArrowPathIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"

interface Job {
  _id: string
  title: string
  description: string
  proposalCount: number
  fullName: string
  location: string
  status: string
  createdAt: string
  budget: number
  tags: string[]
}

interface AllJobsListProps {
  userId: string
}

const AllJobsList: React.FC<AllJobsListProps> = ({ userId }) => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("active")

  useEffect(() => {
    if (userId) {
      fetchJobs()
    }
  }, [userId])

  const fetchJobs = async () => {
    setIsLoading(true)
    try {
      const response = await fetchWithAuth(`/api/fetchJobs?userId=${userId}`)
      const data = await response.json()
      setJobs(data.jobs)
    } catch (error) {
      console.error("Error fetching jobs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleJobClick = (job: Job) => {
    setSelectedJob(job)
  }

  const handleCloseModal = () => {
    setSelectedJob(null)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const filteredJobs = jobs
    .filter(
      (job) =>
        (sortBy === "active" && job.status === "active") ||
        (sortBy === "completed" && job.status === "completed") ||
        (sortBy === "all" && job.status !== ""),
    )
    .filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Posted Jobs</h1>
          <p className="mt-1 text-sm text-gray-500">Manage and track all the jobs you have posted</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button
            onClick={fetchJobs}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <ArrowPathIcon className="h-4 w-4 mr-2" />
            Refresh
          </button>
            <a
            href="/client/post-job"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
            <PlusCircleIcon className="h-4 w-4 mr-2" />
            Post New Job
            </a>
        </div>
      </div>

      {/* Search and filter */}
      <div className="bg-white rounded-lg shadow-sm mb-6 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
              placeholder="Search jobs by title or description..."
            />
          </div>
          <div className="flex items-center space-x-2">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              <option value="active">Active Jobs</option>
              <option value="completed">Completed Jobs</option>
              <option value="all">All Jobs</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <ArrowPathIcon className="h-8 w-8 text-gray-400 animate-spin" />
        </div>
      ) : jobs.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <BriefcaseIcon className="mx-auto h-12 w-12 text-gray-300" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No jobs posted yet</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating your first job posting.</p>
          <div className="mt-6">
            <a
              href="/client/post-job"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <PlusCircleIcon className="h-5 w-5 mr-2" />
              Post Your First Job
            </a>
          </div>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-300" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No matching jobs found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          <div className="mt-6">
            <button
              onClick={() => {
                setSearchTerm("")
                setSortBy("active")
              }}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Clear Filters
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job._id}
              onClick={() => handleJobClick(job)}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer border border-gray-100"
            >
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <BriefcaseIcon className="h-5 w-5 text-primary-500 mr-2" />
                      <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {job.tags &&
                        job.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                          >
                            <TagIcon className="h-3 w-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                    </div>

                    <p className="mt-3 text-gray-600 line-clamp-2">
                      <DocumentTextIcon className="inline-block h-4 w-4 mr-1 text-gray-400" />
                      {job.description}
                    </p>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPinIcon className="h-4 w-4 mr-1 text-gray-400" />
                        {job.location || "Remote"}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
                        Posted on {formatDate(job.createdAt)}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <CurrencyRupeeIcon className="h-4 w-4 mr-1 text-gray-400" />
                        Budget: Rs{job.budget.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-0 sm:ml-6 flex flex-col items-center">
                    <div className="bg-primary-50 rounded-full p-3">
                      <UserGroupIcon className="h-6 w-6 text-primary-500" />
                    </div>
                    <div className="mt-2 text-center">
                      <span className="text-2xl font-bold text-primary-600">{job.proposalCount}</span>
                      <p className="text-xs text-gray-500">Proposals</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-3 flex justify-end">
                <button className="text-sm font-medium text-primary-600 hover:text-primary-500">View Details →</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedJob && <JobDetailsModal job={selectedJob} onClose={handleCloseModal} />}
    </div>
  )
}

export default AllJobsList
