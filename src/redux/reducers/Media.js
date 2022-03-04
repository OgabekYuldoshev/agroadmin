// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "utils";
import { toast } from "react-toastify";

export const getImages = createAsyncThunk("media/getImages", async (undefined, { rejectWithValue }) => {
    try {
        const response = await http.get("/admin/media-images");
        return response.data?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error?.join(', '))
    }
})

export const getSingleImages = createAsyncThunk("media/getSingleImages", async (id, { rejectWithValue }) => {
    try {
        const response = await http.get(`/admin/media-images/${id}`);
        return response.data?.data;
    } catch (error) {
        console.log(error.response.error)
        return rejectWithValue(error.response?.data?.error?.join(', '))
    }
})

export const createImages = createAsyncThunk("media/createImages", async (data, { dispatch, rejectWithValue }) => {
    try {
        const response = await http.post("/admin/media-images", data, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });
        dispatch(getImages())
        return response.data?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error?.join(', '))
    }
})

export const updateImages = createAsyncThunk("media/updateImages", async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
        const response = await http.put(`/admin/media-images/${id}`, data,);
        dispatch(getImages())
        return response.data?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error?.join(', '))
    }
})


export const deleteImages = createAsyncThunk("media/deleteImages", async (id, { dispatch, rejectWithValue }) => {
    try {
        const response = await http.delete(`/admin/media-images/${id}`);
        dispatch(getImages())
        return response.data?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error?.join(', '))
    }
})

export const deleteOneImages = createAsyncThunk("media/deleteOneImages", async (id, { rejectWithValue }) => {
    try {
        const response = await http.post(`/admin/image-destroy/${id}`, { model: "MediaImages" });
        return response.data?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error?.join(', '))
    }
})

export const mediaSlice = createSlice({
    name: "media",
    initialState: {
        single: null,
        photos: [],
        videos: [],
    },
    reducers: {
    },
    extraReducers: {
        [getImages.pending]: (state) => {
            state.isLoading = true;
        },
        [getImages.fulfilled]: (state, action) => {
            state.photos = action.payload
            state.isLoading = false;
        },
        [getImages.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false;
        },
        [createImages.fulfilled]: () => {
            toast.success("Albom Yaratildi!")
        },
        [getSingleImages.pending]: (state) => {
            state.isLoading = true;
        },
        [getSingleImages.fulfilled]: (state, action) => {
            state.single = action.payload
            state.isLoading = false;
        },
        [getSingleImages.rejected]: (state, action) => {
            toast.error(action.payload)
            state.isLoading = false;
        },
        [createImages.rejected]: (undefined, action) => {
            console.log(action)
            toast.error(action.payload)
        },
        [updateImages.fulfilled]: () => {
            toast.success("O'zgartirildi!")
        },
        [updateImages.rejected]: (state, action) => {
            toast.error(action.payload)
        },
        [deleteImages.fulfilled]: () => {
            toast.success("O'chirildi!")
        },
        [deleteImages.rejected]: (state, action) => {
            toast.error(action.payload)
        },
        [deleteOneImages.fulfilled]: () => {
            toast.success("O'chirildi!")
        },
        [deleteOneImages.rejected]: (state, action) => {
            toast.error(action.payload)
        }
    },
});

export const { } = mediaSlice.actions;

export default mediaSlice.reducer;
