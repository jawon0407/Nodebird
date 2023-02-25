const express = require('express');
const { Op } = require('sequelize');
const { User , Post , Image , Comment } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {// GET /posts
    try{
        const where = {};
        if(parseInt(req.query.lastId, 10)){ // 초기 로딩이 아닐 때
            where.id = { [Op.lt] : parseInt(req.query.lastId, 10) } // less than 10
         };
        const posts = await Post.findAll({
            where,
            limit : 10,
            // offset : 0, // 0번부터 10개(limit 개수만큼) 가져옴 -> 로딩중 게시글을 추가하거나 삭제하면 offset방식은 꼬이기 때문에 잘 안쓰임
            order : [['createdAt' , 'DESC'], [Comment, 'createdAt', 'DESC']],
            include : [{
                model : User,
                attributes : ['id', 'nickname']
            },{
                model : Image,
            },{
                model : Comment,
                include : [{
                    model : User, // 댓글 작성자
                    attributes : ['id', 'nickname']
                }, {
                    model : User, // 댓글 좋아요 누른 사람
                    as : 'CommentLikers',
                    attributes : ['id', 'nickname']
                }]
            },{
                model : User, //게시글 좋아요 누른 사람
                as : 'Likers',
                attributes : ['id', 'nickname'],
            },{
                model : Post,
                as : 'Retweet',
                include : [{
                    model : User,
                    attributes : ['id', 'nickname']
                },{
                    model : Image,
                }]
            }],
        }); 
        res.status(200).json(posts);
    }catch(error){
        console.log(error);
        next(error);
    }
});

module.exports = router;