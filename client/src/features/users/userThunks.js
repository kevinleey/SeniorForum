import { createAsyncThunk } from "@reduxjs/toolkit";

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

export { fetchUsers, fetchUser };
