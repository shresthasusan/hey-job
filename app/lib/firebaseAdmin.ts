import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

// Construct the ServiceAccount object
const serviceAccount: ServiceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    privateKey: (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
};

// Initialize Firebase Admin SDK
const firebaseAdminApp = initializeApp({
    credential: cert(serviceAccount),
});

// Export the admin authentication instance
export const adminAuth = getAuth(firebaseAdminApp);
