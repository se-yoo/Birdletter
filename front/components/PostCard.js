import React, { useCallback, useState } from 'react';
import { Avatar, Button, Card, List, Popover, Comment, Modal } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import Link from 'next/link';
import moment from 'moment';

import {
  LIKE_POST_REQUEST,
  REMOVE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  RETWEET_REQUEST,
  UNRETWEET_REQUEST,
  UPDATE_POST_REQUEST,
} from '../reducers/post';
import PostImages from './PostImages';
import useToggle from '../hooks/useToggle';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import FollowButton from './FollowButton';
import PostCardAction from './PostCardAction';

moment.locale('ko');

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { removePostLoading } = useSelector((state) => state.post);
  const id = me?.id;
  const liked = post.Likers.find((v) => v.id === id);
  const retweeted =
    (post.User.id === id && post.RetweetId) ||
    post.Retweeters.find((v) => v.id === id);
  const [commentFormOpened, onToggleComment] = useToggle(false);
  const [editMode, setEditMode] = useState(false);

  const openLoginModal = useCallback(() => {
    Modal.warning({
      title: '오류 발생',
      content: '로그인이 필요합니다.',
      okText: '확인',
    });
  }, []);

  const onClickUpdate = useCallback(() => {
    setEditMode(true);
  }, []);

  const onCancelUpdate = useCallback(() => {
    setEditMode(false);
  }, []);

  const onRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const onChangePost = useCallback(
    (editText) => () => {
      dispatch({
        type: UPDATE_POST_REQUEST,
        data: {
          id: post.id,
          content: editText,
        },
      });
    },
    [],
  );

  const onLike = useCallback(() => {
    if (!id) {
      return openLoginModal();
    }
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const onUnlike = useCallback(() => {
    if (!id) {
      return openLoginModal();
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const onUnRetweet = useCallback(() => {
    if (!id) {
      return openLoginModal();
    }
    return dispatch({
      type: UNRETWEET_REQUEST,
      data: post.RetweetId || post.id,
    });
  }, [id]);

  const onRetweet = useCallback(() => {
    if (!id) {
      return openLoginModal();
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [id]);

  return (
    <div style={{ marginBottom: 10 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <PostCardAction
            type="retweet"
            active={retweeted}
            color="#2bbb00"
            count={post.Retweeters.length}
            onActive={onRetweet}
            onInactive={onUnRetweet}
          />,
          <PostCardAction
            type="heart"
            active={liked}
            color="#eb2f96"
            count={post.Likers.length}
            onActive={onLike}
            onInactive={onUnlike}
          />,
          <PostCardAction
            type="comment"
            color="#eb2f96"
            count={post.Comments.length}
            onActive={onToggleComment}
            onInactive={onToggleComment}
          />,
          id && post.User.id === id ? (
            <Popover
              key="more"
              content={
                <Button.Group>
                  {!post.RetweetId && (
                    <Button onClick={onClickUpdate}>수정</Button>
                  )}
                  <Button
                    type="danger"
                    loading={removePostLoading}
                    onClick={onRemovePost}
                  >
                    삭제
                  </Button>
                </Button.Group>
              }
            >
              <EllipsisOutlined />
            </Popover>
          ) : (
            <></>
          ),
        ]}
        title={
          post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null
        }
        extra={id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet ? (
          <Card
            cover={
              post.Retweet.Images[0] && (
                <PostImages images={post.Retweet.Images} />
              )
            }
          >
            <div style={{ float: 'right' }}>
              {moment(post.createdAt).format('YYYY.MM.DD')}
            </div>
            <Card.Meta
              avatar={
                <Link href={`/user/${post.Retweet.User.id}`} prefetch={false}>
                  <a>
                    <Avatar>{post.Retweet.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.Retweet.User.nickname}
              description={<PostCardContent postData={post.Retweet.content} />}
            />
          </Card>
        ) : (
          <Card.Meta
            avatar={
              <Link href={`/user/${post.User.id}`} prefetch={false}>
                <a>
                  <Avatar>{post.User.nickname[0]}</Avatar>
                </a>
              </Link>
            }
            title={post.User.nickname}
            description={
              <PostCardContent
                editMode={editMode}
                onChangePost={onChangePost}
                onCancelUpdate={onCancelUpdate}
                postData={post.content}
              />
            }
          />
        )}
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    Retweeters: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.object,
  }).isRequired,
};

export default PostCard;
