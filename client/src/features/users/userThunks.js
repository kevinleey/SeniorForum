import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { setLoading } from "./userSlice";

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

/*const fetchCurrUser = createAsyncThunk(
  "users/fetchCurrUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.get(`/users/me`); // /profile is the route that returns the current user's data.
      return response.data;
    } catch (error) {
        console.log('Error in fetchUser:', error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);*/

const fetchCurrUser = createAsyncThunk(
    "users/fetchCurrUser",
    async (_, thunkAPI) => {
        //const getAccessTokenSilently = thunkAPI.getState().auth.getAccessTokenSilently;
        const { user: auth0User } = useAuth0();
        const userID = auth0User.sub
        try {
            const response = await fetch(`http://localhost:3001/users/me/${userID}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log('Error in fetchUser:', error);
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    },
);

export { fetchUsers, fetchCurrUser, fetchUser };
