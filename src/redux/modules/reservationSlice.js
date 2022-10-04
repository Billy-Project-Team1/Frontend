import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from './instance';

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
    [reservationCancelThunk.rejected]: (state, action) => {
      console.log(action.payload);
    },
    [deliveryDoneThunk.fulfilled]: (state, action) => {},

    [deliveryDoneThunk.rejected]: (state, action) => {
      console.log(action.payload);
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
    [jullyStateChangeThunk.rejected]: (state, action) => {
      console.log(action.payload);
    },
  },
});
export default reservationSlice.reducer;
