import { createSlice } from '@reduxjs/toolkit';
import shortid from 'shortid';
import { addPost , addComment , removePost , loadPost } from '../actions/post';
import faker from 'faker';

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
        id :  shortid.generate(),
        User: {
          id : shortid.generate(),
          nickname: 'Leo',
        },
        content: '우와 개정판이 나왔군요~',
      }, {
        id : shortid.generate(),
        User: {
          id : shortid.generate(),
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
  
initialState.mainPosts = initialState.mainPosts.concat(Array(10).fill().map(() => ({
    id: shortid.generate(),
    User: {
      id: shortid.generate(),
      nickname: faker.name.findName(),
    },
    content: faker.lorem.paragraph(),
    Images: [],
    Comments: [{
      id :  shortid.generate(),
      User: {
        id : shortid.generate(),
        nickname: faker.name.findName(),
      },
      content: faker.lorem.sentence(6),
    }],
  })));

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
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
      .addCase(addComment.pending , (state , action) =>{
          state.addCommentLoading = true;
          state.addCommentDone = false;
          state.addCommentError = null;
      })
      .addCase(addComment.fulfilled , (state , action) =>{
          state.addCommentLoading = false;
          state.addCommentDone = true;
          const post = state.mainPosts.find((v) => v.id === action.payload.postId);
          post.Comments.unshift(action.payload);
      })
      .addCase(addComment.rejected , (state , action) =>{
          state.addCommentLoading = false;
          state.addCommentError = action.error;
      })
      .addCase(removePost.pending , (state , action) =>{
          state.removePostLoading = true;
          state.removePostDone = false;
          state.removePostError = null;
      })
      .addCase(removePost.fulfilled, (state, action) => {
          state.removePostLoading = false;
          state.removePostDone = true;
          state.mainPosts = state.mainPosts.filter((v) => v.id !== action.payload);
      })
      .addCase(removePost.rejected, (state, action) => {
          state.removePostLoading = false;
          state.removePostError = action.error;
      })
      .addCase(loadPost.pending, (state, action) => {
          state.loadPostsLoading = true;
          state.loadPostsDone = false;
          state.loadPostsError = null;
      })
      .addCase(loadPost.fulfilled, (state, action) => {
          state.loadPostsLoading = false;
          state.loadPostsDone = true;
          state.mainPosts = action.payload.concat(state.mainPosts);
          state.hasMorePosts = action.payload.length < 100;
      })
      .addCase(loadPost.rejected, (state, action) => {
          state.loadPostsLoading = false;
          state.loadPostsError = action.error;
      }) 
});

export default postSlice;