import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit';
import axios from 'axios';
import { BANNER } from 'src/const/api';
import { IBanner } from 'src/models/banner.model';
import { IGetParamsBanner } from 'src/models/params.models';
import { RootState } from '../store';

const API_URL = `${process.env.REACT_APP_API_URL}/data/${BANNER}`;

export const bannerAdapter = createEntityAdapter<IBanner>();

export const getAllBanner = createAsyncThunk(
  `${BANNER}/get`,
  async (params: IGetParamsBanner, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}`, { params: { ...params } });
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || 'Terjadi kesalahan tidak terduga'
      );
    }
  }
);

export const bannerSlice = createSlice({
  name: `${BANNER}`,
  initialState: bannerAdapter.getInitialState({
    loading: false,
    errors: null,
    entities: []
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllBanner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllBanner.fulfilled, (state, action) => {
      state.loading = false;
      bannerAdapter.setAll(state, action.payload);
    });
    builder.addCase(getAllBanner.rejected, (state, action) => {
      state.loading = false;
    });
  }
});

export default bannerSlice.reducer;
export const {
  selectAll: selectAllBanner,
  selectById: selectByIdBanner,
  selectEntities: selectEntitiesBanner
} = bannerAdapter.getSelectors<RootState>((state) => state.banners);
