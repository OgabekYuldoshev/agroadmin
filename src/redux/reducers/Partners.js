// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "utils";
import { toast } from "react-toastify";

export const getPartner = createAsyncThunk("app/getPartner", async () => {
  const response = await http.get("/admin/partners");
  return response.data?.data;
});

export const createPartner = createAsyncThunk("app/createPartner", async (data, { dispatch }) => {
  const response = await http.post("/admin/partners", data, {
    "Content-Type": "multipart/form-data",
  });
  if (response.status === 201) dispatch(getPartner());
  return response.data;
});

export const deletePartner = createAsyncThunk("app/deletePartner", async (id, { dispatch }) => {
  const response = await http.delete(`/admin/partners/${id}`);
  if (response.status === 200) dispatch(getPartner());
});

export const updatePartner = createAsyncThunk(
  "app/updatePartner",
  async ({ id, value }, { dispatch }) => {
    const response = await http.put(`/admin/partners/${id}`, value);
    if (response.status === 200) dispatch(getPartner());
    return response.data;
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
    [getPartner.rejected]: (state) => {
      state.isLoading = false;
      toast.error("Serverda xatolik!");
    },
    [createPartner.fulfilled]: () => {
      toast.success("Partner yaratildi!");
    },
    [createPartner.rejected]: () => {
      toast.error("Serverda xatolik!");
    },
    [deletePartner.fulfilled]: () => {
      toast.success("Partner o'chirildi!");
    },
    [deletePartner.rejected]: () => {
      toast.error("Serverda xatolik!");
    },
    [updatePartner.fulfilled]: () => {
      toast.error("Partner o'zgartirildi!");
    },
    [updatePartner.rejected]: () => {
      toast.error("Serverda xatolik!");
    },
  },
  // extraReducers: builder => {
  //     builder
  //         .addCase(getCategory.fulfilled, (state, action) => {
  //             state.categories = action?.payload
  //         })
  // }
});

export const {} = partnerSlice.actions;

export default partnerSlice.reducer;
