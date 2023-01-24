import React , { useState , useCallback } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Menu , Input , Row , Col } from "antd";
import Router, { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import useInput from './hooks/useInput';
import UserProfile from './UserProfile';
import LoginForm from "./LoginForm";

import styled , {createGlobalStyle} from "styled-components";

const SearchInput = styled(Input.Search)`
    vertical-align : middle;
`

const Global = createGlobalStyle`
    .ant-row{
        margin-right : 0 !important;
        margin-left : 0 !important;
    }

    .ant-col:first-child{
        padding-left : 0 !important;
    }

    .ant-col:last-child{
        padding-right : 0 !important;
    }
`

//const style = useMemo(() => ({ marginTop : 10 }), []);

export const AppLayout = ({ children }) => {
    const { me } = useSelector((state) => state.user);
    const [ searchInput, onChangeSearchInput ] = useInput('');
    const router = useRouter();
    return (
        <>
            <div>
                <Global />
                <div>
                    <Menu
                        mode="horizontal"
                        selectedKeys={[router.pathname]}
                        items={[
                        { label: <Link href="/">노드버드</Link>, key: '/' },
                        { label: <Link href="/profile">프로필</Link>, key: '/profile' },
                        { label: <SearchInput
                            enterButton
                            value={searchInput}
                            onChange={onChangeSearchInput}
                        />,
                            key: '/search' },
                        ]}
                    />
                    <Row gutter={10}>
                        <Col xs={24} md={6}>
                            {me ? <UserProfile /> : <LoginForm /> }
                        </Col>
                        <Col xs={24} md={12}>
                            {children}
                        </Col>
                        <Col xs={24} md={6}>
                            <a href="https://www.github.com/jawon0407" target="_blank" rel="noreferrer noopener">
                                Made by jawon0407
                            </a>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

AppLayout.propTypes = {
    children : PropTypes.node.isRequired,
}

export default AppLayout;