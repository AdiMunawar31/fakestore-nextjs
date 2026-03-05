import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "@/types/user";
import { authService } from "@/services/auth.service";

const initialState: AuthState = {
  token: null,
  user: null,
  isLoading: false,
  error: null,
};

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (
    credentials: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await authService.login(credentials);
      if (typeof window !== "undefined") {
        document.cookie = `token=${data.token}; path=/; max-age=86400`;
      }
      return data.token;
    } catch (err: unknown) {
      return rejectWithValue((err as Error).message || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      if (typeof window !== "undefined") {
        document.cookie = "token=; path=/; max-age=0";
      }
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        console.log("fulfilled : ", { state, action });
        state.isLoading = false;
        state.token = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "username or password is incorrect";
      });
  },
});

export const { logout, setToken, clearError } = authSlice.actions;
export default authSlice.reducer;
