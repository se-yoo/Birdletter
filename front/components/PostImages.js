import React, { useState, useCallback } from 'react';
import { PropTypes } from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';

import ImagesZoom from './ImagesZoom';
import { backUrl } from '../config/config';

const PostImages = ({ images }) => {
  const [showImageZoom, setShowImageZoom] = useState(false);
  const onZoom = useCallback(() => {
    setShowImageZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setShowImageZoom(false);
  }, []);

  if (images.length <= 2) {
    return (
      <>
        {images.map((image) => (
          <img
            key={image.src}
            role="presentation"
            style={{
              width: `${100 / images.length}%`,
              height: 470,
              objectFit: 'cover',
              display: 'inline-block',
            }}
            src={`${backUrl}/${image.src}`}
            alt={image.src}
            onClick={onZoom}
          />
        ))}
        {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }

  return (
    <>
      <div>
        <img
          role="presentation"
          style={{
            width: '50%',
            height: 470,
            objectFit: 'cover',
            display: 'inline-block',
          }}
          src={`${backUrl}/${images[0].src}`}
          alt={images[0].src}
          onClick={onZoom}
        />
        <div
          role="presentation"
          style={{
            display: 'inline-block',
            width: '50%',
            textAlign: 'center',
            verticalAlign: 'middle',
          }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1}개의 사진 더보기
        </div>
      </div>
      {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImages;
