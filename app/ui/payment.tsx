"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const paymentMethods = [
    { name: "eSewa", color: "bg-green-500" },
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

function Payment() {
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const { push } = useRouter();

    const handlePayment = (method: string) => {
        switch (method) {
            case "eSewa":
                push("/esewa");
                break;
            case "Khalti":
                push("/khalti");
                break;
        }
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
                    <h2 className="text-2xl font-semibold">Choose Payment Method</h2>
                    <p className="text-gray-500 mt-2">Select your preferred payment option</p>
                </motion.div>

                <div className="grid gap-4 mt-4">
                    <AnimatePresence mode="wait">
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
                                        selectedMethod === method.name ? "border-2 bg-gray-100 border-blue-500" : "border-gray-300"
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
                    <AnimatePresence mode="wait">
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
                                    onClick={() => handlePayment(selectedMethod)}
                                >
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        Pay with {selectedMethod}
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
