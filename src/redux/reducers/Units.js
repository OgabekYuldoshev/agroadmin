// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "utils";
import { toast } from "react-toastify";

export const getCurrenciesList = createAsyncThunk(
  "app/getCurrenciesList",
  async (undefined, { rejectWithValue }) => {
    try {
      const response = await http.get("/admin/currencies");
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUnitList = createAsyncThunk(
  "app/getUnitList",
  async (undefined, { rejectWithValue }) => {
    try {
      const response = await http.get("/admin/units");
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getPage = createAsyncThunk("app/getPage", async () => {
  const response = await http.get("/admin/pages");
  return response.data?.data;
});

export const createPage = createAsyncThunk("app/createPage", async (data, { dispatch }) => {
  const response = await http.post("/admin/pages", data, {
    "Content-Type": "multipart/form-data",
  });
  dispatch(getPage());
  return response.data;
});

export const updatePage = createAsyncThunk("app/updatePage", async ({ id, data }, { dispatch }) => {
  const response = await http.put(`/admin/pages/${id}`, data, {
    "Content-Type": "multipart/form-data",
  });
  dispatch(getPage());
  return response.data;
});

export const deletePage = createAsyncThunk("app/deletePage", async (id, { dispatch }) => {
  await http.delete(`/admin/pages/${id}`);
  dispatch(getPage());
});

export const getSlider = createAsyncThunk("app/getSlider", async () => {
  const response = await http.get("/admin/sliders");
  return response.data?.data;
});

export const createSlider = createAsyncThunk("app/createSlider", async (data, { dispatch }) => {
  const response = await http.post("/admin/sliders", data, {
    "Content-Type": "multipart/form-data",
  });
  dispatch(getSlider());
  return response.data;
});

export const deleteSlider = createAsyncThunk("app/deleteSlider", async (id, { dispatch }) => {
  const response = await http.delete(`/admin/sliders/${id}`);
  dispatch(getSlider());
  return response.data;
});

export const getMessages = createAsyncThunk("app/getMessages", async () => {
  const response = await http.get("/admin/messages");
  return response.data?.data;
});

export const currenciesSlice = createSlice({
  name: "units",
  initialState: {
    currencies: [],
    messages: [],
    pages: [],
    sliders: [],
    unit: [],
    isLoading: false,
  },
  reducers: {
    // handleSearchQuery: (state, action) => {
    //     state.query = action.payload
    // }
  },
  extraReducers: {
    [getCurrenciesList.pending]: (state) => {
      state.isLoading = true;
    },
    [getCurrenciesList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.currencies = action?.payload;
    },
    [getCurrenciesList.rejected]: (state) => {
      state.isLoading = false;
      toast.error("Serverda xatolik!");
    },
    // Utils
    [getUnitList.pending]: (state) => {
      state.isLoading = true;
    },
    [getUnitList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.unit = action?.payload;
    },
    [getUnitList.rejected]: (state) => {
      state.isLoading = false;
      toast.error("Serverda xatolik!");
    },
    // Pages
    [getPage.pending]: (state) => {
      state.isLoading = true;
    },
    [getPage.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.pages = action?.payload;
    },
    [getMessages.fulfilled]: (state, action) => {
      state.messages = action.payload;
    },
    [getMessages.rejected]: () => {
      toast.error("Serverda xatolik!");
    },
    [getPage.rejected]: (state) => {
      state.isLoading = false;
      toast.error("Serverda xatolik!");
    },
    [createPage.fulfilled]: () => {
      toast.success("Page yaratildi!");
    },
    [createPage.rejected]: () => {
      toast.error("Serverda xatolik!");
    },
    [updatePage.fulfilled]: () => {
      toast.success("Page yangilandi!");
    },
    [updatePage.rejected]: () => {
      toast.error("Serverda xatolik!");
    },
    [deletePage.fulfilled]: () => {
      toast.success("Page o'chirildi!");
    },
    [deletePage.rejected]: () => {
      toast.error("Serverda xatolik!");
    },
    // Sliders

    [getSlider.pending]: (state) => {
      state.isLoading = true;
    },
    [getSlider.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.sliders = action?.payload;
    },
    [getSlider.rejected]: (state) => {
      state.isLoading = false;
      toast.error("Serverda xatolik!");
    },
    [createSlider.fulfilled]: () => {
      toast.success("Page yaratildi!");
    },
    [createSlider.rejected]: () => {
      toast.error("Serverda xatolik!");
    },
    [deleteSlider.fulfilled]: () => {
      toast.success("Slider o'chirildi!");
    },
    [deleteSlider.rejected]: () => {
      toast.error("Serverda xatolik!");
    },
  },
});

export const {} = currenciesSlice.actions;

export default currenciesSlice.reducer;
