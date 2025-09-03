import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  username: string;
}

const initialState = {
  username: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState, 
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    deleteUsername: (state) => {
      state.username = "";
    },
  },
});

// deleteUsername'i de export et
export const { setUsername, deleteUsername } = userSlice.actions;

export default userSlice.reducer;
