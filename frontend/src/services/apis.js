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

export const chatEndpoints = {
    GET_ALL_CLIENTS_API : BASE_URL + "/message/get-clients",
    GET_INITIAL_CONTACTS_ROUTE: BASE_URL + "/message/get-initial-contacts/",
    GET_MESSAGES_ROUTE: BASE_URL + "/message/get-messages",
    ADD_MESSAGE_ROUTE: BASE_URL + "/message/add-message",
    ADD_IMAGE_MESSAGE_ROUTE: BASE_URL + "/message/add-image-message",
}

export const milestoneEndpoints = {
    GET_ALL_MILESTONES: BASE_URL + "/milestone/get-all-milestones",
    ADD_MILESTONE: BASE_URL + "/milestone/add-milestone",
    COMPLETE_MILESTONE: BASE_URL + "/milestone/complete-milestone",
    ACCEPT_MILESTONE :  BASE_URL + "/milestone/accept-milestone",
}



export const analyticsEndpoints = {
    GET_ANALYTICS_MONTHLY_INCOME: BASE_URL + "/analytics/monthly-income",
    GET_ANALYTICS_CASE_STATUS: BASE_URL + "/analytics/case-status",
    GET_ANALYTICS_CASE_STATUS_BY_MONTH: BASE_URL + "/analytics/monthly-case-status",
}