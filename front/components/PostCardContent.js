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
        <>
          <Input.TextArea
            value={editText}
            onChange={onChangeEditText}
            maxLength={140}
          />
          <Button.Group>
            <Button
              loading={updatePostLoading}
              onClick={onChangePost(editText)}
            >
              수정
            </Button>
            <Button type="danger" onClick={onCancelUpdate}>
              취소
            </Button>
          </Button.Group>
        </>
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
