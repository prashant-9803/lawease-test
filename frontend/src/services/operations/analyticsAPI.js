import { toast } from "sonner";
import { apiConnector } from "../apiConnector";
import { analyticsEndpoints } from "../apis";

const { GET_ANALYTICS_MONTHLY_INCOME, GET_ANALYTICS_CASE_STATUS_BY_MONTH, GET_ANALYTICS_CASE_STATUS} = analyticsEndpoints

export const getAnalyticsMonthlyIncome = async({token, userId}) => {
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", GET_ANALYTICS_MONTHLY_INCOME, {userId}, {Authorization: `Bearer ${token}`});

        // console.log("service response : ", response.data.data);

        if(!response?.data?.success) {
            throw new Error(response?.data?.message);
        }

        toast.success("Analytics Fetched Successfully");

        return response?.data?.data
    }
    catch(error) {
        console.log("Error while getting analytics monthly income: ", error);
    }
    finally {
        toast.dismiss(toastId);
    }
}

export const getAnalyticsMonthlyCaseStatus = async({token, userId}) => {
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", GET_ANALYTICS_CASE_STATUS_BY_MONTH, {userId}, {Authorization: `Bearer ${token}`});


        if(!response?.data?.success) {
            throw new Error(response?.data?.message);
        }

        toast.success("Analytics Fetched Successfully");

        return response?.data?.data
    }
    catch(error) {
        console.log("Error while getting analytics monthly of case status: ", error);
    }
    finally {
        toast.dismiss(toastId);
    }
}

export const getAnalyticsCaseStatus = async({token, userId}) => {
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", GET_ANALYTICS_CASE_STATUS, {userId}, {Authorization: `Bearer ${token}`});


        if(!response?.data?.success) {
            throw new Error(response?.data?.message);
        }

        toast.success("Analytics Fetched Successfully");

        return response?.data?.data
    }
    catch(error) {
        console.log("Error while getting analytics of case status: ", error);
    }
    finally {
        toast.dismiss(toastId);
    }
}