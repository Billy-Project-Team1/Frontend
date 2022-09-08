import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { imgAPI } from '../../shared/api';

const initialState = {
	post: [],
};

export const uploadToDB = createAsyncThunk(
	'uplaodToDB',
	async (payload, thunkAPI) => {
		// 받은 data = payload
		console.log(payload);
		const response = await imgAPI.fileUpload(payload);
		console.log(response);
		return response.data.data;
	}
);

const image = createSlice({
	name: 'image',
	initialState,
	extraReducers: {
		[uploadToDB.fulfilled]: (state, action) => {
			console.log(action.payload);
			state.post = action.payload;
		},
	},
});

export default image.reducer;
