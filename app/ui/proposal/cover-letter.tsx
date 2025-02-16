"use client";

import React, { useState } from "react";

const CoverLetter = () => {
  const [coverLetter, setCoverLetter] = useState("");

  return (
    <div className="border-2 border-gray-300 rounded-xl p-6 w-full bg-white ">
      <p className="font-semibold text-2xl mb-4">Cover Letter</p>
      <p className="text-sm text-gray-500 mb-4">
        Write a cover letter to the client explaining why you are the right fit
        for this job.
      </p>
      <textarea
        value={coverLetter}
        onChange={(e) => setCoverLetter(e.target.value)}
        placeholder="Write your cover letter here..."
        className={`border p-3 rounded-md w-full h-40 resize-none text-sm ${!coverLetter.trim() ? "border-red-500" : "border-gray-300"}`}
      />
      {!coverLetter.trim() && (
        <p className="text-red-500 text-sm mt-1">Cover letter is required.</p>
      )}
    </div>
  );
};

export default CoverLetter;
