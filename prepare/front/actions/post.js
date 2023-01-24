import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';
import faker from "faker";
import shortid from "shortid";
import userSlice from "../reducers/userSlice";

const delay = (data , time) => new Promise((resolve , reject) =>{
    setTimeout(() =>{
        return resolve(data);
    }, time)
});

const getDummyPost = (number) => {
    return Array(number).fill().map((v,i) => ({
        id : shortid.generate(),
        User : {
            id : shortid.generate(),
            nickname : faker.name.findName(),
        },
        content : faker.lorem.paragraph(),
        Images : [],
        Comments : [
            {
                id : shortid.generate(),
                User : {
                    id : shortid.generate(),
                    nickname : faker.name.findName(),
                },
                content : faker.lorem.sentence(6),
            }
        ],
    }));
} 


export const addPost = createAsyncThunk('post/addPost' , async (data, thunkAPI) => {
    try{
        const result = await delay(data, 1000);
        thunkAPI.dispatch(userSlice.actions.addPostToMe(result.id));
        return result;
    }
    catch(error){
        console.log(error);
    }
});

export const addComment = createAsyncThunk('post/addComment' , async(data , { rejectWithValue }) => {
    try{
        const result = await delay(data, 1000);
        return result;
    }catch(error){
        return rejectWithValue(error);
    }
    //return axios.post(`/post/${data.postId}/comment` , data);
});

export const removePost = createAsyncThunk('post/removePost' , async (data, thunkAPI) => { 
    try{
        const result = await delay(data, 1000);
        thunkAPI.dispatch(userSlice.actions.removePostToMe(result));
        return result;
    }
    catch(error){
        console.log(error);
    }
});

export const loadPost = createAsyncThunk('post/loadPosts' , async (data , thunkAPI) => {
    try{
        const result = await delay(getDummyPost(data), 1000);
        return result;
    }
    catch(error){
        console.log(error);
    }
});
