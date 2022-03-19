// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "utils";
import { toast } from "react-toastify";

export const getProducts = createAsyncThunk(
  "app/getProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await http.get(`/admin/products${params}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.join(", "));
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "app/getSingleProducts",
  async (id, { rejectWithValue }) => {
    try {
      const response = await http.get(`/admin/products/${id}`);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.join(", "));
    }
  }
);
export const createProduct = createAsyncThunk("app/createProducts", async (data, { dispatch }) => {
  const response = await http.post("/admin/products", data, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
  dispatch(getProducts());
  return response.data;
});

export const deleteProduct = createAsyncThunk("app/deleteProduct", async (id, { dispatch }) => {
  await http.delete(`/admin/products/${id}`);
  dispatch(getProducts());
});

export const updateProduct = createAsyncThunk(
  "app/updateProduct",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await http.put(`/admin/products/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.join(", "));
    }
  }
);

export const deleteProductImage = createAsyncThunk(
  "app/deleteProductImage",
  async (id, { rejectWithValue }) => {
    try {
      const response = await http.post(`/admin/image-destroy/${id}`, { model: "Product" });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.join(", "));
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    single: null,
    isLoading: false,
    total: 0,
    per_page: 0,
    current_page: 0,
  },
  reducers: {
    // handleSearchQuery: (state, action) => {
    //     state.query = action.payload
    // }
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.products = action?.payload?.data;
      state.isLoading = false;
      state.total = action?.payload?.total;
      state.per_page = action?.payload?.per_page;
      state.current_page = action?.payload?.current_page;
    },
    [getProducts.rejected]: (state) => {
      state.isLoading = false;
      toast.error("Serverda xatolik!");
    },

    [getSingleProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [getSingleProduct.fulfilled]: (state, action) => {
      state.single = action?.payload;
      state.isLoading = false;
    },
    [getSingleProduct.rejected]: (state) => {
      state.isLoading = false;
      toast.error("Serverda xatolik!");
    },
    [createProduct.fulfilled]: () => {
      toast.success("Mahsulot yaratildi!");
    },
    [createProduct.rejected]: () => {
      toast.error("Serverda xatolik!");
    },
    [deleteProductImage.rejected]: (undefined, action) => {
      toast.error(action.payload);
    },
    [deleteProduct.fulfilled]: () => {
      toast.success("Mahsulot o'chrildi!");
    },
    [deleteProduct.rejected]: () => {
      toast.error("Serverda xatolik!");
    },
    // [deletePartner.rejected]: () => {
    //     toast.error("Serverda xatolik!")
    // },
    [updateProduct.fulfilled]: () => {
      toast.success("Mahsulot o'zgartirildi!");
    },
    [updateProduct.rejected]: () => {
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

export const {} = productsSlice.actions;

export default productsSlice.reducer;
