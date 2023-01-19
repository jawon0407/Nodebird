import React from 'react';
//nextJS 에서는 안써도 되는데, 일단 써놓자.
import Head from 'next/head';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
    const followingList = [{
        nickname: "Jawon0407",
        profile_text: "Hello my name is Jaewon Cho studying react nodebird" 
    },{
        nickname: "Blessed_Leo",
        profile_text: "my name is Blessed_Leo" 
    },{
        nickname: "ZeroCho",
        profile_text : "my react teacher"
    }]
    const followerList = [{
        nickname: "Jawon0407",
        profile_text: "Hello my name is Jaewon Cho studying react nodebird" 
    },{
        nickname: "Blessed_Leo",
        profile_text: "my name is Blessed_Leo" 
    },{
        nickname: "ZeroCho",
        profile_text : "my react teacher"
    }] 

    return(
        <>
            <AppLayout>
                <Head>
                    <title>내 프로필 | NodeBird</title>
                </Head>  
                <NicknameEditForm />
                <FollowList header="팔로잉 목록" data={followingList}/>
                <FollowList header="팔로워 목록" data={followerList}/>
            </AppLayout>
        </>
    )
}

export default Profile;