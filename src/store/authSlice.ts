import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import bcrypt from "bcryptjs";

interface AuthState {
  isAuthenticated: boolean;
  user: { email: string; username: string } | null;
}

// Utility function to load user from localStorage
const loadUserFromLocalStorage = (): AuthState => {
  const user = localStorage.getItem("user");
  return {
    isAuthenticated: !!user,
    user: user ? JSON.parse(user) : null,
  };
};

const initialState: AuthState = loadUserFromLocalStorage();

// Utility function to save users to localStorage
const saveUserToLocalStorage = (user: { email: string; username: string; password: string }) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("user", JSON.stringify({ email: user.email, username: user.username }));
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; username: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("user");
    },
    signup: (state, action: PayloadAction<{ email: string; username: string; password: string }>) => {
      const hashedPassword = bcrypt.hashSync(action.payload.password, 10);
      const user = { ...action.payload, password: hashedPassword };
      state.isAuthenticated = true;
      state.user = { email: user.email, username: user.username };
      saveUserToLocalStorage(user);
    },
  },
});

export const { login, logout, signup } = authSlice.actions;

export default authSlice.reducer;
