"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "../../button";
import { useSession } from "next-auth/react";

const FreelancerForms = () => {
  const [step, setStep] = useState(0);
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const { data: session } = useSession();
  const id = session?.user.id;
  const fullName = session?.user.name + " " + session?.user.lastName;
  const initialFormData = {
    userId: id,
    fullName: fullName,
    professionalEmail: "",
    location: "",
    phone: "",
    skills: [],
    experience: "",
    education: "",
    portfolio: "",
    certificate: "",
    bio: "",
    languages: [],
    rate: "",
  };

  const [formData, setFormData] = useState(initialFormData);

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
      const response = await fetch("/api/freelancerInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form submitted successfully");
        // setFormData(initialFormData); // Reset form data to initial state
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
              htmlFor="professionalEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Professional Email
            </label>
            <input
              type="email"
              name="professionalEmail"
              id="professionalEmail"
              value={formData.professionalEmail}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
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
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
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
              htmlFor="skills"
              className="block text-sm font-medium text-gray-700"
            >
              Skill
            </label>
            <input
              type="text"
              name="skills"
              id="skills"
              value={formData.skills.join(", ")}
              onChange={handleChangeArray}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700"
            >
              Experience
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
          <div>
            <label
              htmlFor="education"
              className="block text-sm font-medium text-gray-700"
            >
              Education
            </label>
            <input
              type="text"
              name="education"
              id="education"
              value={formData.education}
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
      {step === 2 && (
        <>
          <div>
            <label
              htmlFor="portfolio"
              className="block text-sm font-medium text-gray-700"
            >
              Portfolio
            </label>
            <input
              type="text"
              name="portfolio"
              id="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="certificate"
              className="block text-sm font-medium text-gray-700"
            >
              Certificate
            </label>
            <input
              type="text"
              name="certificate"
              id="certificate"
              value={formData.certificate}
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
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700"
            >
              Bio
            </label>
            <textarea
              name="bio"
              id="bio"
              value={formData.bio}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="languages"
              className="block text-sm font-medium text-gray-700"
            >
              Language
            </label>
            <input
              type="text"
              name="languages"
              id="languages"
              value={formData.languages.join(", ")}
              onChange={handleChangeArray}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="rate"
              className="block text-sm font-medium text-gray-700"
            >
              Rate
            </label>
            <input
              type="text"
              name="rate"
              id="rate"
              value={formData.rate}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex justify-between">
            <Button onClick={prevStep} className="text-white">
              Back
            </Button>
            <Button type="submit" className="text-white" success={true}>
              Submit
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default FreelancerForms;
