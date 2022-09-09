import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	postsList: [],
};

const addPosting = createSlice({
	name: 'posting',
	initialState,
	reducers: {
		extraReducers: {},
	},
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const { addNumber, minusNumber } = addPosting.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.

export default addPosting.reducer;
