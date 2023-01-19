import {createAsyncThunk} from "@reduxjs/toolkit";

const delay = (data , time) => new Promise((resolve , reject) =>{
    setTimeout(() =>{
        return resolve(data);
    }, time)
})

export const addPost = createAsyncThunk('post/addPost' , async (data, thunkAPI) => {
    try{
        const result = await delay({
            id: '재원 조',
            content: '더미데이터에요',
            User: {
                id: '재원 조',
                nickname: '재원 조'
            },
            Images: [],
            Comments: [{
                User: {
                    nickname: 'Leo',
                },
                    content: '우와 개정판이 나왔군요~',
                }, {
                User: {
                  nickname: 'Jawon',
                },
                    content: '얼른 사고 싶어요~',
              }]
        }, 1000);
        return result;
    }
    catch(error){
        console.log(error);
    }
})