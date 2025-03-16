import { fetchWithAuth } from "./fetchWIthAuth";

interface EsewaConfig {
    amount: string;
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
    contractId: string;
}

interface PaymentResponse {
    amount: string;
    esewaConfig: EsewaConfig;
}

export const handlePayment = async (
    contractId: string,
    method: string,
    onError: (message: string) => void
): Promise<void> => {
    try {
        const response = await fetchWithAuth("/api/esewa-payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contractId,
                method,
            }),
        });

        if (!response.ok) {
            throw new Error(`Payment initiation failed: ${response.statusText}`);
        }

        const paymentData: PaymentResponse = await response.json();

        if (method === "esewa") {
            const form = document.createElement("form");
            form.method = "POST";
            form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form"; // Use production URL in prod

            const esewaPayload = {
                amount: paymentData.esewaConfig.amount,
                tax_amount: paymentData.esewaConfig.tax_amount,
                total_amount: paymentData.esewaConfig.total_amount,
                transaction_uuid: paymentData.esewaConfig.transaction_uuid,
                product_code: paymentData.esewaConfig.product_code,
                product_service_charge: paymentData.esewaConfig.product_service_charge,
                product_delivery_charge: paymentData.esewaConfig.product_delivery_charge,
                success_url: paymentData.esewaConfig.success_url,
                failure_url: paymentData.esewaConfig.failure_url,
                signed_field_names: paymentData.esewaConfig.signed_field_names,
                signature: paymentData.esewaConfig.signature,
                contractId: paymentData.esewaConfig.contractId,
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
        } else if (method === "Khalti") {
            // Placeholder for Khalti integration
            console.log("Khalti payment initiated with:", paymentData);
            // Add Khalti-specific logic here (e.g., redirect or SDK call)
        } else {
            throw new Error(`Unsupported payment method: ${method}`);
        }
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "An unknown error occurred";
        console.error("Payment error:", errorMessage);
        onError("Payment initiation failed. Please try again.");
    }
};