import { createSlice } from '@reduxjs/toolkit';
import { 
    logIn , logOut , signUp , 
    followUser , unFollowUser , loadUser , removeFollower , 
    loadMyInfo , changeNickname 
} from '../actions/user';

export const initialState = {
    me: null, // 내 정보
    userInfo: null, // 유저 정보
    loadMyInfoLoading: false, // 로그인 정보 조회
    loadMyInfoDone: false,
    loadMyInfoError: null,
    loadUserLoading: false, // 유저 정보 조회
    loadUserDone: false,
    loadUserError: null,
    loadFollowerUsersLoading: false, // 팔로워 조회
    loadFollowerUsersDone: false,
    loadFollowerUsersError: null,
    loadFollowingUsersLoading: false, // 팔로잉 조회
    loadFollowingUsersDone: false,
    loadFollowingUsersError: null,
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
    removeFollowerLoading: false, // 팔로워 삭제
    removeFollowerDone: false,
    removeFollowerError: null,
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
            state.me.Posts = state.me.Posts.filter((v) => v.id !== action.payload.PostId);
            console.log(state.me.Posts);
        }
    },
    extraReducers : (builder) => builder
        .addCase(loadMyInfo.pending , (state, action) => {
            state.loadMyInfoLoading = true;
            state.loadMyInfoDone = false;
            state.loadMyInfoError = null;
        })
        .addCase(loadMyInfo.fulfilled , (state, action) => {
            state.loadMyInfoLoading = false;
            state.loadMyInfoDone = true;
            state.me = action.payload;
        })
        .addCase(loadMyInfo.rejected , (state, action) => {
            state.loadMyInfoLoading = false;
            state.loadMyInfoError = action.payload;
        })
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
            state.logInError = action.payload;
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
            state.signUpError = action.payload;
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
        .addCase(removeFollower.pending , (state, action) => {
            state.removeFollowerLoading = true;
            state.removeFollowerDone = false;
            state.removeFollowerError = null;
        })
        .addCase(removeFollower.fulfilled , (state, action) => {
            state.removeFollowerLoading = false;
            state.removeFollowerDone = true;
            state.me.Followers = state.me.Followers.filter((v) => v.id !== action.payload.UserId);
        })
        .addCase(removeFollower.rejected , (state, action) => {
            state.removeFollowerError = action.payload;
        })
        .addCase(changeNickname.pending , (state, action) => {
            state.changeNicknameLoading = true;
            state.changeNicknameDone = false;
            state.changeNicknameError = null;
        })
        .addCase(changeNickname.fulfilled , (state, action) => {
            state.changeNicknameLoading = false;
            state.changeNicknameDone = true;
            state.me.nickname = action.payload.nickname;
        })
        .addCase(changeNickname.rejected , (state, action) => {
            state.changeNicknameLoading = false;
            state.changeNicknameError = action.error;
        })
        .addCase(loadUser.pending, (state) => {
            state.loadUserLoading = true;
            state.loadUserDone = false;
            state.loadUserError = null;
          })
          .addCase(loadUser.fulfilled, (state, action) => {
            state.loadUserLoading = false;
            state.loadUserDone = true;
            state.userInfo = action.payload;
          })
          .addCase(loadUser.rejected, (state, action) => {
            state.loadUserLoading = false;
            state.loadUserError = action.payload;
          })
});

export default userSlice;