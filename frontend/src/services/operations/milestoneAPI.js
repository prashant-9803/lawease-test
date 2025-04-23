import { toast } from "sonner";
import { apiConnector } from "../apiConnector"
import {  milestoneEndpoints } from "../apis"

const { GET_ALL_MILESTONES, ADD_MILESTONE, COMPLETE_MILESTONE, ACCEPT_MILESTONE } = milestoneEndpoints

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


export const addMilestone = async({token, caseId, newMilestone}) => {

    const toastId = toast.loading("Adding milestone...");

    try{
        
        const milestoneToAdd = {
            caseId: caseId,
            title: newMilestone.title,
            description: newMilestone.description,
            payment: Number.parseFloat(newMilestone.payment) || 0,
          }

        const response = await apiConnector("POST", ADD_MILESTONE,  milestoneToAdd, {
            Authorization: `Bearer ${token}`,
        });

        if(!response?.data?.success) {
            throw new Error(response?.data?.message);
        }

        toast.success("Milestone Added Successfully");

        console.log("Response of add milestone: ", response);

        return response?.data?.data 
    }
    catch(error) {
        console.log("Error in adding milestone", error);
    }
    finally {
        toast.dismiss(toastId);
    }
}


export const completeMilestone = async({token, milestoneId}) => {

    const toastId = toast.loading("Completing milestone...");

    try{
        
        const response = await apiConnector("POST", COMPLETE_MILESTONE,  {milestoneId}, {
            Authorization: `Bearer ${token}`,
        });

        if(!response?.data?.success) {
            throw new Error(response?.data?.message);
        }

        toast.success("Milestone Completed Successfully");

        console.log("Response of complete milestone: ", response);

        return response?.data?.data 
    }
    catch(error) {
        console.log("Error in completing milestone", error);
    }
    finally {
        toast.dismiss(toastId);
    }   
}

export const acceptMilestone = async ({token, milestoneId}) => {

    const toastId = toast.loading("Accepting milestone...");
    try {
        console.log("token:", token, "milestone: ", milestoneId)
        const response = await apiConnector("POST", ACCEPT_MILESTONE,  {milestoneId}, {
            Authorization: `Bearer ${token}`,
        });

        console.log(response.data.data)
    }
    catch(error) {
        toast.error(error.message);
        console.log("Error while accepting case: ", error)
    }
    finally{
        toast.dismiss(toastId)
    }
}