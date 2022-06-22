import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';
import bannerReducer from './banner/bannerSlice';
import aboutUsReducer from './about-us/aboutUsSlice';

export const store = configureStore({
  reducer: {
    auths: authReducer,
    users: userReducer,
    banners: bannerReducer,
    aboutUs: aboutUsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type addDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<addDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
