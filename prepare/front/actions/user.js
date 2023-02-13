import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4070'; //기본 url을 설정해준다.
axios.defaults.withCredentials = true; // 쿠키를 전달해준다.

export const loadMyInfo = createAsyncThunk('user/loadMyInfo' , async () => {
    try{
        const response = await axios.get('/user');
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data);
    }
});

export const logIn = createAsyncThunk('user/login' , async (data, {rejectWithValue}) => {
    try{
        const response = await axios.post('/user/login', data);
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data);
    }
});

export const logOut = createAsyncThunk('user/logout' , async () => {
    const response = await axios.post('/user/logout');
    return response.data;
});

export const signUp = createAsyncThunk('user/signup' , async (data, { rejectWithValue }) => {
    try{
        const response = await axios.post('/user' , data);
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data);
    }
});

export const followUser = createAsyncThunk('user/followUser', async (data ,  {rejectWithValue }) => {
    try{
        const response = await axios.patch(`/user/${data}/follow`);
        return response.data;
    }catch(error){
        console.log(error);
        return rejectWithValue(error.response.data);
    };
}) 

export const unFollowUser = createAsyncThunk('user/unFollowUser', async (data ,  {rejectWithValue }) => {
    try{
        //delete는 body를 못받는다.
        const response = await axios.delete(`/user/${data}/follow`);
        return response.data;
    }catch(error){
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});

export const removeFollower = createAsyncThunk('user/removeFollower' , async (data, {rejectWithValue}) => {
    try{
        const response = await axios.delete(`/user/follow/${data}`);
        return response.data;
    }catch(error){
        console.log(error);
        return rejectWithValue(error.response.data);
    }
})

export const loadFollowerUsers = createAsyncThunk('user/unFollowUser', async (data ,  {rejectWithValue }) => {
    try{
        const response = await axios.get(`/user/${data}/follow`);
        return response.data;
    }catch(error){
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});

export const loadFollowingUsers = createAsyncThunk('user/unFollowUser', async (data ,  {rejectWithValue }) => {
    try{
        const response = await axios.get(`/user/${data}/follow`);
        return response.data;
    }catch(error){
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});

export const changeNickname = createAsyncThunk('user/nickname' , async(data , {rejectWithValue}) => {
    try{
        const response = await axios.patch('/user/nickname', data);
        return response.data;
    }catch(error){
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});

export const loadUser = createAsyncThunk('user/loadUser' , async (data , {rejectWithValue}) => {
    try{
        const response = await axios.get(`/user/${data}` , data);
        return response.data
    }catch(error){
        console.log(error);
        return rejectWithValue(error.response.data)
    }
})
    