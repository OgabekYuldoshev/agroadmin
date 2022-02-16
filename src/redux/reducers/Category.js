// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "utils";
import { toast } from "react-toastify";

export const getCategory = createAsyncThunk("app/getCategory", async () => {
  const response = await http.get("/admin/categories");
  return response.data?.data;
});

export const createCategory = createAsyncThunk("app/createCategory", async (data, { dispatch }) => {
  const response = await http.post("/admin/categories", data);
  if (response.status === 201) dispatch(getCategory());
  return response.data;
});

export const deleteCategory = createAsyncThunk(
  "app/deleteCategory",
  async ({ id }, { dispatch }) => {
    const response = await http.delete(`/admin/categories/${id}`);
    if (response.status === 200) dispatch(getCategory());
  }
);

export const updateCategory = createAsyncThunk(
  "app/updateCategory",
  async ({ id, value }, { dispatch }) => {
    const response = await http.put(`/admin/categories/${id}`, value);
    if (response.status === 200) dispatch(getCategory());
    return response.data;
  }
);

export const createSubCategory = createAsyncThunk("app/createSubCategory", async (data) => {
  const response = await http.post("/admin/sub_categories", data);
  return response.data;
});

export const deleteSubCategory = createAsyncThunk("app/deleteSubCategory", async ({ id }) => {
  await http.delete(`/admin/sub_categories/${id}`);
});

export const updateSubCategory = createAsyncThunk(
  "app/updateSubCategory",
  async ({ id, value }) => {
    const response = await http.put(`/admin/sub_categories/${id}`, value);
    return response.data;
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
  },
  reducers: {
    // handleSearchQuery: (state, action) => {
    //     state.query = action.payload
    // }
  },
  extraReducers: {
    [getCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [getCategory.fulfilled]: (state, action) => {
      state.categories = action?.payload;
      state.isLoading = false;
    },
    [getCategory.rejected]: (state) => {
      state.isLoading = false;
      toast.error("Serverda xatolik!");
    },
    [createCategory.rejected]: () => {
      toast.error("Serverda xatolik!");
    },
    [updateCategory.rejected]: () => {
      toast.error("Serverda xatolik!");
    },
    [deleteCategory.rejected]: () => {
      toast.error("Serverda xatolik!");
    },
    [createSubCategory.rejected]: () => {
      toast.error("Serverda xatolik!");
    },
    [deleteSubCategory.rejected]: () => {
      toast.error("Serverda xatolik!");
    },
    [updateSubCategory.rejected]: () => {
      toast.error("Serverda xatolik!");
    },
  },
});

export const {} = categorySlice.actions;

export default categorySlice.reducer;
