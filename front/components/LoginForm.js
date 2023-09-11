import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Button, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hooks/useInput';
import { loginRequestAction } from '../reducers/user';
import LabelInput from './LabelInput';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading, logInError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <Form onFinish={onSubmitForm} style={{ padding: '10px' }}>
      <LabelInput
        name="user-email"
        type="email"
        label="이메일"
        value={email}
        required
        onChange={onChangeEmail}
      />
      <LabelInput
        name="user-password"
        type="password"
        label="비밀번호"
        value={password}
        required
        onChange={onChangePassword}
      />
      <div style={{ margin: '20px 0', textAlign: 'right' }}>
        <Button
          type="primary"
          htmlType="submit"
          loading={logInLoading}
          style={{ marginRight: 10 }}
        >
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
