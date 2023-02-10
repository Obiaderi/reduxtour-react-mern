import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

// Create Login Action
export const login = createAsyncThunk(
  "auth/login",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signIn(formValue);
      toast.success("Login Successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Create Register Action
export const register = createAsyncThunk(
  "auth/register",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signUp(formValue);
      toast.success("register Successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Create Google Signin Action
export const googleSignIn = createAsyncThunk(
  "auth/googleSignIn",
  async ({ result, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signUp(result);
      toast.success("Google Sign in Successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    error: "",
    loading: false,
  },

  // To persist Data
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setLogout: (state) => {
      state.user = null;
      localStorage.clear();
    },
  },

  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload.message;
    });

    // Register
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    });

    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload.message;
    });

    // Google signIn
    builder.addCase(googleSignIn.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(googleSignIn.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    });

    builder.addCase(googleSignIn.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload.message;
    });
  },
});

export default authSlice.reducer;
export const { setUser, setLogout } = authSlice.actions;
