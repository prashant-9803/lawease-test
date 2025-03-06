import { chatEndpoints } from "@/services/apis";
import { toast } from "sonner";
import { apiConnector } from "../apiConnector";

const { GET_ALL_CLIENTS_API, GET_INITIAL_CONTACTS_ROUTE } = chatEndpoints;

export const getContacts = async (token) => {
  const toastId = toast.loading("Fetching Contacts...");
  try {
    console.log("token from service: ", token);

    const res = await apiConnector("GET", GET_ALL_CLIENTS_API, null, {
      Authorization: `Bearer ${token}`,
    });

    console.log("res from service: ", res?.data?.users);

    if (!res?.data?.success) {
      throw new Error(res?.data?.message || "Could not fetch pending cases");
    }

    const result = res?.data?.users;

    console.log("Contacts fetched successfully:", result);

    return result;
  } catch (error) {
    console.log("ERROR WHILE GETTING CONTACTS", error);
    toast.error("Error While Getting Contacts");
  } finally {
    toast.dismiss(toastId);
  }
};

export const getInitialContacts = async (token, userId) => {
  const toastId = toast.loading("Fetching Contacts...");
  try {
    console.log("token from initial contacts: ", token);
    console.log("user id from initial contacts: ", userId);

    console.log("initial contacts route: ", GET_INITIAL_CONTACTS_ROUTE + userId);

    const res = await apiConnector(
      "GET",
      GET_INITIAL_CONTACTS_ROUTE + userId,
      null,
      {
        Authorization: `Bearer ${token}`,
      },
      
    );

    console.log("res from initial contacts: ", res?.data?.users);
    console.log("res from online contacts: ", res?.data?.onlineUsers);

    if (!res?.data?.success) {
      throw new Error(res?.data?.message || "Could not fetch pending cases");
    }

    const users = res?.data?.users;
    const onlineUsers = res?.data?.onlineUsers;

    const result = { users, onlineUsers };

    console.log("Contacts fetched successfully:", result);

    return result;


  } 
  catch (error) {
    console.log("ERROR WHILE GETTING CONTACTS", error);
    toast.error("Error While Getting Contacts");
  } finally {
    toast.dismiss(toastId);
  }
};
