import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { USER } from 'src/const/api';
import { IBaseState } from 'src/models/base-state.model';
import { IUser } from 'src/models/user.model';

const API_URL = `${process.env.REACT_APP_API_URL}/${USER}`;

interface IUserState extends IBaseState {
  user: IUser;
}

const initialState: IUserState = {
  loading: false,
  errors: null,
  user: {
    created_at: '',
    email: '',
    username: '',
    id: '',
    name: '',
    updated_at: ''
  }
};

export const getUser = createAsyncThunk(`${USER}/get`, async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err?.response?.data?.message || 'Terjadi kesalahan tidak terduga'
    );
  }
});

export const userSlice = createSlice({
  name: `${USER}s`,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state: IUserState) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state: IUserState, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(getUser.rejected, (state: IUserState, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
  }
});

export default userSlice.reducer;
