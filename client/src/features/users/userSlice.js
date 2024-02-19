import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, fetchCurrUser } from "./userThunks";

const initialState = {
  users: [],
  currentUser: null,
  status: "idle",
  error: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id,
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    setCurrentUser: (state, action) => {
      // New reducer
      state.currentUser = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCurrUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      });
  },
});

export const { addUser, updateUser, setCurrentUser } = userSlice.actions;

export default userSlice.reducer;

export const selectAllUsers = (state) => state.users.users;
export const selectCurrentUser = (state) => state.users.currentUser;

export const selectUserById = (state, userId) =>
  state.users.users.find((user) => user._id === userId);
