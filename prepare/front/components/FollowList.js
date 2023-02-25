import React from 'react';
import PropTypes from 'prop-types';
import { List, Button, Card } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { unFollowUser , removeFollower } from '../actions/user';

const FollowList = ({header, data}) => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const onCancel = (id) => () => {
        if(header = '팔로잉 목록'){
            dispatch(unFollowUser(id));
        }
        if(header = '팔로워 목록'){
            dispatch(removeFollower(id));
        }
    };

    return(
        <>
            <List
                style = {{marginBottom: 20 , width:'100%'}}
                grid = {{gutter: 4, xs: 2, md: 3}}
                size = "small"
                header = {<div>{header}</div>}
                loadMore = {
                    <div style={{ textAlign: 'center' , margin: '10px 0' }}>
                        <Button style={{width: '100%'}}>더 보기</Button>
                    </div>
                }
                bordered
                dataSource = {data}
                renderItem = {(item) => (
                    <List.Item style={{ marginTop: 20 }}>
                        <Card actions = {[<StopOutlined key="stop" onClick={onCancel(item.id)}/>]}>
                            <Card.Meta description = {
                                <div>
                                    <div style={{ textAlign : 'center' }}>{item.nickname}</div>
                                </div>
                            }/>
                        </Card>
                    </List.Item>
                )}
            />
        </>
    );
};

FollowList.propTypes = {
    header : PropTypes.string.isRequired,
    data : PropTypes.array.isRequired,
};

export default FollowList;