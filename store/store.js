import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Import the user reducer

const store = configureStore({
  reducer: { user: userReducer }, // Pass user reducer with key "user"
});

export default store;
