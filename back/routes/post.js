const express = require('express');

const router = express.Router();

router.post('/post', (req, res) => {
  // 게시글 생성
});

router.delete('/post', (req, res) => {
  // 게시글 삭제
});

module.exports = router;
