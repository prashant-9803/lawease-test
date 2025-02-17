import { toast } from "sonner";
import { apiConnector } from "../apiConnector";
import { caseEndpoints } from "../apis";

const {
    CREATE_CASE_API
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