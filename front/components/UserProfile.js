import React, { useCallback } from 'react';
import { Avatar, Button, Card } from 'antd';
import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Card
      actions={[
        <Link href={`/user/${me.id}`}>
          <a>
            <div key="twit">
              짹짹
              <br />
              {me.Posts.length}
            </div>
          </a>
        </Link>,
        <Link href="/profile">
          <a>
            <div key="followings">
              팔로잉
              <br />
              {me.Followings.length}
            </div>
          </a>
        </Link>,
        <Link href="/profile">
          <a>
            <div key="followers">
              팔로워
              <br />
              {me.Followers.length}
            </div>
          </a>
        </Link>,
      ]}
    >
      <Card.Meta
        avatar={
          <Link href={`/user/${me.id}`} prefetch={false}>
            <a>
              <Avatar>{me.nickname[0]}</Avatar>
            </a>
          </Link>
        }
        title={me.nickname}
        description={
          <>
            <Button style={{ marginRight: 10 }}>
              <Link href="/profile">
                <a>프로필</a>
              </Link>
            </Button>
            <Button onClick={onLogOut} loading={logOutLoading}>
              로그아웃
            </Button>
          </>
        }
      />
    </Card>
  );
};

export default UserProfile;
