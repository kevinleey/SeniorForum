import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUser = createAsyncThunk("users/fetchUser", async (userId) => {
  const response = await fetch(`/users/${userId}`);
  const data = await response.json();
  return data;
});

const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("/users");
  const data = await response.json();
  return data;
});

/*const fetchCurrUser = createAsyncThunk("users/fetchCurrUser", async () => {
  const response = await fetch(`/users/current`);
  const data = await response.json();
  return data;
});*/

const fetchCurrUser = createAsyncThunk(
  "users/fetchCurrUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.get(`/profile`); // /profile is the route that returns the current user's data.
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export { fetchUsers, fetchCurrUser, fetchUser };
