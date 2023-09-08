import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Input, Menu, Row, Col } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import Router from 'next/router';

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import useInput from '../hooks/useInput';
import logoImage from '../images/logo.png';

const AppMenu = styled(Menu)`
  position: sticky;
  top: 0;
  z-index: 1;
  height: 56px;
  display: block;
  padding: 0 10px;

  & .ant-row {
    height: 56px;
  }
`;

const Global = createGlobalStyle`
  .ant-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }

  .ant-col:first-child {
    padding-left: 0 !important;
  }

  .ant-col:last-child {
    padding-right: 0 !important;
  }

  textarea.ant-input {
    resize: none;
  }
`;

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const [searchInput, onChangeSearchInput] = useInput('');

  const onSearch = useCallback(() => {
    if (!searchInput) return;
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <div>
      <Global />
      <AppMenu mode="horizontal">
        <Row gutter={20} justify="center" align="center">
          <Col md={4} style={{ textAlign: 'center' }}>
            <Link href="/">
              <a>
                <img src={logoImage} alt="birdletter-logo" height="32px" />
              </a>
            </Link>
          </Col>
          <Col md={10}>
            <Input.Search
              enterButton
              style={{ verticalAlign: 'middle' }}
              value={searchInput}
              onChange={onChangeSearchInput}
              onSearch={onSearch}
            />
          </Col>
        </Row>
      </AppMenu>
      <Row gutter={20} justify="center" style={{ padding: 10 }}>
        <Col xs={24} md={4}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={10}>
          {children}
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
