import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  email: "",
  username: "",
  auth: false,
  isTailor: false,
  profileImage: null,
  location: null, // Initially null, can be updated later
  phoneNumber: null, // Initially null, can be updated later
  address: null, // Initially null, can be updated later
  availabilityTimeFrom: null, // Initially null, can be updated later
  availabilityTimeTo: null, // Initially null, can be updated later
};

console.log("Initial state:", initialState);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (action.payload) {
        const { _id, email, username, auth, isTailor, profileImage, location, phoneNumber, address, availabilityTimeFrom, availabilityTimeTo } = action.payload;
        console.log("setUser payload:", action.payload);

        state._id = _id !== undefined ? _id : state._id;
        state.email = email !== undefined ? email : state.email;
        state.username = username !== undefined ? username : state.username;
        state.auth = auth !== undefined ? auth : state.auth;
        state.isTailor = isTailor !== undefined ? isTailor : state.isTailor;
        state.profileImage = profileImage !== undefined ? profileImage : state.profileImage;
        state.location = location !== undefined ? location : state.location;
        state.phoneNumber = phoneNumber !== undefined ? phoneNumber : state.phoneNumber;
        state.address = address !== undefined ? address : state.address;
        state.availabilityTimeFrom = availabilityTimeFrom !== undefined ? availabilityTimeFrom : state.availabilityTimeFrom;
        state.availabilityTimeTo = availabilityTimeTo !== undefined ? availabilityTimeTo : state.availabilityTimeTo;
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
      state.location = null;
      state.phoneNumber = null;
      state.address = null;
      state.availabilityTimeFrom = null;
      state.availabilityTimeTo = null;
    },

    updateProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },

    updateLocation: (state, action) => {
      state.location = action.payload;
    },

    updateUserDetails: (state, action) => {
      const { phoneNumber, address, availabilityTimeFrom, availabilityTimeTo } = action.payload;
      state.phoneNumber = phoneNumber !== undefined ? phoneNumber : state.phoneNumber;
      state.address = address !== undefined ? address : state.address;
      state.availabilityTimeFrom = availabilityTimeFrom !== undefined ? availabilityTimeFrom : state.availabilityTimeFrom;
      state.availabilityTimeTo = availabilityTimeTo !== undefined ? availabilityTimeTo : state.availabilityTimeTo;
    }
  },
});

export const { setUser, resetUser, updateProfileImage, updateLocation, updateUserDetails } = userSlice.actions;
export default userSlice.reducer;
