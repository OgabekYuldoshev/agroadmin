// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "utils";
import { toast } from "react-toastify";

export const getPartner = createAsyncThunk(
  "app/getPartner",
  async (undefined, { rejectWithValue }) => {
    try {
      const response = await http.get("/admin/partners");
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.join(', '));
    }
  }
);

export const createPartner = createAsyncThunk(
  "app/createPartner",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await http.post("/admin/partners", data, {
        "Content-Type": "multipart/form-data",
      });
      dispatch(getPartner());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.join(', '));
    }
  }
);

export const deletePartner = createAsyncThunk("app/deletePartner", async (id, { dispatch }) => {
  await http.delete(`/admin/partners/${id}`);
  dispatch(getPartner());
});

export const updatePartner = createAsyncThunk(
  "app/updatePartner",
  async ({ id, value }, { dispatch, rejectWithValue }) => {
    try {
      const response = await http.put(`/admin/partners/${id}`, value, {
        "Content-Type": "multipart/form-data",
      });
      dispatch(getPartner());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.join(', '));
    }
  }
);

export const partnerSlice = createSlice({
  name: "partner",
  initialState: {
    partners: [],
    isLoading: false,
  },
  reducers: {
    // handleSearchQuery: (state, action) => {
    //     state.query = action.payload
    // }
  },
  extraReducers: {
    [getPartner.pending]: (state) => {
      state.isLoading = true;
    },
    [getPartner.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.partners = action?.payload;
    },
    [getPartner.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
    [createPartner.fulfilled]: () => {
      toast.success("Partner yaratildi!");
    },
    [createPartner.rejected]: (undefined, action) => {
      toast.error(action.payload);
    },
    [deletePartner.fulfilled]: () => {
      toast.success("Partner o'chirildi!");
    },
    [deletePartner.rejected]: (undefined, action) => {
      toast.error(action.payload);
    },
    [updatePartner.fulfilled]: () => {
      toast.success("Partner o'zgartirildi!");
    },
    [updatePartner.rejected]: (undefined, action) => {
      toast.error(action.payload);
    },
  },
  // extraReducers: builder => {
  //     builder
  //         .addCase(getCategory.fulfilled, (state, action) => {
  //             state.categories = action?.payload
  //         })
  // }
});

export const { } = partnerSlice.actions;

export default partnerSlice.reducer;
