// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "utils";
import { toast } from "react-toastify";

export const getCategory = createAsyncThunk("app/getCategory", async ({ parent_id, level }, { rejectWithValue }) => {
  try {
    const response = await http.get("/admin/categories", {
      params: {
        parent_id,
        level
      }
    });
    return response.data?.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error?.join(', '))
  }
});

export const getAllCategory = createAsyncThunk("app/getAllCategory", async (undefined, { rejectWithValue }) => {
  try {
    const response = await http.get("/admin/categories");
    return response.data?.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error?.join(', '))
  }
});


export const createCategory = createAsyncThunk("app/createCategory", async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await http.post("/admin/categories", data, {
      "Content-Type": "multipart/form-data",
    });
    dispatch(getCategory({ parent_id: data?.parent_id, level: data?.level }));
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error?.join(', '))
  }
});

export const updateCategory = createAsyncThunk(
  "app/updateCategory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await http.put(`/admin/categories/${id}`, data, {
        "Content-Type": "multipart/form-data",
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.join(', '))
    }
  }
);

// export const createSubCategory = createAsyncThunk("app/createSubCategory", async (data) => {
//   const response = await http.post("/admin/sub_categories", data);
//   return response.data;
// });

// export const deleteSubCategory = createAsyncThunk("app/deleteSubCategory", async ({ id }) => {
//   await http.delete(`/admin/sub_categories/${id}`);
// });

// export const updateSubCategory = createAsyncThunk(
//   "app/updateSubCategory",
//   async ({ id, value }) => {
//     const response = await http.put(`/admin/sub_categories/${id}`, value);
//     return response.data;
//   }
// );

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    all: [],
    categories: [],
    subCategories: [],
    subSubCategories: []
  },
  reducers: {
    // handleSearchQuery: (state, action) => {
    //     state.query = action.payload
    // }
  },
  extraReducers: {
    [getAllCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllCategory.fulfilled]: (state, action) => {
      state.all = action?.payload;
      state.isLoading = false;
    },
    [getAllCategory.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
    [getCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [getCategory.fulfilled]: (state, action) => {
      state.categories = action?.payload;
      state.isLoading = false;
    },
    [getCategory.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
    [createCategory.rejected]: (undefined, action) => {
      console.log(action.payload)
      toast.error(action.payload);
    },
    [updateCategory.rejected]: (undefined, action) => {
      toast.error(action.payload);
    },
  },
});

export const { } = categorySlice.actions;

export default categorySlice.reducer;
