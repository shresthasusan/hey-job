"use client";

import { useState, useEffect } from "react";
import { fetchWithAuth } from "../lib/fetchWIthAuth";

interface EsewaConfig {
  tax_amount: number;
  total_amount: number;
  transaction_uuid: string;
  product_code: string;
  product_service_charge: number;
  product_delivery_charge: number;
  success_url: string;
  failure_url: string;
  signed_field_names: string;
  signature: string;
}

interface PaymentResponse {
  amount: string;
  esewaConfig: EsewaConfig;
}

export default function EsewaPayment() {
  const [amount, setAmount] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDummyData = async () => {
      try {
        const response = await fetchWithAuth("/api/dummy-data?method=esewa");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAmount(data.amount);
        setProductName(data.productName);
        setTransactionId(data.transactionId);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        console.error("Error fetching dummy data:", errorMessage);
      }
    };

    fetchDummyData();
  }, []);

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchWithAuth("/api/esewa-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "esewa",
          amount,
          productName,
          transactionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Payment initiation failed: ${response.statusText}`);
      }

      const paymentData: PaymentResponse = await response.json();

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

      const esewaPayload = {
        amount: paymentData.amount,
        tax_amount: paymentData.esewaConfig.tax_amount,
        total_amount: paymentData.esewaConfig.total_amount,
        transaction_uuid: paymentData.esewaConfig.transaction_uuid,
        product_code: paymentData.esewaConfig.product_code,
        product_service_charge: paymentData.esewaConfig.product_service_charge,
        product_delivery_charge:
          paymentData.esewaConfig.product_delivery_charge,
        success_url: paymentData.esewaConfig.success_url,
        failure_url: paymentData.esewaConfig.failure_url,
        signed_field_names: paymentData.esewaConfig.signed_field_names,
        signature: paymentData.esewaConfig.signature,
      };

      Object.entries(esewaPayload).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error("Payment error:", errorMessage);
      setError("Payment initiation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
        <h2 style={{ textAlign: "center" }}>Esewa Payment</h2>
        <p style={{ textAlign: "center" }}>Enter payment details for Esewa</p>
        <form onSubmit={handlePayment}>
          {error && (
            <div
              style={{
                color: "red",
                backgroundColor: "#fdd",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "15px",
              }}
            >
              {error}
            </div>
          )}
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
              {isLoading ? "Processing..." : "Pay with Esewa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}