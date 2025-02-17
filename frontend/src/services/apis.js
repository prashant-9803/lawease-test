const BASE_URL = import.meta.env.VITE_BASE_URL;


//auth endpoints 
export const endpoints = {
    LOGIN_API: BASE_URL + "/auth/login",
    SIGNUP_API: BASE_URL + "/auth/signup",
    SENDOTP_API: BASE_URL + "/auth/sendotp",
}

export const caseEndpoints = {
    CREATE_CASE_API: BASE_URL + "/case/createCase",
    IS_CASE_CREATED: BASE_URL + "/case/isCaseCreated",
    ACCEPT_CASE_API: BASE_URL + "/case/acceptCase",
}

export const profileEndpoints = {
    GET_MATCHED_PROVIDERS_API : BASE_URL + "/profile/getMatchedProviders"
}

