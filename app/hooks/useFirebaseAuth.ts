import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { authenticateWithFirebase } from "@/app/lib/firebase";
import { fetchWithAuth } from "../lib/fetchWIthAuth";

const useFirebaseAuth = () => {
    const { data: session } = useSession();

    useEffect(() => {
        const fetchFirebaseToken = async () => {
            if (session) {
                try {
                    const res = await fetchWithAuth("/api/firebase-token");
                    const { token } = await res.json();

                    // Authenticate with Firebase using the custom token
                    await authenticateWithFirebase(token);
                } catch (error) {
                    console.error("Error fetching Firebase token:", error);
                }
            }
        };

        fetchFirebaseToken();
    }, [session]);
};

export default useFirebaseAuth;
