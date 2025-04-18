import { toast } from "sonner";
import { apiConnector } from "../apiConnector"
import {  milestoneEndpoints } from "../apis"

const { GET_ALL_MILESTONES } = milestoneEndpoints

export const getAllMilestones = async({token, caseId}) => {

    const toastId = toast.loading("Fetching milestones...");
    try {

        const response = await apiConnector("POST", GET_ALL_MILESTONES,  {caseId}, {
            Authorization: `Bearer ${token}`,
        });

        console.log("respose of getallmilestones: ", response)

        if(!response?.data?.success) {
            throw new Error(response?.data?.message);
        }

        toast.success("Milestones Fetched Successfully");
        return response?.data?.data
    }
    catch(error) {
      console.log("Error in fetching milestone", error)
    }
    finally {
        toast.dismiss(toastId);
    }
  }