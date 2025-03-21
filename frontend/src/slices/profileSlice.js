import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: (() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                return JSON.parse(storedUser);
            } catch (error) {
                console.error("Error parsing user data from localStorage:", error);
                return null;
            }
        }
        return null;
    })(),
    loading: false
}

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setUser(state, value){
            state.user = value.payload
        },
        setLoading(state, value) {
            state.loading = value.payload
        }
    }
})

export const {setUser, setLoading} = profileSlice.actions
export default profileSlice.reducer