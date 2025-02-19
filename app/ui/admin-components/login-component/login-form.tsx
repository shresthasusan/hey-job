"use client";

import { AtSymbolIcon, KeyIcon } from "@heroicons/react/24/outline";
import { Button } from "../../button";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

const LoginForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Add this state

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (userName === "" || password === "") {
      setError("Please fill in all fields");
      return;
    }

    setIsSubmitting(true); // Disable the button when form submission starts

    try {
      const res = await signIn("credentials", {
        email: userName, // authOption handles email as field name
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid Credentials");
        setIsSubmitting(false); // Re-enable the button if there's an error
        return;
      }
      router.push("/admin");
    } catch (err) {
      setError("An unexpected error occurred");
      setIsSubmitting(false); // Re-enable the button if there's an error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative">
        <AtSymbolIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="userName"
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
          placeholder="UserName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
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
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button
        type="submit"
        className={clsx("w-full text-white", {
          "bg-slate-100  border-2 border-primary-600 cursor-not-allowed":
            isSubmitting == true,
        })}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Loging in..." : "Log In"}
      </Button>
    </form>
  );
};

export default LoginForm;
