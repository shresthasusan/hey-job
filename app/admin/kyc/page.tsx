'use client';

import React, { useState, useEffect } from "react";

const KYCPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedDocs, setUploadedDocs] = useState([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const res = await fetch("/api/getKycDocs");
    const data = await res.json();
    setUploadedDocs(data);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select a file!");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", "123"); // Replace with actual user ID

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      fetchDocuments(); // Refresh uploaded files
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">KYC Verification</h1>


      {/* Display Uploaded Documents */}
      <h2 className="text-xl font-semibold mt-6">Uploaded Documents</h2>
      <div className="mt-4">
        {uploadedDocs.map((doc: any) => (
          <div key={doc._id} className="flex items-center justify-between border p-2">
            <p>{doc.documentUrl}</p>
            <span className={`px-2 py-1 text-sm rounded ${
              doc.status === "pending" ? "bg-yellow-500" :
              doc.status === "verified" ? "bg-green-500" : "bg-red-500"
            } text-white`}>
              {doc.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KYCPage;
