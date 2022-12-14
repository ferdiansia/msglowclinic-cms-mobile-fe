import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit';
import axios from 'axios';
import { BANNER } from 'src/const/api';
import { IBannerForm } from 'src/content/banner/BannerForm';
import { IBanner, IBannerSlug } from 'src/models/banner.model';
import { IGetParamsBanner } from 'src/models/params.models';
import { API_GATEWAY } from 'src/utils/api';
import { RootState } from '../store';

const API_URL = `${API_GATEWAY}/data/${BANNER}`;

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

export const getBannerByType = createAsyncThunk(
  `${BANNER}-type/get`,
  async (params: IGetParamsBanner, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}`, { params: { ...params } });
      return { data: response.data.data, type: params.slug };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || 'Terjadi kesalahan tidak terduga'
      );
    }
  }
);

export const removeBanner = createAsyncThunk(
  `${BANNER}/remove`,
  async (data: { type: IBannerSlug, id: string }, thunkAPI) => {
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

export const addBanner = createAsyncThunk(
  `${BANNER}/add`,
  async ({ payload, body }: { payload: IBannerForm; body: any }, thunkAPI) => {
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

export const updateBanner = createAsyncThunk(
  `${BANNER}/update`,
  async ({ payload, body }: { payload: IBannerForm; body: any }, thunkAPI) => {
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

export const bannerSlice = createSlice({
  name: `${BANNER}`,
  initialState: bannerAdapter.getInitialState({
    loading: false,
    errors: null,
    entities: [],
    mainBannerData: {}
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
    builder.addCase(getBannerByType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBannerByType.fulfilled, (state, action) => {
      state.loading = false;
      state.mainBannerData[`${action.payload.type}`] = action.payload.data;
    });
    builder.addCase(getBannerByType.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(removeBanner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeBanner.fulfilled, (state, action) => {
      state.loading = false;
      const fIndex = state.mainBannerData[`${action?.payload?.type}`].findIndex(v => v.id === action.payload.id)
      if (fIndex !== null || fIndex !== undefined)
        state.mainBannerData[`${action?.payload?.type}`].splice(fIndex, 1)

      // bannerAdapter.removeOne(state, action.payload);
    });
    builder.addCase(removeBanner.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addBanner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addBanner.fulfilled, (state, action) => {
      state.loading = false;
      state.mainBannerData[`${action?.payload?.slug}`].push(action.payload)
    });
    builder.addCase(addBanner.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateBanner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateBanner.fulfilled, (state, action) => {
      state.loading = false;
      const fIndex = state.mainBannerData[`${action?.payload?.slug}`].findIndex(v => v.id === action.payload.id)

      if (fIndex !== null || fIndex !== undefined) {
        state.mainBannerData[`${action?.payload?.slug}`][fIndex] = action.payload
      }
    });
    builder.addCase(updateBanner.rejected, (state, action) => {
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
