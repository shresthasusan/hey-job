import { NextRequest, NextResponse } from "next/server";
import Payment from "@/models/payment";
import Contract from "@/models/contract";
import { generateEsewaSignature } from "@/app/lib/generateEsewaSignature";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const data = searchParams.get("data");

        if (!data) {
            return NextResponse.json(
                { error: "Missing data parameter" },
                { status: 400 }
            );
        }

        // Decode and parse the data
        const decodedData = decodeURIComponent(data);
        const paymentData = JSON.parse(atob(decodedData)) as {
            transaction_code: string;
            status: string;
            total_amount: string;
            transaction_uuid: string;
            product_code: string;
            signed_field_names: string;
            signature: string;
            error_message?: string;
        };

        const {
            transaction_code,
            status,
            total_amount,
            transaction_uuid,
            product_code,
            signed_field_names,
            signature,
            error_message,
        } = paymentData;

        // Validate mandatory fields
        if (!total_amount || !transaction_uuid || !product_code) {
            return NextResponse.json(
                { error: "Missing mandatory fields (total_amount, transaction_uuid, product_code)" },
                { status: 400 }
            );
        }

        // Verify signature for COMPLETE status
        // if (status === "COMPLETE" && signature) {
        // Ensure signed_field_names includes mandatory fields in order
        // const mandatoryFields = ["total_amount", "transaction_uuid", "product_code"];
        // const fields = signed_field_names.split(",");



        // // Construct signature string with all fields from signed_field_names
        // const signatureString = fields
        //     .map((field) => `${field}=${paymentData[field as keyof typeof paymentData]}`)
        //     .join(",");

        // const localSignature = generateEsewaSignature(
        //     process.env.NEXT_PUBLIC_ESEWA_SECRET_KEY!,
        //     signatureString
        // );
        // if (localSignature !== signature) {
        //     return NextResponse.json(
        //         { error: "Invalid signature" },
        //         { status: 400 }
        //     );
        // }
        // }

        // Find Payment record
        const payment = await Payment.findOne({ transactionId: transaction_uuid });
        if (!payment) {
            return NextResponse.json(
                { error: "Payment record not found" },
                { status: 404 }
            );
        }

        // Update Payment and Contract based on status
        if (status === "COMPLETE") {
            await Payment.updateOne(
                { transactionId: transaction_uuid },
                {
                    status: "completed",
                    transactionCode: transaction_code,
                }
            );
            const newStatus = "completed";
            const userId = "system"; // Replace with actual user ID if available

            await Contract.updateOne(
                { _id: payment.contractId },
                {
                    status: newStatus,
                    updatedAt: new Date(),
                    $push: {
                        statusHistory: {
                            status: newStatus,
                            updatedBy: userId,
                            updatedAt: new Date(),
                        },
                    },
                }
            );
            const updatedPaymentData = {
                ...paymentData,
                contractId: payment.contractId.toString(),
            };
            const encodedData = encodeURIComponent(btoa(JSON.stringify(updatedPaymentData)));
            return NextResponse.redirect(`/paymentBilling/success/${payment.contractId}/${payment.freelancerId}?data=${encodedData}`, 302);
        } else if (status !== "COMPLETE") {
            await Payment.updateOne(
                { transactionId: transaction_uuid },
                {
                    status: "failed",
                    transactionCode: transaction_code || "N/A",
                    ...(error_message && { errorMessage: error_message }),
                }
            );
            return NextResponse.redirect(`/paymentBilling/failure?data=${data}`, 302);
        } else {
            return NextResponse.json(
                { error: `Unknown payment status: ${status}` },
                { status: 400 }
            );
        }
    } catch (err) {
        console.error("Callback error:", err);
        return NextResponse.json(
            {
                error: "Error processing callback",
                details: err instanceof Error ? err.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}