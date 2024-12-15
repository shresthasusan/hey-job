"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/app/ui/button";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase"; // Import Firebase storage
import { useRouter } from "next/navigation";

export type project = {
  projectTitle: string;
  projectDescription: string;
  technologies: string;
  portfolioFiles: string[];
};

export type work = {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
};

export type institution = {
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
};

type FormData = {
  userId?: string;
  fullName?: string;
  email?: string;
  location: string;
  phone: string;
  skills: string[];
  workExperience: work[];
  projectPortfolio: project[];
  education: institution[];
  bio: string;
  languages: string[];
  rate: string;
};
const defaultPortfolioItem = {
  projectTitle: "",
  projectDescription: "",
  technologies: "",
  portfolioFiles: [],
};

const defaultWorkExperienceItem = {
  jobTitle: "",
  company: "",
  startDate: new Date().toISOString().slice(0, 10), // Format as YYYY-MM-DD
  endDate: new Date().toISOString().slice(0, 10),
};

const defaultEducationItem = {
  degree: "",
  institution: "",
  startDate: new Date().toISOString().slice(0, 10), // Format as YYYY-MM-DD
  endDate: new Date().toISOString().slice(0, 10),
};

const MultiStepForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const { data: session } = useSession();
  const [uploading, setUploading] = useState<boolean>(false);
  const [files, setFiles] = useState<{ [key: number]: File[] }>([]); // Store file data

  const userId = session?.user.id;
  const email = session?.user.email;
  const fullName = session?.user.name + " " + session?.user.lastName;

  const handleAddItem = (field: ArrayFieldKey, defaultItem: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: [...(prevState[field] || []), defaultItem],
    }));
  };

  // Define initial form data using the FormData type
  const initialFormData: FormData = {
    userId: "",
    fullName: "",
    email: "",
    location: "",
    phone: "",
    skills: [],
    workExperience: [
      {
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
      },
    ],
    projectPortfolio: [
      {
        projectTitle: "",
        projectDescription: "",
        technologies: "",
        portfolioFiles: [],
      },
    ],
    education: [
      {
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
      },
    ],
    bio: "",
    languages: [],
    rate: "",
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);

  useEffect(() => {
    setFormData({
      ...formData,
      userId: userId,
      fullName: fullName,
      email: email,
    });
  }, [userId, fullName, email]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file selection for a specific project
  const handleFileChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => ({
        ...prev,
        [index]: [...(prev[index] || []), ...selectedFiles],
      }));
    }
  };

  // Remove a file from a specific project
  const handleRemoveFile = (projectIndex: number, fileIndex: number) => {
    setFiles((prev) => ({
      ...prev,
      [projectIndex]: prev[projectIndex].filter((_, i) => i !== fileIndex),
    }));
  };

  type ArrayFieldKey = "projectPortfolio" | "workExperience" | "education";

  const handleObjectArrayChange = (
    field: ArrayFieldKey, // e.g., "projectPortfolio", "workExperience"
    index: number,
    name: string,
    value: string
  ) => {
    setFormData((prevState) => {
      const updatedArray = [...prevState[field]] as any; // Type assertion for dynamic access
      updatedArray[index] = {
        ...updatedArray[index],
        [name]: value,
      };
      return {
        ...prevState,
        [field]: updatedArray,
      };
    });
  };
  const handleArrayChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const Array = value
      .split(",")
      .map((item: any) => item.trim())
      .filter((item: any) => item);
    setFormData({
      ...formData,
      [name]: Array,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // console.log("Submitting form data:", formData);
      setUploading(true);

      // Upload files for each project
      const updatedProjects = await Promise.all(
        formData.projectPortfolio.map(async (project, index) => {
          const projectFiles = files[index] || [];
          const fileUrls = await Promise.all(
            projectFiles.map(async (file) => {
              const fileRef = ref(storage, `portfolios/${file.name}`);
              await uploadBytes(fileRef, file);
              return getDownloadURL(fileRef);
            })
          );
          return {
            ...project,
            portfolioFiles: fileUrls,
          };
        })
      );

      console.log("Updated projects:", updatedProjects);
      const finalFormData = {
        ...formData,
        projectPortfolio: updatedProjects,
      };

      console.log("Final form data:", finalFormData);
      const response = await fetch("/api/freelancerInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalFormData),
      });

      if (response.ok) {
        setFormData(initialFormData);
        setFiles({});
        router.push("/signup/profile-upload");
      } else {
        alert("Error submitting portfolio.");
      }
    } catch (error) {
      console.error("An error occurred while submitting the form", error);
    }
  };
  const stepTitles = [
    "Personal Information",
    "Project Portfolio",
    "Work Experience",
    "Education",
  ];

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <h2 className="text-lg font-semibold mb-4">{stepTitles[step]}</h2>

      {/* Step 1: Personal Information */}
      {step === 0 && (
        <>
          <div>
            <label className="block">Phone</label>
            <input
              type="text"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              name="phone"
            />
          </div>
          <div>
            <label className="block">Bio</label>
            <textarea
              value={formData.bio}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              name="bio"
              rows={3}
            />
          </div>
          <div>
            <label className="block">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              name="location"
            />
          </div>
          <div>
            <label className="block">Skills</label>
            <input
              type="text"
              onChange={handleArrayChange}
              className="w-full border rounded-md p-2"
              name="skills"
              placeholder="Enter skills separated by commas"
            />
          </div>
          <div>
            <label className="block">Languages</label>
            <input
              type="text"
              onChange={handleArrayChange}
              className="w-full border rounded-md p-2"
              name="languages"
              placeholder="Enter skills separated by commas"
            />
          </div>
          <div>
            <label className="block">Rate</label>
            <input
              type="text"
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              name="rate"
            />
          </div>
        </>
      )}

      {/* Step 2: Project Portfolio */}

      {step === 1 &&
        formData.projectPortfolio.map((portfolio, index) => (
          <div key={index} className="border p-4 rounded-md mb-2">
            <div>
              <label className="block">Project Title</label>
              <input
                type="text"
                value={portfolio.projectTitle}
                name="projectTitle"
                onChange={(e) =>
                  handleObjectArrayChange(
                    "projectPortfolio",
                    index,
                    e.target.name,
                    e.target.value
                  )
                }
                className="w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block">Project Description</label>
              <input
                type="text"
                value={portfolio.projectDescription}
                name="projectDescription"
                onChange={(e) =>
                  handleObjectArrayChange(
                    "projectPortfolio",
                    index,
                    e.target.name,
                    e.target.value
                  )
                }
                className="w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block">Technology</label>
              <input
                type="text"
                value={portfolio.technologies}
                name="technologies"
                onChange={(e) =>
                  handleObjectArrayChange(
                    "projectPortfolio",
                    index,
                    e.target.name,
                    e.target.value
                  )
                }
                className="w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Project Files
              </label>
              <input
                type="file"
                multiple
                onChange={(e) => handleFileChange(index, e)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            {/* File Preview */}
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700">
                Selected Files
              </h3>
              <div className="flex gap-2 mt-2 flex-wrap">
                {files[index]?.map((file, fileIndex) => (
                  <div key={fileIndex} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="h-20 w-20 object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      onClick={() => handleRemoveFile(index, fileIndex)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      X
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <Button
              type="button"
              onClick={() =>
                handleAddItem("projectPortfolio", defaultPortfolioItem)
              }
              className=" px-4 py-2 mt-4"
            >
              Add Project
            </Button>
          </div>
        ))}

      {/* Similar structure for Work Experience and Education */}

      {step === 2 &&
        formData.workExperience.map((work, index) => (
          <div key={index} className="border p-4 rounded-md mb-2">
            <div>
              <label className="block">Company</label>
              <input
                type="text"
                value={work.company}
                name="company"
                onChange={(e) => {
                  handleObjectArrayChange(
                    "workExperience",
                    index,
                    e.target.name,
                    e.target.value
                  );
                }}
                className="w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label className="block">jobTitle</label>
              <input
                type="text"
                value={work.jobTitle}
                name="jobTitle"
                onChange={(e) => {
                  handleObjectArrayChange(
                    "workExperience",
                    index,
                    e.target.name,
                    e.target.value
                  );
                }}
                className="w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label className="block">Start Date</label>
              <input
                type="date"
                value={work.startDate}
                name="startDate"
                onChange={(e) => {
                  handleObjectArrayChange(
                    "workExperience",
                    index,
                    e.target.name,
                    e.target.value
                  );
                }}
                className="w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block">End Date</label>
              <input
                type="date"
                value={work.endDate}
                name="endDate"
                onChange={(e) => {
                  handleObjectArrayChange(
                    "workExperience",
                    index,
                    e.target.name,
                    e.target.value
                  );
                }}
                className="w-full border rounded-md p-2"
              />
            </div>

            <Button
              type="button"
              onClick={() =>
                handleAddItem("workExperience", defaultWorkExperienceItem)
              }
              className=" px-4 py-2 mt-4"
            >
              Add Work
            </Button>
          </div>
        ))}

      {/* Similar structure for  Education */}

      {step === 3 &&
        formData.education.map((edu, index) => (
          <div key={index} className="border p-4 rounded-md mb-2">
            <div>
              <label className="block">Instituition</label>
              <input
                type="text"
                value={edu.institution}
                name="institution"
                onChange={(e) => {
                  handleObjectArrayChange(
                    "education",
                    index,
                    e.target.name,
                    e.target.value
                  );
                }}
                className="w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label className="block">Degree</label>
              <input
                type="text"
                value={edu.degree}
                name="degree"
                onChange={(e) => {
                  handleObjectArrayChange(
                    "education",
                    index,
                    e.target.name,
                    e.target.value
                  );
                }}
                className="w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label className="block">Start Date</label>
              <input
                type="date"
                value={edu.startDate}
                name="startDate"
                onChange={(e) => {
                  handleObjectArrayChange(
                    "education",
                    index,
                    e.target.name,
                    e.target.value
                  );
                }}
                className="w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label className="block">End Date</label>
              <input
                type="date"
                value={edu.endDate}
                name="endDate"
                onChange={(e) => {
                  handleObjectArrayChange(
                    "education",
                    index,
                    e.target.name,
                    e.target.value
                  );
                }}
                className="w-full border rounded-md p-2"
              />
            </div>
            <Button
              type="button"
              onClick={() => handleAddItem("education", defaultEducationItem)}
              className=" px-4 py-2 mt-4"
            >
              Add Education
            </Button>
          </div>
        ))}

      <div className="flex justify-between mt-4">
        {step > 0 && (
          <Button type="button" onClick={() => setStep((prev) => prev - 1)}>
            Previous
          </Button>
        )}
        {step < stepTitles.length - 1 && (
          <Button type="button" onClick={() => setStep((prev) => prev + 1)}>
            Next
          </Button>
        )}
        {step === stepTitles.length - 1 && (
          <Button type="submit" className="bg-blue-500 text-white">
            Submit
          </Button>
        )}
      </div>
    </form>
  );
};

export default MultiStepForm;
