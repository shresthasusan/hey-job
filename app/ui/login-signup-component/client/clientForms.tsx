"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/app/ui/button";
import { useRouter } from "next/navigation";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../lib/firebase"; // Firebase storage import
import clsx from "clsx";

interface ClientFormData {
  userId?: string;
  fullName: string;
  isCompany: boolean;
  industry: string;
  companySize?: "Startup" | "Small" | "Medium" | "Large";
  location: string;
  preferredSkills: string[];
  averageBudget: number;
  rating?: number; // Default to 0, can be updated later
}

const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Marketing",
  "E-commerce",
  "Construction",
  "Automotive",
  "Legal",
  "Entertainment",
  "Other",
];

const ClientForm = () => {
  const router = useRouter();
  const { data: session } = useSession();

  // Initial form data
  const initialFormData: ClientFormData = {
    userId: "",
    fullName: "",
    isCompany: false,
    industry: "",
    companySize: undefined,
    location: "",
    preferredSkills: [],
    averageBudget: 0,
    rating: 0,
  };

  const [formData, setFormData] = useState<ClientFormData>(initialFormData);
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (session) {
      setFormData((prev) => ({
        ...prev,
        userId: session.user.id,
        fullName: session.user.name + " " + session.user.lastName,
      }));
    }
  }, [session]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSkillsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      preferredSkills: e.target.value.split(",").map((skill) => skill.trim()),
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCompanyLogo(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let companyLogoURL = "";

      const finalFormData = {
        ...formData,
        companyLogo: companyLogoURL || null,
      };

      // Send data to API
      const response = await fetch("/api/clientInfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalFormData),
      });

      if (response.ok) {
        router.push(`/client/best-matches~`); // Redirect after successful registration
      } else {
        alert("Error submitting client details.");
      }
    } catch (error) {
      console.error("Error submitting client form:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto border p-6 rounded-lg shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Client Registration</h2>

      {/* Full Name */}
      <div>
        <label className="block font-medium">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
          required
        />
      </div>

      {/* Is Company */}
      <div className="flex items-center mt-3">
        <input
          type="checkbox"
          id="isCompany"
          name="isCompany"
          checked={formData.isCompany}
          onChange={handleChange}
          className="mr-2"
        />
        <label htmlFor="isCompany" className="font-medium">
          Registering as a Company
        </label>
      </div>

      {/* Industry */}
      <div className="mt-3">
        <label className="block font-medium">Industry</label>
        <select
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          required
          className="w-full border rounded-md p-2"
        >
          <option value="">Select an industry</option>
          {industries.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>
      </div>

      {/* Company Size (if Company) */}
      {formData.isCompany && (
        <div className="mt-3">
          <label className="block font-medium">Company Size</label>
          <select
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="">Select Size</option>
            <option value="Startup">Startup</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
      )}

      {/* Location */}
      <div className="mt-3">
        <label className="block font-medium">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
          required
        />
      </div>

      {/* Preferred Skills */}
      <div className="mt-3">
        <label className="block font-medium">Preferred Skills</label>
        <input
          type="text"
          name="preferredSkills"
          onChange={handleSkillsChange}
          className="w-full border rounded-md p-2"
          placeholder="Enter skills separated by commas"
        />
      </div>

      {/* Average Budget */}
      <div className="mt-3">
        <label className="block font-medium">Average Budget ($)</label>
        <input
          type="number"
          name="averageBudget"
          value={formData.averageBudget}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
          min={0}
        />
      </div>

      {/* Submit Button */}
      <div className="mt-5">
        <Button
          type="submit"
          className={clsx("w-full bg-blue-500 text-white py-2 rounded", {
            "opacity-50 cursor-not-allowed": uploading,
          })}
        >
          {uploading ? "Submitting..." : "Register Client"}
        </Button>
      </div>
    </form>
  );
};

export default ClientForm;
