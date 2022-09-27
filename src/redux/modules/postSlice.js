import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from './instance';

//여기에 있는 이니셜스테이트 값은 어디에서든 불러올 수 있음, 함수도 마찬가지
const initialState = {
  post: {},
};

//try는 계속 시도해보고 안되면 catch로 넘어감
export const getPost = createAsyncThunk(
  'getPost',
  async (payload, thunkAPI) => {
    try {
      // console.log(payload) => id뜸
      // a:API url , b: API request 근데 이건 get이니까 없음 ㅋㅋ (가끔 있음), c: 파일의 타입 바꿔줄때 씀(이미지)
      const response = await instance.get(`/posts/details/${payload.postid}`, {
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
export const getReviewPost = createAsyncThunk(
  'getReviewPost',
  async (payload, thunkAPI) => {
    try {
      // console.log(payload) => id뜸
      // a:API url , b: API request 근데 이건 get이니까 없음 ㅋㅋ (가끔 있음), c: 파일의 타입 바꿔줄때 씀(이미지)
      const response = await instance.get(`/posts/details/${payload.postId}`, {
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
export const addPost = createAsyncThunk(
  'addPost',
  async (payload, thunkAPI) => {
    try {
      // console.log(payload) => id뜸
      // a:API url , b: API request 근데 이건 get이니까 없음 ㅋㅋ (가끔 있음), c: 파일의 타입 바꿔줄때 씀(이미지)
      const response = await instance.post(`/auth/posts`, payload, {
        'Content-Type': 'multipart/form-data',
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
//게시글 삭제 Delete /auth/posts/{postId}
export const deletePost = createAsyncThunk(
  'deletePost',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.delete(`/auth/posts/${payload}`);
      // console.log(response)
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      console.log(error);
    }
  }
);
//게시글 수정 Patch /auth/posts/{postId} "image”: form/data
export const updatePost = createAsyncThunk(
  'updatePost',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.patch(
        `/auth/posts/${payload.postid}`,
        payload.formData,
        {
          'Content-Type': 'multipart/form-data',
        }
      );
      // console.log(response)

      if (response.data.success === true) {
        return thunkAPI.fulfillWithValue(response.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const dibsPost = createAsyncThunk(
  'dibsPost',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.put(`/auth/posts/${payload}/likes`);
      console.log(response);
      if (response.data.success === true) {
        return thunkAPI.fulfillWithValue(response.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: {
    // initialState를 쓰려면 configstore에 등록줘야함
    [getPost.fulfilled]: (state, action) => {
      state.post = action.payload;
    },
    [getReviewPost.fulfilled]: (state, action) => {
      state.post = action.payload;
    },
    [addPost.fulfilled]: (state, action) => {
      state.post = action.payload;
    },
    [dibsPost.fulfilled]: (state, action) => {
      if (action.payload === '찜하기 취소!') {
        state.post.like = !state.post.like;
        state.post.likeCount = state.post.likeCount - 1;
      } else {
        state.post.like = !state.post.like;
        state.post.likeCount = state.post.likeCount + 1;
      }
    },
    [deletePost.fulfillWithValue]: (state, action) => {
      state.post = action.post.filter((item) => item.postId != action.payload);
    },
    [updatePost.fulfilled]: (state, action) => {
      state.post= action.payload;
    },

  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const {} = postSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.

export default postSlice.reducer;
