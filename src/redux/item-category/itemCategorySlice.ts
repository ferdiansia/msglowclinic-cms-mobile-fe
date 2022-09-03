import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ITEM_CATEGORY, WAREHOUSE } from "src/const/api";
import { IItemCategory } from "src/models/item-category.model";
import { IGetParams } from "src/models/params.models";
import { API_GATEWAY } from "src/utils/api";
import { RootState } from "../store";

const API_URL = `${API_GATEWAY}/${WAREHOUSE}/${ITEM_CATEGORY}`

export const itemsCategoryAdapter = createEntityAdapter<IItemCategory>();


export const getItemCategory = createAsyncThunk(
    `${WAREHOUSE}/${ITEM_CATEGORY}/get`,
    async (params: IGetParams, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}`, { params: { ...params } })
            return response.data.data
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err?.response?.data?.message || 'Terjadi kesalahan tidak terduga'
            )
        }
    }
)

export const removeItemCategory = createAsyncThunk(
    `${WAREHOUSE}/${ITEM_CATEGORY}/remove`,
    async (data: { id: string }, thunkAPI) => {
        try {
            const response = await axios.delete(`${API_URL}/${data.id}`);
            if (response) {
                return data;
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err?.response?.data?.message || 'Terjadi kesalahan tidak terduga'
            );
        }
    }
);


export const addItemCategory = createAsyncThunk(
    `${WAREHOUSE}/${ITEM_CATEGORY}/add`,
    async ({ payload, body }: { payload: any; body: any }, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}`, body, {
                params: payload
            });
            return response.data.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err?.response?.data?.message || 'Terjadi kesalahan tidak terduga'
            );
        }
    }
);

export const updateItemCategory = createAsyncThunk(
    `${WAREHOUSE}/${ITEM_CATEGORY}/update`,
    async ({ payload, body }: { payload: any; body: any }, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}/${payload.id}`, body, {
                params: {
                    ...payload,
                    _method: 'PUT'
                }
            });
            return response.data.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err?.response?.data?.message || 'Terjadi kesalahan tidak terduga'
            );
        }
    }
);


export const ItemCategorySlice = createSlice({
    name: `${ITEM_CATEGORY}`,
    initialState: itemsCategoryAdapter.getInitialState({
        loading: false,
        errors: null,
        entities: [],
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getItemCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getItemCategory.fulfilled, (state, action) => {
            state.loading = false;
            itemsCategoryAdapter.setAll(state, action.payload);
        });
        builder.addCase(getItemCategory.rejected, (state, action) => {
            state.loading = false;
        });
        builder.addCase(removeItemCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(removeItemCategory.fulfilled, (state, action) => {
            state.loading = false;
            itemsCategoryAdapter.removeOne(state, action.payload.id);
        });
        builder.addCase(removeItemCategory.rejected, (state, action) => {
            state.loading = false;
        });
        builder.addCase(addItemCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addItemCategory.fulfilled, (state, action) => {
            state.loading = false;
            itemsCategoryAdapter.addOne(state, action.payload);
        });
        builder.addCase(addItemCategory.rejected, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateItemCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateItemCategory.fulfilled, (state, action) => {
            state.loading = false;
            itemsCategoryAdapter.updateOne(state, {
                id: action.payload.id,
                changes: action.payload
            });

        });
        builder.addCase(updateItemCategory.rejected, (state, action) => {
            state.loading = false;
        });
    }
});

export default ItemCategorySlice.reducer;
export const {
    selectAll: selectAllItemCategory,
    selectById: selectByIdItemCategory,
    selectEntities: selectEntitiesItemCategory
} = itemsCategoryAdapter.getSelectors<RootState>((state) => state.item_category);