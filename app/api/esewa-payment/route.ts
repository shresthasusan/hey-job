import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { generateEsewaSignature } from "../../lib/generateEsewaSignature";
import { PaymentRequestData } from "../../../types/PaymentRequestData";

function validateEnvironmentVariables() {
  const requiredEnvVars = [
    "NEXT_PUBLIC_BASE_URL",
    "NEXT_PUBLIC_ESEWA_MERCHANT_CODE",
    "NEXT_PUBLIC_ESEWA_SECRET_KEY",
  ];
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing environment variable: ${envVar}`);
    }
  }
}

export async function POST(req: Request) {
  try {
    validateEnvironmentVariables();
    const paymentData: PaymentRequestData = await req.json();
    const { amount, productName, transactionId, method } = paymentData;

    if (!amount || !productName || !transactionId || method !== "esewa") {
      console.error("Missing required fields or invalid method:", paymentData);
      return NextResponse.json(
        { error: "Missing required fields or invalid method" },
        { status: 400 }
      );
    }

    console.log("Initiating eSewa payment");
    const transactionUuid = `${Date.now()}-${uuidv4()}`;
    const esewaConfig = {
      amount: amount,
      tax_amount: "0",
      total_amount: amount,
      transaction_uuid: transactionUuid,
      product_code: process.env.NEXT_PUBLIC_ESEWA_MERCHANT_CODE,
      product_service_charge: "0",
      product_delivery_charge: "0",
      success_url: `${process.env.NEXT_PUBLIC_SUCCESS_URL}`,
      failure_url: `${process.env.NEXT_PUBLIC_FAILURE_URL}`,
      signed_field_names: "total_amount,transaction_uuid,product_code",
    };

    const signatureString = `total_amount=${esewaConfig.total_amount},transaction_uuid=${esewaConfig.transaction_uuid},product_code=${esewaConfig.product_code}`;
    const signature = generateEsewaSignature(
      process.env.NEXT_PUBLIC_ESEWA_SECRET_KEY!,
      signatureString
    );

    console.log("eSewa config:", { ...esewaConfig, signature });

    return NextResponse.json({
      amount: amount,
      esewaConfig: {
        ...esewaConfig,
        signature,
        product_service_charge: Number(esewaConfig.product_service_charge),
        product_delivery_charge: Number(esewaConfig.product_delivery_charge),
        tax_amount: Number(esewaConfig.tax_amount),
        total_amount: Number(esewaConfig.total_amount),
      },
    });
  } catch (err) {
    console.error("Payment API Error:", err);
    return NextResponse.json(
      {
        error: "Error creating payment session",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}