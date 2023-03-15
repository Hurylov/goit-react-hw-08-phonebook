import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/authApi';

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.getSignUp(data);
      return result;
    } catch ({ response }) {
      const { status, statusText } = response;
      const error = { status, statusText };
      return rejectWithValue(error);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.getLogIn(data);
      const token = result.token; // Отримуємо токен з результату запиту
      localStorage.setItem('token', token); // Зберігаємо токен у локальному сховищі
      return result;
    } catch ({ response }) {
      const { status, statusText } = response;
      const error = { status, statusText };
      return rejectWithValue(error);
    }
  }
);

export const logOut = createAsyncThunk(
  'auth/logOut',
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.getLogOut();
      return result;
    } catch ({ response }) {
      const { status, statusText } = response;
      const error = { status, statusText };
      return rejectWithValue(error);
    }
  }
);
export const current = createAsyncThunk(
  'auth/current',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // Отримуємо токен з локального сховища
      if (!token) {
        throw new Error('No token found in local storage'); // Якщо токен не знайдено, генеруємо помилку
      }
      const result = await api.getCurrent(token);
      return result;
    } catch ({ response }) {
      const { status, statusText } = response;
      const error = { status, statusText };
      return rejectWithValue(error);
    }
  }
);
