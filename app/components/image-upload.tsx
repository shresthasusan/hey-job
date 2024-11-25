"use client";

import { UploadButton } from "@/utils/uploadthing";
import React from "react";

// interface Proops {
//   endpoint: string;
// }

const ImageUpload = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <UploadButton
          endpoint="portfolioUploader"
          onClientUploadComplete={(res) => {
            console.log("Files:", res);
            alert("Image uploaded successfully");
          }}
          onUploadError={(err) => {
            console.log("Error:", err);
            alert("Error uploading image");
          }}
        />
      </div>
    </>
  );
};

export default ImageUpload;
