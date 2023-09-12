const express = require('express');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const { Post, Image, User, Comment } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    let where = {};
    if (req.user) {
      // 로그인 상태면 자신 + 팔로잉 게시글만 보이게
      const followings = await User.findAll({
        attributes: ['id'],
        include: [
          {
            model: User,
            as: 'Followers',
            where: { id: req.user.id },
          },
        ],
      });
      where = {
        UserId: { [Op.in]: [req.user.id, ...followings.map((v) => v.id)] },
      };
    }
    if (parseInt(req.query.lastId, 10)) {
      // 초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [{ model: User, attributes: ['id', 'nickname'] }],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
        {
          model: Post,
          as: 'Retweet',
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
            {
              model: Image,
            },
          ],
        },
        {
          model: Post,
          association: new Sequelize.HasMany(Post, Post, {
            as: 'Retweeters',
            foreignKey: 'RetweetId',
          }),
          attributes: [['UserId', 'id']],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
