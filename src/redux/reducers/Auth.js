// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "utils";
import { toast } from "react-toastify";

export const loadUser = createAsyncThunk("auth/getProfile", async (undefined, { rejectWithValue }) => {
  try {
    const response = await http.get("/admin/admin-profile");
    if (response?.data?.data) {
      return {
        isAuth: true,
        user: response.data?.data,
      };
    } else {
      return rejectWithValue("Malumot topilmadi!")
    }
  } catch (error) {
    return rejectWithValue(error.response?.data?.error?.join(', '))
  }
});

export const login = createAsyncThunk("auth/Login", async (data, { rejectWithValue }) => {
  try {
    const response = await http.post("/admin/login", data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error?.join(', '));
  }
});

export const getUsers = createAsyncThunk("auth/getUsers", async (data, { rejectWithValue }) => {
  try {
    const response = await http.get("/admin/users");
    return response.data?.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error?.join(', '));
  }
});

const getToken = () => {
  return localStorage.getItem("Qaccess_Token");
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: {},
    users: [],
    isAuth: false,
    isLoading: false,
    accessToken: getToken(),
  },
  reducers: {
    handleLogout: (state) => {
      state.userData = {};
      state.accessToken = "";
      state.isAuth = false;
      localStorage.removeItem("userData");
      localStorage.removeItem("Qaccess_Token");
      toast.success("Tizimdan muvofaqiyatli chiqdingiz!");
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.accessToken = action?.payload?.access_token;
      state.isLoading = false;
      localStorage.setItem("Qaccess_Token", action.payload.access_token);
      toast.success("Tizimga muvofaqiyatli kirdingiz!");
    },
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
    [loadUser.fulfilled]: (state, action) => {
      state.userData = action?.payload?.user;
      state.isAuth = action?.payload?.isAuth;
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
    [loadUser.rejected]: (state, action) => {
      toast.error(action.payload)
      state.isAuth = false;
      state.userData = {};
      state.accessToken = "";
      localStorage.removeItem("userData");
      localStorage.removeItem("Qaccess_Token");
    },
    [getUsers.fulfilled]: (state, action) => {
      state.users = action?.payload.data;
    },
    [getUsers.rejected]: (undefined, action) => {
      toast.error(action.payload);
    },
  },
  // extraReducers: builder => {
  //   builder
  //     .addCase(login.fulfilled, (state, action) => {
  //       state.accessToken = action?.payload?.access_token
  //       localStorage.setItem('accessToken', action.payload.access_token)
  //     })
  //     .addCase(loadUser.fulfilled, (state, action) => {
  //       state.userData = action?.payload?.user
  //       state.isAuth = action?.payload?.isAuth
  //       localStorage.setItem('userData', JSON.stringify(action.payload))
  //     })
  // }
});

export const { handleLogout } = authSlice.actions;

export default authSlice.reducer;
