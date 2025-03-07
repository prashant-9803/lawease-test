import { chatEndpoints } from "@/services/apis";
import { toast } from "sonner";
import { apiConnector } from "../apiConnector";

const { GET_ALL_CLIENTS_API, GET_INITIAL_CONTACTS_ROUTE, GET_MESSAGES_ROUTE,ADD_MESSAGE_ROUTE,ADD_IMAGE_MESSAGE_ROUTE } =
  chatEndpoints;

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

    console.log(
      "initial contacts route: ",
      GET_INITIAL_CONTACTS_ROUTE + userId
    );

    const res = await apiConnector(
      "GET",
      GET_INITIAL_CONTACTS_ROUTE + userId,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
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
  } catch (error) {
    console.log("ERROR WHILE GETTING CONTACTS", error);
    toast.error("Error While Getting Contacts");
  } finally {
    toast.dismiss(toastId);
  }
};

export const getMessages = async (token, from, to) => {
  const toastId = toast.loading("Fetching Messages...");
  try {
    console.log("token from messages: ", token);
    console.log("from from messages: ", from);
    console.log("to from messages: ", to);

    const res = await apiConnector(
      "GET",
      GET_MESSAGES_ROUTE + "/" + from + "/" + to,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!res?.data?.success) {
      throw new Error(res?.data?.message || "Could not fetch messages");
    }

    const result = res?.data;

    console.log("Messages fetched successfully:", result);

    return result.messages;
  } catch (error) {
    console.log("ERROR WHILE GETTING MESSAGES", error);
    toast.error("Error While Getting Messages");
  } finally {
    toast.dismiss(toastId);
  }
};

export const sendMessage = async (token, data) => {
  const toastId = toast.loading("Sending Message...");
  try {
    const { from, to, message } = data;
    const res = await apiConnector(
      "POST",
      ADD_MESSAGE_ROUTE,
      { from, to, message },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!res?.data?.success) {
      throw new Error(res?.data?.message || "Could not send message");
    }

    return res?.data;

  } 
  catch (error) {
    console.log("ERROR WHILE SENDING MESSAGE", error);
    toast.error("Error While Sending Message");
  } 
  finally {
    toast.dismiss(toastId);
  }
};

export const sendImageMessage = async (token, selectedImage,from, to ) => {
  const toastId = toast.loading("Sending File...");
    try {
      const file = selectedImage;

      let formData = new FormData();
      formData.append("file", file);

      const response = await apiConnector(
        "POST",
        ADD_IMAGE_MESSAGE_ROUTE,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },

        {
          from: from,
          to: to,
        }
      );

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Could not send message");
      }

      return response?.data;

     
    } catch (error) {
      console.log(error);
    }
    finally {
      toast.dismiss(toastId);
    }
}