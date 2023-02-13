import { createSlice } from '@reduxjs/toolkit';
import { 
  loadPost , 
  loadPosts, 
  addPost , 
  removePost , 
  likePost , 
  unLikePost , 
  retweetPost ,
  addComment , 
  uploadImages 
} from '../actions/post';

export const initialState = {
    mainPosts: [],
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
      removeImage(state,action){
        state.imagePaths = state.imagePaths.filter((v,i) => i !== action.payload);
      }
    },
    extraReducers : (builder) => builder
      .addCase(loadPost.pending, (state, action) => {
          state.loadPostLoading =  true;
          state.loadPostDone = false;
      })
      .addCase(loadPost.fulfilled, (state, action) => {
          state.loadPostLoading =  false;
          state.loadPostDone = true;
          state.singlePost = action.payload;
      })
      .addCase(loadPost.rejected, (state, action) => {
          state.loadPostLoading =  false;
          state.loadPostError = action.payload;
      })
      .addCase(loadPosts.pending, (state, action) => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.mainPosts = action.payload;
        state.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.payload;
      })
      .addCase(addPost.pending , (state, action) => {
        state.addPostLoading = true;
        state.addPostDone = false;
        state.addPostError = null;
      })
      .addCase(addPost.fulfilled , (state, action) => {
        state.addPostLoading = false;
        state.addPostDone = true;
        state.mainPosts.unshift(action.payload);
        state.imagePaths = [];
        })
      .addCase(addPost.rejected , (state, action) => {
        state.addPostLoading = false;
        state.addPostError = action.payload;
      })
      .addCase(uploadImages.pending , (state, action) => {
        state.uploadImagesLoading = true;
        state.uploadImagesDone = false;
        state.uploadImagesError = null;
      })
      .addCase(uploadImages.fulfilled , (state, action) => {
        state.uploadImagesLoading = false;
        state.uploadImagesDone = true;
        state.imagePaths = action.payload;
      })
      .addCase(uploadImages.rejected , (state, action) => {
        state.uploadImagesLoading = false;
        state.uploadImagesError = action.payload.message;
      })
      .addCase(addComment.pending , (state , action) =>{
        state.addCommentLoading = true;
        state.addCommentDone = false;
        state.addCommentError = null;
      })
      .addCase(addComment.fulfilled , (state , action) =>{
        state.addCommentLoading = false;
        state.addCommentDone = true;
        const post = state.mainPosts.find((v) => v.id === action.payload.PostId);
        post.Comments.unshift(action.payload);
      })
      .addCase(addComment.rejected , (state , action) =>{
        state.addCommentLoading = false;
        state.addCommentError = action.payload;
      })
      .addCase(removePost.pending , (state , action) =>{
        state.removePostLoading = true;
        state.removePostDone = false;
        state.removePostError = null;
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.removePostLoading = false;
        state.removePostDone = true;
        state.mainPosts = state.mainPosts.filter((v) => v.id !== action.payload.PostId);
      })
      .addCase(removePost.rejected, (state, action) => {
        state.removePostLoading = false;
        state.removePostError = action.payload;
      }) 
      .addCase(likePost.pending, (state, action) => {
        state.likePostLoading = true;
        state.likePostDone = false;
        state.likePostError = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.likePostLoading = false;
        state.likePostDone = true;
        const post = state.mainPosts.find((v) => v.id === action.payload.PostId); // 해당 게시글 찾기
        post.Likers.push({ id: action.payload.UserId }); // 좋아요 누른 사람 추가
      })
      .addCase(likePost.rejected, (state, action) => {
        state.likePostLoading = false;
        state.likePostError = action.payload;
      })
      .addCase(unLikePost.pending, (state, action) => {
        state.unLikePostLoading = true;
        state.unLikePostDone = false;
        state.unLikePostError = null;
      })
      .addCase(unLikePost.fulfilled, (state, action) => {
        state.unLikePostLoading = false;
        state.unLikePostDone = true;
        const post = state.mainPosts.find((v) => v.id === action.payload.PostId);
        post.Likers = post.Likers.filter((v) => v.id !== action.payload.UserId);
      })
      .addCase(unLikePost.rejected, (state, action) => {
        state.unLikePostLoading = false;
        state.unLikePostError = action.payload;
      })
      .addCase(retweetPost.pending, (state, action) => {
        state.retweetLoading = true;
        state.retweetDone = false;
        state.retweetError = null;
      })
      .addCase(retweetPost.fulfilled, (state, action) => {
        state.retweetLoading = false;
        state.retweetDone = true;
        state.mainPosts.unshift(action.payload);
      })
      .addCase(retweetPost.rejected, (state, action) => {
        state.retweetLoading = false;
        state.retweetError = action.payload;
      })
});

export default postSlice;