import React, { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import { Button, Checkbox, Form, Modal } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';

import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import { LOAD_MY_INFO_REQUEST, SIGN_UP_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import LabelInput from '../components/LabelInput';

const ErrorMessage = styled.div`
  color: red;
`;

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError, me } = useSelector(
    (state) => state.user,
  );

  useEffect(() => {
    if (me && me.id) {
      Router.replace('/');
    }
  }, [me && me.id]);

  useEffect(() => {
    if (signUpDone) {
      Router.replace('/');
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      Modal.warning({
        title: '회원가입 실패',
        content: signUpError,
        okText: '확인',
      });
    }
  }, [signUpError]);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password],
  );

  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(!e.target.checked);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }

    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  }, [email, password, nickname, passwordCheck, term]);

  return (
    <>
      <Head>
        <title>회원가입 | Birdletter</title>
      </Head>
      <AppLayout>
        <Form onFinish={onSubmit}>
          <LabelInput
            name="user-email"
            type="email"
            label="이메일"
            value={email}
            required
            sx={{ marginTop: 10 }}
            onChange={onChangeEmail}
          />
          <LabelInput
            name="user-nickname"
            label="닉네임"
            value={nickname}
            required
            onChange={onChangeNickname}
          />
          <LabelInput
            name="user-password"
            type="password"
            label="비밀번호"
            value={password}
            required
            onChange={onChangePassword}
          />
          <LabelInput
            name="user-password-check"
            type="password"
            label="비밀번호 확인"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
            append={
              passwordError && (
                <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
              )
            }
          />
          <div style={{ marginTop: 5 }}>
            <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
              개인정보 이용에 동의합니다.
            </Checkbox>
            {termError && (
              <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>
            )}
          </div>
          <div style={{ marginTop: 10, textAlign: 'right' }}>
            <Button type="primary" htmlType="submit" loading={signUpLoading}>
              가입하기
            </Button>
          </div>
        </Form>
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const cookie = req ? req.headers.cookie : '';
      axios.defaults.headers.Cookie = '';
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
      store.dispatch(END);
      await store.sagaTask.toPromise();
    },
);

export default Signup;
