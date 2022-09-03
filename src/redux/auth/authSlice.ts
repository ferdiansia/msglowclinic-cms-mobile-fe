import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AUTH } from 'src/const/api';
import { IBaseState } from 'src/models/base-state.model';
import { ILoginFormData } from 'src/models/login-form-data.model';
import { API_GATEWAY } from 'src/utils/api';

const API_URL = `${API_GATEWAY}/${AUTH}`;

interface IAuthState extends IBaseState {
  token: string;
}

const initialState: IAuthState = {
  token: '',
  loading: false,
  errors: null
};

export const getAuthToken = createAsyncThunk(
  `${AUTH}/login`,
  async (payload: ILoginFormData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/login`, null, {
        params: payload
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || 'Terjadi kesalahan tidak terduga'
      );
    }
  }
);

export const removeAuthToken = createAsyncThunk(
  `${AUTH}/logout`,
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/logout`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || 'Terjadi kesalahan tidak terduga'
      );
    }
  }
);

export const authSlice = createSlice({
  name: `${AUTH}s`,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAuthToken.pending, (state: IAuthState) => {
      state.loading = true;
    });
    builder.addCase(getAuthToken.fulfilled, (state: IAuthState, action) => {
      state.loading = false;
      state.token = action.payload;
    });
    builder.addCase(getAuthToken.rejected, (state: IAuthState, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
    builder.addCase(removeAuthToken.pending, (state: IAuthState) => {
      state.loading = true;
    });
    builder.addCase(removeAuthToken.fulfilled, (state: IAuthState, action) => {
      state.loading = false;
      state.token = '';
    });
    builder.addCase(removeAuthToken.rejected, (state: IAuthState, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
  }
});

export default authSlice.reducer;
