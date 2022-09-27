import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from './instance';

//👉🏻1. 서버랑 통신해주기

// 리뷰 Get /auth/reviews/received
export const getMypageReview = createAsyncThunk(
	'getReview',
	async (payload, thunkAPI) => {
		try {
			// console.log(payload) => id뜸
			// a:API url , b: API request 근데 이건 get이니까 없음 ㅋㅋ (가끔 있음), c: 파일의 타입 바꿔줄때 씀(이미지)
			const response = await instance.get(
				`/auth/reviews/received/${payload}`,
				payload
			);
			console.log(response);

			//Rerult를 slice에 다 넣어줘야함. 그래야 이제 빼써 쓸 수 있음.
			if (response.data.success === true) {
				return thunkAPI.fulfillWithValue(response.data.result);
			}
		} catch (error) {
			console.log(error);
		}
	}
);

// 리뷰 Get /reviews/{postId}
export const getDetailReview = createAsyncThunk(
	'getDetailReview',
	async (payload, thunkAPI) => {
		try {
			// console.log(payload) => id뜸
			// a:API url , b: API request 근데 이건 get이니까 없음 ㅋㅋ (가끔 있음), c: 파일의 타입 바꿔줄때 씀(이미지)
			const response = await instance.get(`/reviews/${payload.postid}`, {
				params: { userId: payload.myUserId },
			});

			//Rerult를 slice에 다 넣어줘야함. 그래야 이제 빼써 쓸 수 있음.
			if (response.data.success === true) {
				return thunkAPI.fulfillWithValue(response.data.result);
			}
		} catch (error) {
			console.log(error);
		}
	}
);

//post 하는 방법
export const addReview = createAsyncThunk(
	'addReview',
	async (payload, thunkAPI) => {
		try {
			// console.log(payload) => id뜸
			const response = await instance.post(`/auth/reviews`, payload, {
				'Content-Type': 'multipart/form-data',
			});

			// Rerult를 slice에 다 넣어줘야함. 그래야 이제 빼써 쓸 수 있음.
			if (response.data.success === true) {
				return thunkAPI.fulfillWithValue(response.data.result);
			}
		} catch (error) {
			console.log(error);
		}
	}
);

// {
// "reviewId": 6,
// "comment": "다음에 찾아주세요22!"
// }

export const addDetailReview = createAsyncThunk(
	'addDetailReview',
	async (payload, thunkAPI) => {
		try {
			// console.log(payload) => id뜸
			const response = await instance.post(
				`/auth/reviews/comments`,
				// reviewId: payload.reviewId,
				// comment: payload.comment,
				payload.a
			);

			// Rerult를 slice에 다 넣어줘야함. 그래야 이제 빼써 쓸 수 있음.
			if (response.data.success === true) {
				return thunkAPI.fulfillWithValue(response.data.result);
			}
		} catch (error) {
			console.log(error);
		}
	}
);

///auth/reviews/{reviewId}
export const delReview = createAsyncThunk(
	'delReview',
	async (payload, thunkAPI) => {
		try {
			// console.log(payload) => id뜸
			const response = await instance.delete(`/auth/reviews/${payload.reviewId}`);
			console.log(response)
			if (response.data.success) {
				// return thunkAPI.fulfillWithValue(response.data);
				return window.location.replace(`/detail/${payload.id}`);
			}
		} catch (error) {
			console.log(error);
		}
	}
);

///auth/reviews/comments/{commentId}
export const delReplyReview = createAsyncThunk(
	'delReplyReview',
	async (payload, thunkAPI) => {
		try {
			// console.log(payload) => id뜸
			const response = await instance.delete(
				`auth/reviews/comments/${payload}`
			);
			// console.log(response)
			return thunkAPI.fulfillWithValue(payload);
		} catch (error) {
			console.log(error);
		}
	}
);

export const updateReview = createAsyncThunk(
	'updateReview',
	async (payload, thunkAPI) => {
		try {
			// console.log(payload) => id뜸
			// a:API url , b: API request 근데 이건 get이니까 없음 ㅋㅋ (가끔 있음), c: 파일의 타입 바꿔줄때 씀(이미지)
			const response = await instance.post(`/auth/reviews/${payload.reviewId}`);
			// console.log(response)

			//Rerult를 slice에 다 넣어줘야함. 그래야 이제 빼써 쓸 수 있음.
			if (response.data.success === true) {
				return thunkAPI.fulfillWithValue(response.data.result);
			}
		} catch (error) {
			console.log(error);
		}
	}
);

//👉🏻2. 초기값 넣어주기
const initialState = {
	reviewPost: {},
	reviewGet: [],
	detailReviewGet: [],
};

//👉🏻3. extraReducers를 사용해서 진짜 사용할 정보로 바꿔주기
//get은 그냥 복붙하기. initialState 이름 넣어주고 getProfileThunk (위에서 지어준 변수 이름)
// export const 'myProfileSlice'
export const reviewSlice = createSlice({
	name: 'review',
	initialState,
	reducers: {},
	extraReducers: {
		[getMypageReview.fulfilled]: (state, action) => {
			state.reviewGet = action.payload;
		},
		[getDetailReview.fulfilled]: (state, action) => {
			state.detailReviewGet = action.payload;
		},
		[addReview.fulfilled]: (state, action) => {
			state.reviewPost = action.payload;
		},
		[addDetailReview.fulfilled]: (state, action) => {
			// state.reviewPost = action.payload;
		},
		[delReview.fulfilled]: (state, action) => {
			state.reviewGet = action.payload.filter(
				(item) => item.reviewId !== action.payload
			);
		},
		[delReplyReview.fulfilled]: (state, action) => {
			state.reviewGet = action.payload.filter(
				(item) => item.reviewId !== action.payload
			);
		},
		[updateReview.rejected]: (state, action) => {
			state.error = action.payload;
		},
		[updateReview.pending]: () => {},
	},
});

export default reviewSlice.reducer;
