import { setLoading } from "@/slices/authSlice"
import { toast } from "sonner"
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../apis"

const {
    GET_MATCHED_PROVIDERS_API
} = profileEndpoints

export const getMatchedProviders = async() => {
    const toastId = toast.loading("Loading...");
    let result = [];

    try {
        // Await the API response
        let res = await apiConnector("GET", GET_MATCHED_PROVIDERS_API, null, null, null);

        if (!res?.data?.success) {
            throw new Error("Could not fetch matched providers");
        }

        result = res?.data?.providers;
    } catch (error) {
        console.log("GET MATCHED PROVIDERS ERROR", error);
        toast.error("Could Not Fetch Matched Providers");
    } finally {
        toast.dismiss(toastId);  // Dismiss the loading toast after API call completes
    }

    console.log("printing result: ", result)
    return result;
};

