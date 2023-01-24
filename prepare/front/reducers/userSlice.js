import { createSlice } from '@reduxjs/toolkit';
import { logIn , logOut , signUp , followUser , unFollowUser } from '../actions/user';

export const initialState = {
    me: null, // 내 정보
    userInfo: null, // 유저 정보
    loadMyInfoLoading: false, // 로그인 정보 조회
    loadMyInfoDone: false,
    loadMyInfoError: null,
    loadUserLoading: false, // 유저 정보 조회
    loadUserDone: false,
    loadUserError: null,
    logInLoading: false, // 로그인 시도중
    logInDone: false,
    logInError: null,
    logOutLoading: false, // 로그아웃 시도중
    logOutDone: false,
    logOutError: null,
    signUpLoading: false, // 회원가입 시도중
    signUpDone: false,
    signUpError: null,
    changeNicknameLoading: false, // 닉네임 변경 시도중
    changeNicknameDone: false,
    changeNicknameError: null,
    followLoading: false, // 팔로우
    followDone: false,
    followError: null,
    unFollowLoading: false, // 언팔로우
    unFollowDone: false,
    unFollowError: null,
}
//toolkit 사용방법

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers:{
        addPostToMe(state, action){
            state.me.Posts.unshift({id : action.payload});
        },
        removePostToMe(state, action){
            state.me.Posts = state.me.Posts.filter((v) => v.id !== action.payload);
        }
    },
    extraReducers : (builder) => builder
        .addCase(logIn.pending , (state, action) => {
            state.logInLoading = true;
            state.logInDone = false;
            state.logInError = null;
        })
        .addCase(logIn.fulfilled , (state, action) => {
            state.logInLoading = false;
            state.logInDone = true;
            state.me = action.payload;
        })
        .addCase(logIn.rejected , (state, action) => {
            state.logInLoading = false;
            state.logInError = action.error;
        })
        .addCase(logOut.pending , (state, action) => {
            state.logOutLoading = true;
            state.logOutDone = false;
            state.logOutError = null;
        })
        .addCase(logOut.fulfilled, (state , action) => {
            state.logOutLoading = false;
            state.logOutDone = true;
            state.me = null;
        })
        .addCase(logOut.rejected, (state , action) => {
            state.logOutLoading = false;
            state.logOutError = action.error;
        })
        .addCase(signUp.pending, (state, action) => {
            state.signUpLoading = true;
            state.signUpDone = false;
            state.signUpError = null;
        })
        .addCase(signUp.fulfilled, (state, action) => {
            state.signUpLoading = false;
            state.signUpDone = true;
            
        })
        .addCase(signUp.rejected, (state, action) => {
            state.signUpLoading = false;
            state.signUpError = action.error;
        })
        .addCase(followUser.pending , (state, action) => {
            state.followLoading = true;
            state.followDone = false;
            state.followError = null;
        })
        .addCase(followUser.fulfilled , (state, action) => {
            state.followLoading = false;
            state.followDone = true;
            state.me.Followings.unshift({id : action.payload.UserId});
        })
        .addCase(followUser.rejected , (state, action) => {
            state.followLoading = false;
            state.followError = action.error;
        })
        .addCase(unFollowUser.pending , (state, action) => {
            state.unFollowLoading = true;
            state.unFollowDone = false;
            state.unFollowError = null;
        })
        .addCase(unFollowUser.fulfilled , (state, action) => {
            state.unFollowLoading = false;
            state.unFollowDone = true;
            state.me.Followings = state.me.Followings.filter((v) => v.id !== action.payload.UserId);
        })
        .addCase(unFollowUser.rejected , (state, action) => {
            state.unFollowLoading = false;
            state.unFollowError = action.error;
        })
});

export default userSlice;