import { createSlice } from '@reduxjs/toolkit';
import { logIn , logOut } from '../actions/user';

export const initialState = {
    me: null, // 내 정보
    userInfo: null, // 유저 정보
    loadMyInfoLoading: false, // 로그인 정보 조회
    loadMyInfoDone: false,
    loadMyInfoError: null,
    loadUserLoading: false, // 유저 정보 조회
    loadUserDone: false,
    loadUserError: null,
    loginLoading: false, // 로그인 시도중
    loginDone: false,
    loginError: null,
    logoutLoading: false, // 로그아웃 시도중
    logoutDone: false,
    logoutError: null,
    signupLoading: false, // 회원가입 시도중
    signupDone: false,
    signupError: null,
    changeNicknameLoading: false, // 닉네임 변경 시도중
    changeNicknameDone: false,
    changeNicknameError: null,
    followLoading: false, // 팔로우
    followDone: false,
    followError: null,
}

//toolkit 사용방법

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers:{

    },
    extraReducers : (builder) => builder
        .addCase(logIn.pending , (state, action) => {
            state.loginLoading = true;
            state.loginDone = false;
            state.loginError = null;
        })
        .addCase(logIn.fulfilled , (state, action) => {
            state.loginLoading = false;
            state.loginDone = true;
            state.me = action.payload;
        })
        .addCase(logIn.rejected , (state, action) => {
            state.loginLoading = false;
            state.loginError = action.error;
        })
        .addCase(logOut.pending , (state, action) => {
            state.logoutLoading = true;
            state.logoutDone = false;
            state.logoutError = null;
        })
        .addCase(logOut.fulfilled, (state , action) => {
            state.logoutLoading = false;
            state.logoutDone = true;
            state.me = null;
        })
        .addCase(logOut.rejected, (state , action) => {
            state.logoutLoading = false;
            state.logoutError = action.error;
        })
});

export default userSlice;