import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { WAREHOUSE } from "src/const/api"
import { IItemsModel } from "src/models/items.model"
import { IGetParams } from "src/models/params.models"
import { API_GATEWAY } from "src/utils/api"
import { RootState } from "../store"

const API_URL = `${API_GATEWAY}/${WAREHOUSE}`

export const itemsAdapter = createEntityAdapter<IItemsModel>();

export const getItems = createAsyncThunk(
    `${WAREHOUSE}/get`,
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

export const itemsSlice = createSlice({
    name: `${WAREHOUSE}`,
    initialState: itemsAdapter.getInitialState({
        loading: false,
        errors: null,
        entities: [],
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getItems.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getItems.fulfilled, (state, action) => {
            state.loading = false;
            itemsAdapter.setAll(state, action.payload)
        });
        builder.addCase(getItems.rejected, (state, action) => {
            state.loading = false;
            state.errors = action.payload;
        });
    }
});

export default itemsSlice.reducer;
export const {
    selectAll: selectAllItems,
    selectById: selectByIdItems,
    selectEntities: selectEntitiesItems
} = itemsAdapter.getSelectors<RootState>((state) => state.items);