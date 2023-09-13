import React, { useEffect, useCallback } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import useInput from '../hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentLoading, addCommentDone } = useSelector(
    (state) => state.post,
  );

  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id },
    });
  }, [commentText, id]);

  return (
    <Form
      style={{ marginTop: 10, textAlign: 'right' }}
      onFinish={onSubmitComment}
    >
      <Form.Item style={{ marginBottom: 10 }}>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
          disabled={!id}
          placeholder={!id ? '로그인이 필요합니다' : '댓글을 입력하세요'}
        />
        {id && (
          <Button
            style={{ marginTop: 10, zIndex: 1 }}
            type="primary"
            htmlType="submit"
            loading={addCommentLoading}
          >
            등록
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
