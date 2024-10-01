"use client"; // Indicates that this file should be treated as a client-side component

// Importing necessary icons and components
import { AtSymbolIcon, KeyIcon } from "@heroicons/react/24/outline";
import { Button } from "../button";
import { LifebuoyIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// LoginForm component definition
const LoginForm = () => {
  // State variables for email, password, and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // useRouter hook to programmatically navigate
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    setError(""); // Clear any previous error messages

    // Validate form fields
    if (email === "" || password === "") {
      setError("Please fill in all fields");
      return;
    }

    try {
      // Attempt to sign in using next-auth
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      // Check for authentication errors
      if (res?.error) {
        setError("Invalid Credentials");
        return;
      }

      // If successful, redirect to the home page
      router.push("/");
    } catch (err) {
      // Handle any unexpected errors
      setError("An unexpected error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email input field */}
      <div className="relative">
        <AtSymbolIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="email"
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Password input field */}
      <div className="relative">
        <KeyIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="password"
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Error message display */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Submit button */}
      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  );
};

// Exporting the LoginForm component as the default export
export default LoginForm;
