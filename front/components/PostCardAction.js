import React, { useMemo } from 'react';
import {
  HeartOutlined,
  MessageOutlined,
  RetweetOutlined,
} from '@ant-design/icons';
import { PropTypes } from 'prop-types';

const PostCardAction = ({
  type,
  active,
  color,
  count,
  onActive,
  onInactive,
}) => {
  const IconComponent = useMemo(() => {
    switch (type) {
      case 'retweet':
        return RetweetOutlined;
      case 'heart':
        return HeartOutlined;
      case 'comment':
        return MessageOutlined;
      default:
        return null;
    }
  }, [type]);

  return (
    <div
      style={{ textAlign: 'center' }}
      onClick={active ? onInactive : onActive}
    >
      <IconComponent key={type} style={active ? { color } : null} />
      {count > 0 && (
        <span style={{ marginLeft: 10, color: active ? color : '' }}>
          {count}
        </span>
      )}
    </div>
  );
};

PostCardAction.propTypes = {
  type: PropTypes.string.isRequired,
  active: PropTypes.bool,
  color: PropTypes.string,
  count: PropTypes.number,
  onActive: PropTypes.func,
  onInactive: PropTypes.func,
};

PostCardAction.defaultProps = {
  active: false,
  color: '',
  count: 0,
  onActive: () => {},
  onInactive: () => {},
};

export default PostCardAction;
