"use client";
import React, { useState, useEffect } from "react";
import Script from "next/script";
import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";

function App() {
  const [amount, setAmount] = useState("");
  const [productName, setProductName] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch dummy data on component mount
  useEffect(() => {
    const fetchDummyData = async () => {
      try {
        const response = await fetchWithAuth("/api/dummy-data?method=khalti");
        if (!response.ok) {
          throw new Error("Failed to fetch dummy data");
        }
        const data = await response.json();
        setAmount(data.amount);
        setProductName(data.productName);
        setTransactionId(data.transactionId);
      } catch (error) {
        console.error("Error fetching dummy data:", error);
      }
    };

    fetchDummyData();
  }, []);

  // Handle payment submission
  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetchWithAuth("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "khalti",
          amount,
          productName,
          transactionId,
        }),
      });

      if (!response.ok) {
        throw new Error("Payment initiation failed");
      }

      const data = await response.json();

      if (!data.khaltiPaymentUrl) {
        throw new Error("Khalti payment URL not received");
      }

      // Redirect to Khalti payment URL
      window.location.href = data.khaltiPaymentUrl;
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment initiation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Load Khalti SDK */}
      <Script
        src="https://khalti.s3.ap-south-1.amazonaws.com/KPG/dist/2020.12.22.0.0.0/khalti-checkout.iffe.js"
        onLoad={() => console.log("Khalti script loaded")}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            background: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Khalti Payment</h2>
          <p style={{ textAlign: "center" }}>
            Enter payment details for Khalti
          </p>
          <form onSubmit={handlePayment}>
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="amount"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Amount (NPR)
              </label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="productName"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Product Name
              </label>
              <input
                id="productName"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="transactionId"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Transaction ID
              </label>
              <input
                id="transactionId"
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {isLoading ? "Processing..." : "Pay with Khalti"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
