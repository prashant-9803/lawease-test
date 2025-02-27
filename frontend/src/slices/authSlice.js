import  { createSlice } from "@reduxjs/toolkit"

const initialState = {
  signupData: null,
  loading: false,
  token: (() => {
    const token = localStorage.getItem("token");
    try {
      return token ? JSON.parse(token) : null;
    } catch (e) {
      console.error("Invalid token format:", e);
      return null; // Return null if parsing fails
    }
  })(),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
      localStorage.setItem("token", JSON.stringify(value.payload));
    },
  },
});

export const { setSignupData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;
