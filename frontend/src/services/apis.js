const BASE_URL = import.meta.env.VITE_BASE_URL;


//auth endpoints 
export const endpoints = {
    LOGIN_API: BASE_URL + "/auth/login",
    SIGNUP_API: BASE_URL + "/auth/signup",
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    GOOGLE_AUTH_API: BASE_URL+"/auth/google",

}

export const caseEndpoints = {
    CREATE_CASE_API: BASE_URL + "/case/createCase",
    IS_CASE_CREATED: BASE_URL + "/case/isCaseCreated",
    ACCEPT_CASE_API: BASE_URL + "/case/acceptCase",
    REJECT_CASE_API: BASE_URL + "/case/rejectCase",
    GET_ALL_CASES_WITH_CLIENTS_API: BASE_URL + "/case/getAllCasesWithClients",
    GET_ALL_PENDING_CASES_API: BASE_URL + "/case/getAllPendingCases",
}

export const profileEndpoints = {
    GET_MATCHED_PROVIDERS_API : BASE_URL + "/profile/getMatchedProviders"
}

