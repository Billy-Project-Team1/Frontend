import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from './instance';

// 빌리의 예약 카운트 조회 Get /auth/reservations/billy
export const billyReservationCntThunk = createAsyncThunk(
  'billyReservationStateThunk',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(`/auth/reservations/billy`, payload);
      //   return console.log(response);
      if (response.data.success === true) {
        return thunkAPI.fulfillWithValue(response.data.result);
      } else {
        return console.log(response);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
// 빌리로서 계약한 예약 상태별 조회 Get /auth/reservations/billy/{state}
export const billyStateListThunk = createAsyncThunk(
  'billyStateListThunk',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(
        `/auth/reservations/billy/${payload}`
      );
      return console.log(response);
      if (response.data.success === true) {
        return thunkAPI.fulfillWithValue(response.data.result);
      } else {
        return console.log(response);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const initialState = {
  billyState: {},
  billyList: {},
};

export const reservationSlice = createSlice({
  name: 'mystate',
  initialState,
  reducers: {},
  extraReducers: {
    [billyReservationCntThunk.fulfilled]: (state, action) => {
      state.billyState = action.payload;
    },
    [billyReservationCntThunk.rejected]: (state, action) => {
      console.log(action.payload);
    },
    [billyStateListThunk.fulfilled]: (state, action) => {
      state.billyList = action.payload;
    },
    [billyStateListThunk.rejected]: (state, action) => {
      console.log(action.payload);
    },
  },
});
export default reservationSlice.reducer;
