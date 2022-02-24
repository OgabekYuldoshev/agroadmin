// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "utils";
import { toast } from "react-toastify";

export const getSiteAddress = createAsyncThunk("app/getSiteAddress", async () => {
  const response = await http.get("/admin/site-cantacts");
  return response.data?.data;
});

export const createAddress = createAsyncThunk("app/createAddress", async (data, { dispatch }) => {
  const response = await http.post("/admin/site-cantacts", data);
  dispatch(getSiteAddress());
  return response.data?.data;
});
export const updateAddress = createAsyncThunk(
  "app/updateAddress",
  async ({ id, data }, { dispatch }) => {
    const response = await http.put(`/admin/site-cantacts/${id}`, data);
    dispatch(getSiteAddress());
    return response.data?.data;
  }
);

export const deleteAddress = createAsyncThunk("app/updateAddress", async (id, { dispatch }) => {
  const response = await http.delete(`/admin/site-cantacts/${id}`);
  dispatch(getSiteAddress());
  return response.data?.data;
});

export const getOrders = createAsyncThunk("app/getOrders", async () => {
  const response = await http.get("/admin/orders");
  return response.data?.data;
});

export const getOrdersDetails = createAsyncThunk("app/getOrdersDetails", async (id) => {
  const response = await http.get(`/admin/orders-show/${id}`);
  return response.data?.data;
});

export const appSlice = createSlice({
  name: "app",
  initialState: {
    address: [],
    orders: [],
    orderDetails: []
  },
  reducers: {},
  extraReducers: {
    [getSiteAddress.fulfilled]: (state, action) => {
      state.address = action.payload;
    },
    [getSiteAddress.rejected]: (undefined, action) => {
      toast.error(action.payload);
    },
    [createAddress.fulfilled]: () => {
      toast.success("Yang manzil yaratildi!");
    },
    [createAddress.rejected]: (undefined, action) => {
      toast.error(action.payload);
    },
    [updateAddress.fulfilled]: () => {
      toast.success("Manzil yangilandi!");
    },
    [updateAddress.rejected]: (undefined, action) => {
      toast.error(action.payload);
    },
    [deleteAddress.fulfilled]: () => {
      toast.success("Manzil o'chirildi!");
    },
    [deleteAddress.rejected]: (undefined, action) => {
      toast.error(action.payload);
    },
    [getOrders.fulfilled]: (state, action) => {
      state.orders = action.payload;
    },
    [getOrders.rejected]: (undefined, action) => {
      toast.error(action.payload);
    },
    [getOrdersDetails.fulfilled]: (state, action) => {
      state.orderDetails = action.payload;
    },
    [getOrdersDetails.rejected]: (undefined, action) => {
      toast.error(action.payload);
    }
  },
});

export const { } = appSlice.actions;

export default appSlice.reducer;
