import { toast } from "sonner";
import { apiConnector } from "../apiConnector";
import { caseEndpoints } from "../apis";

const {
    CREATE_CASE_API,
    GET_ALL_CASES_WITH_CLIENTS_API,
    GET_ALL_PENDING_CASES_API,
    ACCEPT_CASE_API,
    REJECT_CASE_API
} = caseEndpoints;


export const createCase = async(token, formData, navigate) => {
    const toastId = toast.loading("Loading..."); 
    
    try {
        const response = await apiConnector("POST", CREATE_CASE_API, formData, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          });

        if(!response?.data?.success) {
            throw new Error(response?.data?.message);
        }

        console.log("respponse from backend to services: ", response)

        toast.success("Case Created Successfully");
    }
    catch(error) {
        console.log("ERROR WHILE CREATE CASE API..." , error);
        toast.error("Error While Creating Case")
    }
    finally {
        navigate("/dashboard");
        toast.dismiss(toastId);
    }
}


export const getAllCasesWithClients = async (token) => {
    const toastId = toast.loading("Loading...");
    let result = [];
    
    try {
        // Make sure the token is being sent correctly
        const res = await apiConnector(
            "GET", 
            GET_ALL_CASES_WITH_CLIENTS_API, 
            null, 
            {
                Authorization: `Bearer ${token}`
            }
        );

        if (!res?.data?.success) {
            throw new Error(res?.data?.message || "Could not fetch cases with clients");
        }

        result = res?.data?.data;
        console.log("Cases fetched successfully:", result);
    } catch (error) {
        console.log("GET ALL CASES WITH CLIENTS ERROR", error);
        toast.error("Could Not Fetch Cases with Clients");
    } finally {
        toast.dismiss(toastId);
    }

    return result;
};

// to get pending cases
export const getAllPendingCases = async (token) => {
    const toastId = toast.loading("Loading pending cases...");
    let result = [];
    
    try {
        const res = await apiConnector(
            "GET", 
            GET_ALL_PENDING_CASES_API, 
            null, 
            {
                Authorization: `Bearer ${token}`
            }
        );

        if (!res?.data?.success) {
            throw new Error(res?.data?.message || "Could not fetch pending cases");
        }

        result = res?.data?.data;
        console.log("Pending cases fetched successfully:", result);
    } catch (error) {
        console.log("GET ALL PENDING CASES ERROR", error);
        toast.error("Could not fetch pending cases");
    } finally {
        toast.dismiss(toastId);
    }

    return result;
};

// Function to accept a case
export const acceptCase = async (token, caseId) => {
    const toastId = toast.loading("Accepting case...");
    
    try {
        const res = await apiConnector(
            "POST", 
            ACCEPT_CASE_API, 
            { caseId }, 
            {
                Authorization: `Bearer ${token}`
            }
        );

        if (!res?.data?.success) {
            throw new Error(res?.data?.message || "Could not accept case");
        }

        toast.success("Case accepted successfully");
        return true;
    } catch (error) {
        console.log("ACCEPT CASE ERROR", error);
        toast.error("Failed to accept case");
        return false;
    } finally {
        toast.dismiss(toastId);
    }
};


// Function to reject a case
export const rejectCase = async (token, caseId) => {
    const toastId = toast.loading("Rejecting case...");
    
    try {
        const res = await apiConnector(
            "POST", 
            REJECT_CASE_API, 
            { caseId }, 
            {
                Authorization: `Bearer ${token}`
            }
        );

        if (!res?.data?.success) {
            throw new Error(res?.data?.message || "Could not reject case");
        }

        toast.success("Case rejected successfully");
        return true;
    } catch (error) {
        console.log("REJECT CASE ERROR", error);
        toast.error("Failed to reject case");
        return false;
    } finally {
        toast.dismiss(toastId);
    }
};