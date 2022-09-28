import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from './instance';

//예약 신청 Post /auth/reservations
export const reservationThunk = createAsyncThunk(
  'reservationThunk',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post(`/auth/reservations`, payload);
      if (response.data.success === true) {
        return thunkAPI.fulfillWithValue(response.data.result);
      }
    } catch (error) {}
  }
);
// 빌리의 예약 카운트 조회 Get /auth/reservations/billy
export const billyReservationCntThunk = createAsyncThunk(
  'billyReservationStateThunk',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get('/auth/reservations/billy', payload);
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
// 빌리 예약 취소 Patch /auth/reservations/billy/{reservationId}
export const reservationCancelThunk = createAsyncThunk(
  'reservationCancelThunk',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.patch(
        `/auth/reservations/billy/${payload.a}`,
        payload.b
      );
      return thunkAPI.fulfillWithValue(response.data.success);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
// 빌리의 수령 완료 Patch /auth/reservations/billy/delivery/{reservationId}
export const deliveryDoneThunk = createAsyncThunk(
  'deliveryDoneThunk',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.patch(
        `/auth/reservations/billy/delivery/${payload}`
      );
      return thunkAPI.fulfillWithValue(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
// 줄리의 예약 카운트 조회 Get /auth/reservations/jully
export const jullyReservationCntThunk = createAsyncThunk(
  'jullyReservationCntThunk',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get('/auth/reservations/jully ', payload);
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
// 줄리로서 계약한 예약 상태별 조회 Get /auth/reservations/jully/{state}
export const jullyStateListThunk = createAsyncThunk(
  'jullyStateListThunk',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(
        `/auth/reservations/jully/${payload}`
      );
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
// 줄리 예약 상태 변경 상태 - 1 : 예약 대기 / 2 : 예약 완료 / 3 : 예약 취소 / 4 : 대여 중 / 5 : 반납 완료
// Patch /auth/reservations/jully/{reservationId}
export const jullyStateChangeThunk = createAsyncThunk(
  'jullyStateChangeThunk',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.patch(
        `/auth/reservations/jully/${payload.a}`,
        payload.b
      );
      return thunkAPI.fulfillWithValue(response.data.success);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const initialState = {
  billyState: {},
  billyList: [],
  jullyState: {},
  jullyList: [],
};

export const reservationSlice = createSlice({
  name: 'billystate',
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
    [reservationCancelThunk.fulfilled]: (state, action) => {
      // state.billyList = action.payload;
    },
    [reservationCancelThunk.rejected]: (state, action) => {
      console.log(action.payload);
    },
    [deliveryDoneThunk.fulfilled]: (state, action) => {},

    [deliveryDoneThunk.rejected]: (state, action) => {
      console.log(action.payload);
    },
    [reservationThunk.fulfilled]: (state, action) => {
      // state.billyState = action.payload;
    },
    [reservationThunk.rejected]: (state, action) => {
      console.log(action.payload);
    },
    [jullyReservationCntThunk.fulfilled]: (state, action) => {
      state.jullyState = action.payload;
    },
    [jullyReservationCntThunk.rejected]: (state, action) => {
      console.log(action.payload);
    },
    [jullyStateListThunk.fulfilled]: (state, action) => {
      state.jullyList = action.payload;
    },
    [jullyStateChangeThunk.fulfilled]: (state, action) => {
      // state.jullyList = action.payload;
    },
    [jullyStateChangeThunk.rejected]: (state, action) => {
      console.log(action.payload);
    },
  },
});
export default reservationSlice.reducer;
