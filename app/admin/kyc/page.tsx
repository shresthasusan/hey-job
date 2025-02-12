'use client';

import React, { useState, useEffect } from "react";

const KYCPage = () => {
  const [uploadedDocs, setUploadedDocs] = useState([
    { _id: "1", documentUrl: "ID_Card_JohnDoe.pdf", status: "pending" },
    { _id: "2", documentUrl: "Passport_JaneDoe.pdf", status: "verified" },
    { _id: "3", documentUrl: "License_MarkSmith.pdf", status: "rejected" },
    { _id: "4", documentUrl: "Aadhar_Card_EmilyBrown.pdf", status: "pending" },
  ]);

  // Function to handle approval or rejection of a document
  const handleAction = (id: string, status: "verified" | "rejected") => {
    setUploadedDocs((prevDocs) =>
      prevDocs.map((doc) =>
        doc._id === id ? { ...doc, status } : doc
      )
    );
  };

  return (
    <div className="flex flex-col flex-1 p-6 md:p-10 bg-white min-h-screen">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-yellow-400 text-center md:text-left">
        KYC Verification
      </h1>

      {/* Uploaded Documents Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-700">Uploaded Documents</h2>

        <div className="mt-4 space-y-4">
          {uploadedDocs.map((doc) => (
            <div key={doc._id} className="flex items-center justify-between bg-gray-50 shadow-md p-4 rounded-lg">
              <p className="text-gray-800 font-medium">{doc.documentUrl}</p>
              
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 text-sm rounded-lg font-semibold ${
                    doc.status === "pending"
                      ? "bg-yellow-400 text-black"
                      : doc.status === "verified"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {doc.status}
                </span>

                {/* Approve & Reject Buttons (Visible only for Pending Docs) */}
                {doc.status === "pending" && (
                  <div className="flex gap-2">
                    <button
                      className="px-4 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      onClick={() => handleAction(doc._id, "verified")}
                    >
                      Approve
                    </button>
                    <button
                      className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      onClick={() => handleAction(doc._id, "rejected")}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KYCPage;
