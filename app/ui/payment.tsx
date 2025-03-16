"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCardIcon,
  ReceiptPercentIcon,
} from "@heroicons/react/24/outline";
import { handlePayment } from "../lib/handlePayment";
import { fetchWithAuth } from "../lib/fetchWIthAuth";

const paymentMethods = [
  { name: "esewa", color: "bg-green-500" },
  { name: "Khalti", color: "bg-purple-500" },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
  tap: { scale: 0.95, transition: { duration: 0.1 } },
  hover: { scale: 1.02, transition: { duration: 0.2 } },
};

function Payment({
  contractId,
  userId,
}: {
  contractId: string;
  userId: string;
}) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { push } = useRouter();
  const pathname = usePathname();
  const [billDetails, setBillDetails] = useState({
    basePrice: 0,
    serviceCharge: 0,
    tax: 0,
    total: 0,
  });

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetchWithAuth(
          `/api/fetch-contracts?contractId=${contractId}&clientId=${userId}`
        );
        const { data } = await response.json();
        const price = data.price;

        // Calculate service charge (3%)
        const serviceCharge = price * 0.03;
        // Calculate tax (13% VAT for example)
        const tax = price * 0.13;
        // Calculate total
        const total = price + serviceCharge + tax;

        setBillDetails({
          basePrice: price,
          serviceCharge,
          tax,
          total,
        });
      } catch (error) {
        console.error("Error fetching price:", error);
      }
    };

    fetchPrice();
  }, [contractId, userId]);

  const proceedPayment = async (method: string) => {
    setIsLoading(true);
    setError(null);

    await handlePayment(contractId, method, (errorMessage) => {
      setError(errorMessage);
      setIsLoading(false);
    });

    // Note: For eSewa, the page will redirect; no need to set loading false here
    // For Khalti, add logic to reset loading if no redirect occurs
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full max-w-md mx-auto p-4"
    >
      <div className="bg-white shadow-lg rounded-xl p-6 w-full relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold">Billing Details</h2>
          <p className="text-gray-500 mt-2">Review your payment information</p>
        </motion.div>

        {/* Billing Section */}
        <motion.div
          className="mt-4 border border-gray-200 rounded-lg p-4"
          variants={itemVariants}
        >
          <div className="flex items-center mb-2">
            <ReceiptPercentIcon className="mr-2 text-blue-500 w-5 h-5" />
            <h3 className="font-medium">Bill Summary</h3>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-1">
              <span className="text-gray-600">Base Price</span>
              <span className="font-medium">
                {formatCurrency(billDetails.basePrice)}
              </span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-gray-600">Service Charge (3%)</span>
              <span className="font-medium">
                {formatCurrency(billDetails.serviceCharge)}
              </span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-gray-600">Tax (13%)</span>
              <span className="font-medium">
                {formatCurrency(billDetails.tax)}
              </span>
            </div>

            <div className="border-t border-gray-200 mt-2 pt-2">
              <div className="flex justify-between font-semibold">
                <span>Total Amount</span>
                <motion.span
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-blue-600"
                >
                  {formatCurrency(billDetails.total)}
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6"
        >
          <h3 className="font-medium flex items-center">
            <CreditCardIcon className="mr-2 text-blue-500 w-5 h-5" />
            Choose Payment Method
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            Select your preferred payment option
          </p>
        </motion.div>

        <div className="grid gap-4 mt-4">
          <AnimatePresence mode="sync">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={method.name}
                variants={itemVariants}
                custom={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  className={`w-full flex items-center px-4 py-2 border rounded-lg transition-all duration-300 text-left font-medium shadow-sm relative overflow-hidden ${
                    selectedMethod === method.name
                      ? "border-2 bg-gray-100 border-blue-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedMethod(method.name)}
                >
                  <motion.div
                    className={`mr-2 h-4 w-4 rounded-full ${method.color}`}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  />
                  {method.name}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-6">
          <AnimatePresence mode="sync">
            {selectedMethod && (
              <motion.div
                className="w-full"
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover="hover"
                whileTap="tap"
              >
                <button
                  className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium relative overflow-hidden"
                  onClick={() => proceedPayment(selectedMethod)}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    Pay {formatCurrency(billDetails.total)} with{" "}
                    {selectedMethod}
                  </motion.span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export { Payment };
