import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from './instance';

//예약 신청 Post /auth/reservations
export const reservationThunk = createAsyncThunk(
  'reservationThunk',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post(`/auth/reservations`, payload);
      // return console.log ('렁러알',response)
      if (response.data.success === true) {
        return thunkAPI.fulfillWithValue(response.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

// 빌리의 예약 카운트 조회 Get /auth/reservations/billy
export const billyReservationCntThunk = createAsyncThunk(
  'billyReservationStateThunk',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get('/auth/reservations/billy', payload);
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
// 빌리 예약 취소 Patch /auth/reservations/billy/{reservationId}
export const reservationCancelThunk = createAsyncThunk(
  'reservationCancelThunk',
  async (payload, thunkAPI) => {
    // console.log(payload)
    try {
      const response = await instance.patch(
        `/auth/reservations/billy/${payload.a}`,
        payload.b
      );
      //   return console.log(response);
      return thunkAPI.fulfillWithValue(response.data.result);
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
      // return console.log(response);
      return thunkAPI.fulfillWithValue(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const initialState = {
  billyState: {},
  billyList: [],
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
      state.billyList = action.payload;
    },
    [reservationCancelThunk.rejected]: (state, action) => {
      console.log(action.payload);
    },
    [deliveryDoneThunk.fulfilled]: (state, action) => {
      console.log(state.billyList);

      state.billyList = state.billyList.map((item) => {
        if (item.reservationId === action.payload) {
          return { ...item, state: 4 };
        } else {
          return { ...item };
        }
      });
      // console.log(state.billyList);
    },
    [deliveryDoneThunk.rejected]: (state, action) => {
      console.log(action.payload);
    },
    [reservationThunk.fulfilled]: (state, action) => {
      state.billyState = action.payload;
    },
    [reservationThunk.rejected]: (state, action) => {
      console.log(action.payload);
    },


  },
});
export default reservationSlice.reducer;
