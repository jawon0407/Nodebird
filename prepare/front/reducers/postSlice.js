import { createSlice } from '@reduxjs/toolkit';
import { addPost } from '../actions/post';

export const initialState = {
    mainPosts: [{
      id: 1,
      User: {
        id: 1,  
        nickname: '재원 조',
      },
      content: '첫 번째 게시글 #해시태그 #익스프레스',
      Images: [{
        src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
      }, {
        src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
      }, {
        src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
    }],
      Comments: [{
        User: {
          nickname: 'Leo',
        },
        content: '우와 개정판이 나왔군요~',
      }, {
        User: {
          nickname: 'Jawon',
        },
        content: '얼른 사고 싶어요~',
      }]
    }],
    hasMorePosts: true, // 다음 posts 여부
    singlePost: null,
    imagePaths: [],
    loadPostsLoading: false,
    loadPostsDone: false,
    loadPostsError: null,
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    updatePostLoading: false,
    updatePostDone: false,
    updatePostError: null,
    removePostLoading: false,
    removePostDone: false,
    removePostError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
    likePostLoading: false,
    likePostDone: false,
    likePostError: null,
    uploadImagesLoading: false,
    uploadImagesDone: false,
    uploadImagesError: null,
    retweetLoading: false,
    retweetDone: false,
    retweetError: null,
  };
  

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {

    },
    extraReducers : (builder) => builder
      .addCase(addPost.pending , (state, action) => {
          state.addPostLoading = true;
          state.addPostDone = false;
          state.addPostError = null;
      })
      .addCase(addPost.fulfilled , (state, action) => {
          state.addPostLoading = false;
          state.addPostDone = true;
          state.mainPosts.unshift(action.payload);
      })
      .addCase(addPost.rejected , (state, action) => {
          state.addPostLoading = false;
          state.addPostError = action.error;
      })
})

export default postSlice;