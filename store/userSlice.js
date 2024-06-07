import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  email: "",
  username: "",
  auth: false,
  isTailor: false,
  profileImage: null, // Initially null
};

console.log("Initial state:", initialState);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (action.payload) {
        const { _id, email, username, auth, isTailor, profileImage } = action.payload;
        console.log("setUser payload:", action.payload);

        state._id = _id !== undefined ? _id : state._id;
        state.email = email !== undefined ? email : state.email;
        state.username = username !== undefined ? username : state.username;
        state.auth = auth !== undefined ? auth : state.auth;
        state.isTailor = isTailor !== undefined ? isTailor : state.isTailor;
        state.profileImage = profileImage !== undefined ? profileImage : state.profileImage;
      } else {
        console.log("setUser called with no payload");
      }
    },
    
    resetUser: (state) => {
      state._id = "";
      state.email = "";
      state.username = "";
      state.auth = false;
      state.isTailor = false;
      state.profileImage = null;
    },

    updateProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
  },
});

export const { setUser, resetUser, updateProfileImage } = userSlice.actions;
export default userSlice.reducer;
