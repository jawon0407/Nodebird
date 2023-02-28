import { createSlice } from '@reduxjs/toolkit';
import { 
  loadPost , 
  loadPosts, 
  addPost , 
  removePost , 
  likePost , 
  unLikePost , 
  retweetPost ,
  editPost ,
  addComment , 
  uploadImages ,
  loadUserPosts,
  loadHashtagPosts,
  likeComment,
  unLikeComment,
  removeComment,
  editComment
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
    likePostLoading: false,
    likePostDone: false,
    likePostError: null,
    editPostLoading: false,
    editPostDone: false,
    editPostError: null,
    uploadImagesLoading: false,
    uploadImagesDone: false,
    uploadImagesError: null,
    retweetLoading: false,
    retweetDone: false,
    retweetError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
    likeCommentLoading : false,
    likeCommentDone : false,
    likeCommentError : null,
    unLikeCommentLoading : false,
    unLikeCommentDone : false,
    unLikeCommentError : null,
    removeCommentLoading : false,
    removeCommentDone : false,
    removeCommentError : null,
    retweetCommentLoading : false,
    retweetCommentDone : false,
    retweetCommentError : null,
    editCommentLoading : false,
    editCommentDone : false,
    editCommentError : null
}

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
      .addCase(loadHashtagPosts.pending, (state) => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;
      })
      .addCase(loadHashtagPosts.fulfilled, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.mainPosts = action.payload;
        state.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadHashtagPosts.rejected, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.error.message;
      })
      .addCase(loadUserPosts.pending, (state) => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;
      })
      .addCase(loadUserPosts.fulfilled, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.mainPosts = action.payload;
        state.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadUserPosts.rejected, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.error.message;
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
      .addCase(editPost.pending , (state, action) => {
        state.editPostLoading = true;
        state.editPostDone = false;
        state.editPostError = null;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.editPostLoading = false;
        state.editPostDone = true;
        state.mainPosts.find((v) => v.id === action.payload.PostId).content = action.payload.content;
      })
      .addCase(editPost.rejected, (state, action) => {
        state.editPostLoading = false;
        state.editPostError = action.payload;
      })
      .addCase(likeComment.pending, (state, action) => {
        state.likeCommentLoading = true;
        state.likeCommentDone = false;
        state.likeCommentError = null;
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        state.likeCommentLoading = false;
        state.likeCommentDone = true;
        const post = state.mainPosts.find((v) => v.id === action.payload.PostId);
        const comment = post.Comments.find((v) => v.id === action.payload.CommentId);
        comment.CommentLikers.push({ id: action.payload.UserId });
      })
      .addCase(likeComment.rejected, (state, action) => {
        state.likeCommentLoading = false;
        state.likeCommentError = action.payload;
      })
      .addCase(unLikeComment.pending, (state, action) => {
        state.unLikeCommentLoading = true;
        state.unLikeCommentDone = false;
        state.unLikeCommentError = null;
      })
      .addCase(unLikeComment.fulfilled, (state, action) => {
        state.unLikeCommentLoading = false;
        state.unLikeCommentDone = true;
        const post = state.mainPosts.find((v) => v.id === action.payload.PostId);
        const comment = post.Comments.find((v) => v.id === action.payload.CommentId);
        comment.CommentLikers = comment.CommentLikers.filter((v) => v.id !== action.payload.UserId);
      })
      .addCase(unLikeComment.rejected, (state, action) => {
        state.unLikeCommentLoading = false;
        state.unLikeCommentError = action.payload;
      })
      .addCase(removeComment.pending, (state, action) => {
        state.removeCommentLoading = true;
        state.removeCommentDone = false;
        state.removeCommentError = null;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.removeCommentLoading = false;
        state.removeCommentDone = true;
        const post = state.mainPosts.find((v) => v.id === action.payload.PostId);
        post.Comments = post.Comments.filter((v) => v.id !== action.payload.CommentId);
      })
      .addCase(removeComment.rejected, (state, action) => {
        state.removeCommentLoading = false;
        state.removeCommentError = action.payload;
      })
      .addCase(editComment.pending , (state, action) => {
        state.editCommentLoading = true;
        state.editCommentDone = false;
        state.editCommentError = null;
      })
      .addCase(editComment.fulfilled, (state, action) => {
        state.editCommentLoading = false;
        state.editCommentDone = true;
        const post = state.mainPosts.find((v) => v.id === action.payload.PostId);
        post.Comments.find((v) => v.id === action.payload.CommentId).content = action.payload.content;
      })
      .addCase(editComment.rejected, (state, action) => {
        state.editCommentLoading = false;
        state.editCommentError = action.payload;
      })
});

export default postSlice;