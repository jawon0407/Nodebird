import {createAsyncThunk} from "@reduxjs/toolkit";
import userSlice from "../reducers/userSlice";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4070';
axios.defaults.withCredentials = true;

export const loadPost = createAsyncThunk('post/loadPost' , async(data, {rejectWithValue}) => {
    try{
        const response = await axios.get(`/post/${data}`);
        return response.data;
    }catch(error){
        console.log(error);
        return rejectWithValue(error.response.data);
    }
})

export const loadPosts = createAsyncThunk('post/loadPosts' , async(data, {rejectWithValue}) => {
    try{
        const response = await axios.get(`/posts?lastId=${data || 0}`);
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data);
    }
})

export const addPost = createAsyncThunk('post/addPost', async (data, thunkAPI) => {
    try {
      const response = await axios.post('/post', data);
      thunkAPI.dispatch(userSlice.actions.addPostToMe(response.data.id));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });

  
export const removePost = createAsyncThunk('post/removePost' , async (data, thunkAPI) => { 
    try{
        const response = await axios.delete(`/post/${data}`)
        thunkAPI.dispatch(userSlice.actions.removePostToMe(response.data));
        return response.data;
    }
    catch(error){
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});

export const retweetPost = createAsyncThunk('post/retweetPost' , async (data, {rejectWithValue}) => {
    try{
        const response = await axios.post(`/post/${data}/retweet`);
        return response.data;
    }catch(error){
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});

export const addComment = createAsyncThunk('post/addComment' , async(data , { rejectWithValue }) => {
    try{
        const response = await axios.post(`/post/${data.postId}/comment`, data);
        return response.data;
    }catch(error){
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});

export const uploadImages = createAsyncThunk('post/addImage' , async(data , { rejectWithValue }) => {
    try{
        const response = await axios.post(`/post/images`, data);
        return response.data;
    }catch(error){
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});

export const likePost = createAsyncThunk('post/likePost' , async (data, {rejectWithValue}) => {
    try{
        const response = await axios.patch(`/post/${data}/like`);
        return response.data;
    }catch(error){
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});

export const unLikePost = createAsyncThunk('post/unLikePost' , async (data, {rejectWithValue}) => {
    try{
        const response = await axios.delete(`/post/${data}/like`);
        return response.data;
    }catch(error){
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});