import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { PAGES } from "src/const/api"
import { IAboutUsForm } from "src/content/about-us"
import { IBaseState } from "src/models/base-state.model"
import { IGetParams } from "src/models/params.models"

const API_URL = `${process.env.REACT_APP_API_URL}/data/${PAGES}`

interface IAboutUsState extends IBaseState {
    data: {
        id?: string,
        title: string,
        slug: 'about-us',
        render_type: 'html' | 'url' | 'text' | 'markdown'
        content: string
        url?: string
        data_extra?: any
        create_at?: string
        update_at?: string
    }
}

const initialState: IAboutUsState = {
    data: null,
    loading: false,
    errors: null
}

export const getAboutUs = createAsyncThunk(
    `${PAGES}/get`,
    async (params: IGetParams, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}`, { params: { ...params } })
            return response.data.data.find(v => v.slug === 'about-us')
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err?.response?.data?.message || 'Terjadi kesalahan tidak terduga'
            )
        }
    }
)

export const updateAboutUs = createAsyncThunk(
    `${PAGES}/update`,
    async (payload: IAboutUsForm, thunkAPI) => {
        try {
            const response = await axios.put(`${API_URL}/${payload.id}`, null, {
                params: {
                    ...payload
                }
            })
            return response.data.data
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err?.response?.data?.message || 'Terjadi kesalahan tidak terduga'
            )
        }
    }
)

export const aboutUsSlice = createSlice({
    name: `${PAGES}`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAboutUs.pending, (state: IAboutUsState) => {
            state.loading = true;
        });
        builder.addCase(getAboutUs.fulfilled, (state: IAboutUsState, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(getAboutUs.rejected, (state: IAboutUsState, action) => {
            state.loading = false;
            state.errors = action.payload;
        });
        builder.addCase(updateAboutUs.pending, (state: IAboutUsState) => {
            state.loading = true;
        });
        builder.addCase(updateAboutUs.fulfilled, (state: IAboutUsState, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(updateAboutUs.rejected, (state: IAboutUsState, action) => {
            state.loading = false;
            state.errors = action.payload;
        });
    }
});

export default aboutUsSlice.reducer;