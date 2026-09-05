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
  }, [dispatch]);

  return (
    <Card
      actions={[
        <Link href={`/user/${me.id}`} key="twit">
          <div>
            짹짹
            <br />
            {me.Posts.length}
          </div>
        </Link>,
        <Link href="/profile" key="followings">
          <div>
            팔로잉
            <br />
            {me.Followings.length}
          </div>
        </Link>,
        <Link href="/profile" key="followers">
          <div>
            팔로워
            <br />
            {me.Followers.length}
          </div>
        </Link>,
      ]}
    >
      <Card.Meta
        avatar={
          <Link href={`/user/${me.id}`} prefetch={false}>
            <Avatar>{me.nickname[0]}</Avatar>
          </Link>
        }
        title={me.nickname}
        description={
          <>
            <Button style={{ marginRight: 10 }} href="/profile">
              프로필
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
