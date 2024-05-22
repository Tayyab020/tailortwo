import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  email: "",
  username: "",
  auth: false,
};
console.log("initiAL STATE",initialState);
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (action.payload) {
        const { _id, email, username, auth } = action.payload;
    
        state._id = _id;
        state.email = email;
        state.username = username;
        state.auth = auth;
      } else {
        
      }
    },
    
    resetUser: (state) => {
      state._id = "";
      state.email = "";
      state.username = "";
      state.auth = false;
    },
    
  },
  
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
