"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../button";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../lib/firebase"; // Import Firebase storage
import Image from "next/image";

const DetailsForm = () => {
  type formData = {
    userId?: string;
    fullName?: string;
    title: string;
    type: string;
    experience: string;
    budget: string;
    description: string;
    tags: string[];
    location: string;
    fileUrls: string[];
  };

  const router = useRouter();
  const [step, setStep] = useState(0);
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const { data: session } = useSession();
  const id = session?.user.id;
  const fullName = session?.user.name + " " + session?.user.lastName;

  const initialFormData: formData = {
    userId: id,
    fullName: fullName,
    title: "",
    type: "",
    experience: "",
    budget: "",
    description: "",
    tags: [],
    location: "",
    fileUrls: [],
  };

  const [formData, setFormData] = useState<formData>(initialFormData);
  useEffect(() => {
    setFormData({
      ...formData,
      userId: id,
      fullName: fullName,
    });
  }, [id, fullName, formData]);
  const [files, setFiles] = useState<File[]>([]); // Store file data
  const [uploading, setUploading] = useState<boolean>(false); // State for file upload

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files); // Convert FileList to an array
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeArray = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const array = value.split(",").map((element) => element.trim());
    setFormData({
      ...formData,
      [name]: array,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setUploading(true);

      // Upload the files to Firebase Storage
      const fileUrls: string[] = [];
      for (const file of files) {
        const fileRef = ref(storage, `jobs-images/${file.name}`);
        await uploadBytes(fileRef, file);
        const fileUrl = await getDownloadURL(fileRef);
        fileUrls.push(fileUrl);
      }

      // Add the file URLs and other portfolio data to the form data
      formData.fileUrls = fileUrls;

      const response = await fetch("/api/post-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Form submitted successfully");
        setFormData(initialFormData); // Reset form data to initial state
        router.push("/client/best-matches");
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("An error occurred while submitting the form", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-5 flex-col w-1/2">
      {step === 0 && (
        <>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Job Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Job Type
            </label>
            <input
              type="text"
              name="type"
              id="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700"
            >
              Experience Level
            </label>
            <input
              type="text"
              name="experience"
              id="experience"
              value={formData.experience}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex justify-between">
            <Button
              className="text-white disabled cursor-not-allowed opacity-50"
              disabled
            >
              Back
            </Button>
            <Button onClick={nextStep} className="text-white">
              Next
            </Button>
          </div>
        </>
      )}
      {step === 1 && (
        <>
          <div>
            <label
              htmlFor="budget"
              className="block text-sm font-medium text-gray-700"
            >
              Budget ($)
            </label>
            <input
              type="text"
              name="budget"
              id="budget"
              value={formData.budget}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Job Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Skills Required
            </label>
            <input
              type="text"
              name="tags"
              id="tags"
              value={formData.tags.join(", ")}
              onChange={handleChangeArray}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex justify-between">
            <Button onClick={prevStep} className="text-white">
              Back
            </Button>
            <Button onClick={nextStep} className="text-white">
              Next
            </Button>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex justify-between">
            <Button onClick={prevStep} className="text-white">
              Back
            </Button>
            <Button onClick={nextStep} className="text-white">
              Next
            </Button>
          </div>
        </>
      )}
      {step === 3 && (
        <>
          <div>
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Files
            </label>
            <input
              type="file"
              name="file"
              id="file"
              onChange={handleFileChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
            {/* Preview selected files */}
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700">
                Selected Files
              </h3>
              <div className="flex gap-2 mt-2">
                {files.map((file, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={URL.createObjectURL(file)} // Preview image using Object URL
                      alt={file.name}
                      className="h-20 w-20 object-cover rounded-md"
                      width={80}
                      height={80}
                    />
                    <Button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="absolute top-0 right-0 p-1"
                    >
                      X
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <Button onClick={prevStep} className="text-white">
                Back
              </Button>
              <Button
                onClick={() => handleSubmit}
                className="text-white"
                success={true}
              >
                Submit
              </Button>
            </div>
          </div>
        </>
      )}
    </form>
  );
};

export default DetailsForm;
