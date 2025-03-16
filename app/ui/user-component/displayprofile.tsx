import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";
import { useAuth } from "@/app/providers";
import { useEffect, useState } from "react";

export default function DisplayProfile() {
  const { session, status } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [freelancerData, setFreelancerData] = useState<any>(null);

  // Fetch user data
  useEffect(() => {
    if (session?.user?.id) {
      const fetchUserData = async () => {
        try {
          const res = await fetchWithAuth(
            `/api/user?userId=${session?.user.id}`
          );
          const data = await res.json();
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [session]);

  // Fetch freelancer data
  useEffect(() => {
    if (session?.user?.id) {
      const fetchFreelancerData = async () => {
        try {
          const res = await fetchWithAuth(
            `/api/freelancers?userId=${session?.user.id}`
          );
          const data = await res.json();
          setFreelancerData(data.freelancer); // Extract freelancer object
        } catch (error) {
          console.error("Error fetching freelancer data:", error);
        }
      };
      fetchFreelancerData();
    }
  }, [session]);

  return (
    <div className="flex ml-16 mt-16 items-start bg-white-100 border min-h-screen">
      <div className="bg-white rounded-2xl p-8 w-full max-w-4xl flex flex-col">
        {/* Profile Header */}
        <div className="flex items-center mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden mr-6">
            <img
              src={userData?.profilePicture || "/default-avatar.png"}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold">
              {userData?.name} {userData?.lastName}
            </h2>
            <p className="text-lg text-gray-500">{userData?.email}</p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="border-t pt-4 mb-6">
          <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-4 gap-4 text-gray-700">
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {userData?.phone || "Not provided"}
            </p>
            <p>
              <span className="font-semibold">Country:</span>{" "}
              {userData?.country || "Not provided"}
            </p>
            <p>
              <span className="font-semibold">City:</span>{" "}
              {userData?.city || "Not provided"}
            </p>
            <p>
              <span className="font-semibold">Postal Code:</span>{" "}
              {userData?.zipPostalCode || "Not provided"}
            </p>
          </div>
        </div>

        {/* Account Information */}
        <div className="border-t pt-4">
          <h3 className="text-xl font-semibold mb-4">Account Information</h3>
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {userData?.email || "Not provided"}
            </p>
            <p>
              <span className="font-semibold">KYC Verified:</span>{" "}
              {userData?.kycVerified ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-semibold">Email Verified:</span>{" "}
              {userData?.emailVerified ? "Yes" : "No"}
            </p>
          </div>
        </div>

        {/* Freelancer Information */}
        {freelancerData && (
          <div className="border-t pt-6 mt-6">
            <h2 className="text-2xl font-semibold mb-4">
              Freelancer Information
            </h2>

            {/* Skills & Industries */}
            <div className="border-t pt-4 mb-6">
              <h3 className="text-xl font-semibold mb-4">
                Skills & Industries
              </h3>
              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <p>
                  <span className="font-semibold">Skills:</span>{" "}
                  {freelancerData?.skills?.join(", ") || "Not provided"}
                </p>
                <p>
                  <span className="font-semibold">Industries:</span>{" "}
                  {freelancerData?.industries?.join(", ") || "Not provided"}
                </p>
              </div>
            </div>

            {/* Work Experience */}
            <div className="border-t pt-4 mb-6">
              <h3 className="text-xl font-semibold mb-4">Work Experience</h3>
              {freelancerData?.workExperience?.length > 0 ? (
                freelancerData?.workExperience.map(
                  (work: any, index: number) => (
                    <div key={index} className="mb-4">
                      <p className="font-semibold">
                        {work.company} - {work.position}
                      </p>
                      <p className="text-gray-600">{work.duration}</p>
                      <p>{work.description}</p>
                    </div>
                  )
                )
              ) : (
                <p className="text-gray-500">No work experience provided.</p>
              )}
            </div>

            {/* Project Portfolio */}
            <div className="border-t pt-4 mb-6">
              <h3 className="text-xl font-semibold mb-4">Project Portfolio</h3>
              {freelancerData?.projectPortfolio?.length > 0 ? (
                freelancerData?.projectPortfolio.map(
                  (project: any, index: number) => (
                    <div key={index} className="mb-4">
                      <p className="font-semibold">{project.title}</p>
                      <p className="text-gray-600">{project.description}</p>
                    </div>
                  )
                )
              ) : (
                <p className="text-gray-500">No projects added.</p>
              )}
            </div>

            {/* Education */}
            <div className="border-t pt-4">
              <h3 className="text-xl font-semibold mb-4">Education</h3>
              {freelancerData?.education?.length > 0 ? (
                freelancerData?.education.map((edu: any, index: number) => (
                  <div key={index} className="mb-4">
                    <p className="font-semibold">
                      {edu.institution} - {edu.degree}
                    </p>
                    <p className="text-gray-600">{edu.duration}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No education details provided.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
