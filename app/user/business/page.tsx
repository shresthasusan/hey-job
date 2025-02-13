"use client";

import { useState } from "react";

const MyBusinessPage: React.FC = () => {
  const [businessName, setBusinessName] = useState("John's Digital Agency");
  const [businessDescription, setBusinessDescription] = useState(
    "We provide high-quality web development, graphic design, and digital marketing services."
  );
  const [profilePicture, setProfilePicture] = useState("/business-avatar.png");
  const [services, setServices] = useState([
    "Web Development",
    "Graphic Design",
    "SEO Marketing",
  ]);
  const [earnings, setEarnings] = useState(12000);
  const [clients, setClients] = useState(25);
  const [projectsCompleted, setProjectsCompleted] = useState(50);

  return (
    <div className=" mx-auto  bg-white p-10 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mt-8 text-center text-gray-700">My Business</h2>

    
      

      {/* Services Offered */}
      <div className="my-3">
        <h3 className="text-xl font-semibold">Services Offered</h3>
        <ul className="list-disc pl-5">
          {services.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
      </div>

      {/* Business Stats */}
      <div className="grid grid-cols-3 gap-4 my-5">
        <div className="p-4 bg-gray-100 rounded-md text-center">
          <h3 className="text-lg font-semibold">{earnings}$</h3>
          <p className="text-gray-600">Total Earnings</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-md text-center">
          <h3 className="text-lg font-semibold">{clients}</h3>
          <p className="text-gray-600">Clients</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-md text-center">
          <h3 className="text-lg font-semibold">{projectsCompleted}</h3>
          <p className="text-gray-600">Projects Completed</p>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="my-3">
        <h3 className="text-xl font-semibold">Payment Methods</h3>
        <p className="text-gray-600">Connected: PayPal, Stripe</p>
      </div>

      {/* Business Settings */}
      <div className="my-3">
        <h3 className="text-xl font-semibold">Business Settings</h3>
        <p className="text-gray-600">Manage availability, visibility, and more.</p>
      </div>

      {/* Save Button */}
    </div>
  );
};

export default MyBusinessPage;
