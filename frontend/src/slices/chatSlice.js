import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages : [],
    socket : null,
    demo : false,
    messageSearch: false,
    userContacts : [],
    onlineUsers: [],

    filteredContacts: [],
    contactSearch: "", // Adding this to track search input


    contactsPage: false,
    currentChatUser: undefined,
    
    videoCall: undefined,
    voiceCall: undefined,
    incomingVoiceCall: undefined,
    incomingVideoCall: undefined,
    endCall: undefined,
}

const chatSlice = createSlice({
    name: "chat",
    initialState: initialState,
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        setSocket: (state, action) => {
            state.socket = action.payload;
        },
        addMessage: (state, action) => {
            state.messages = [...state.messages, action.payload];
        },
        setDemo: (state, action) => {
            state.demo = action.payload
        },
        setMessageSearch: (state, action) => {
            state.messageSearch = !state.messageSearch
        },
        setUserContacts: (state, action) => {
            state.userContacts = action.payload
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload
        },
        setContactSearch: (state, action) => {
            state.contactSearch = action.payload;
            state.filteredContacts = state.userContacts.filter((contact) =>
                contact._doc.name.toLowerCase().includes(action.payload.toLowerCase())
            );
        },


        setContactsPage: (state, action) => {
            state.contactsPage = action.payload
        },
        setCurrentChatUser: (state, action) => {
            state.currentChatUser = action.payload
        },
        setVideoCall: (state, action) => {
            state.videoCall = action.payload
        },
        setVoiceCall: (state, action) => {
            state.voiceCall = action.payload
        },
        setIncomingVoiceCall: (state, action) => {
            state.incomingVoiceCall = action.payload
        },
        setIncomingVideoCall: (state, action) => {
            state.incomingVideoCall = action.payload
        },
        setEndCall: (state) => {
            console.log("end call");
            state.voiceCall = undefined;
            state.videoCall = undefined;
            state.incomingVoiceCall = undefined;
            state.incomingVideoCall = undefined;
        },
        setExitChat: (state) => {
            state.currentChatUser = undefined;
        }
        
    }
})

export const { setMessages, setSocket, addMessage, setDemo, setMessageSearch, setUserContacts, setOnlineUsers,setContactSearch , setContactsPage, setCurrentChatUser, setVideoCall,
    setVoiceCall,
    setIncomingVoiceCall,
    setIncomingVideoCall,
    setEndCall, setExitChat } = chatSlice.actions
export default chatSlice.reducer