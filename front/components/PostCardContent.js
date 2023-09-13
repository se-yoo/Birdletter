import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/dist/client/link';
import { Button, Input } from 'antd';
import { useSelector } from 'react-redux';

import useInput from '../hooks/useInput';

const PostCardContent = ({
  postData,
  editMode,
  onChangePost,
  onCancelUpdate,
}) => {
  const { updatePostLoading, updatePostDone } = useSelector(
    (state) => state.post,
  );
  const [editText, onChangeEditText, setEditText] = useInput(postData);

  useEffect(() => {
    if (updatePostDone) {
      onCancelUpdate();
    }
  }, [updatePostDone]);

  useEffect(() => {
    if (editMode) {
      setEditText(postData);
    }
  }, [editMode]);

  return (
    <>
      {editMode ? (
        <div style={{ textAlign: 'right' }}>
          <Input.TextArea
            rows={3}
            value={editText}
            onChange={onChangeEditText}
            maxLength={140}
          />
          <div style={{ marginTop: 10 }}>
            <Button
              type="primary"
              style={{ marginRight: 10 }}
              loading={updatePostLoading}
              onClick={onChangePost(editText)}
            >
              수정
            </Button>
            <Button onClick={onCancelUpdate}>취소</Button>
          </div>
        </div>
      ) : (
        postData.split(/(#[^\s#]+)/g).map((v, i) => {
          if (v.match(/(#[^\s#]+)/)) {
            return (
              <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={i}>
                <a>{v}</a>
              </Link>
            );
          }
          return v;
        })
      )}
    </>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
  editMode: PropTypes.bool,
  onChangePost: PropTypes.func,
  onCancelUpdate: PropTypes.func,
};

PostCardContent.defaultProps = {
  editMode: false,
  onChangePost: () => {},
  onCancelUpdate: () => {},
};

export default PostCardContent;
