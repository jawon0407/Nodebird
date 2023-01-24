import { createAsyncThunk } from "@reduxjs/toolkit";

const delay = (data , time) => new Promise((resolve, reject) => {
    setTimeout(() =>{
        return resolve(data);
    }, time)
});

export const logIn = createAsyncThunk('user/login' , async (data, thunkAPI) => {
    try{
        const result = await delay(data, 2000);
        return result;
    }catch(error){
        console.log(error);
    }
});

export const logOut = createAsyncThunk('user/logout' , async (data, thunkAPI) => {
    try{
        const result = await delay(data = null , 2000);
        return result;
    }catch(error){
        console.log(error);
    }
});

export const signUp = createAsyncThunk('user/signup' , async (data, thunkAPI) => {
    try{
        const result = await delay(data, 1000);
        return result
    }catch(error){
        console.log(error);
    }
});

export const followUser = createAsyncThunk('user/followUser', async (data , thunkAPI) => {
    try{
        console.log(`팔로우 : ${data}`)
        const result = await delay(data, 1000);
        return result;
    }catch(error){
        console.log(error);
    };
}) 

export const unFollowUser = createAsyncThunk('user/unFollowUser', async (data , thunkAPI) => {
    try{
        const result = await delay(data , 1000);
        return result;
    }catch(error){
        console.log(error);
    }
});
    