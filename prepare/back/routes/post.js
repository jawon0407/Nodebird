const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post , User , Image , Comment , Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

const upload = multer({ // 이미지 업로드
    storage : multer.diskStorage({
        destination(req, file, done){ // 저장 경로
            done(null, 'uploads');
        },
        filename(req, file, done){ // 파일명
            const ext = path.extname(file.originalname); // 확장자 추출(.png)
            const basename = path.basename(file.originalname, ext) // 파일명 추출(ex) jawon0407)
            done(null, basename + '_' + new Date().getTime() + ext); // 파일명 + 현재시간 + 확장자 -> jawon040720211010.png
        }
    }),
    limits : { fileSize : 40 * 1024 * 1024 }, // 40MB
});

try{
    fs.accessSync('uploads'); // uploads 폴더가 없으면 에러 발생
}catch(error){
    console.log('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

router.post('/' , isLoggedIn , upload.none() , async (req, res) => {
    try{
        const hashtags = req.body.content.match(/#[^\s#]+/g);
        console.log(req.user , req.body);
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        if(hashtags){
            const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({ 
                // findOrCreate : 이미 존재하면 가져오고 없으면 생성
                where : {name : tag.slice(1).toLowerCase()}, 
            })));// result 형태 : [[노드, true], [리액트, true]] 이중배열
            await post.addHashtags(result.map((v) => v[0]));
        }
        if(req.body.image){
            if(Array.isArray(req.body.image)){ // 이미지 주소가 여러개일 때
                const images = await Promise.all(req.body.image.map((image) => Image.create({ src : image })));
                await post.addImages(images);
            }else{ // 이미지 주소가 하나일 때
                const image = await Image.create({ src : req.body.image });
                await post.addImage(image);
            }
        }
        const fullPost = await Post.findOne({
            where : { id : post.id },
            include : [{
                model : Image,
            },{
                model : Comment,
                include : [{
                    model : User, // 댓글 작성자
                    attributes : ['id', 'nickname'],
                }],
            },{
                model : User, // 게시글 작성자
                attributes : ['id', 'nickname'],
            }, {
                model : User, // 좋아요 누른 사람
                as : 'Likers',
                attributes : ['id'],
            }]
        })
        res.status(201).json(fullPost);
    }catch(error){
        console.log(error);
        next(error);
    }
});

router.post('/images' , isLoggedIn , upload.array('image') , async (req, res) => { // POST /post/images -> 이미지 업로드 후에 이미지 주소를 프론트로 보내줌
    //upload.array('image') -> req.files에 이미지들이 들어감
    //array -> 여러개의 이미지를 업로드할 때 사용 , single -> 하나의 이미지를 업로드할 때 사용 , none -> 텍스트 혹은 json 형식으로 데이터를 받을 때 사용 , fills -> input 값이 여러개 일 때 사용
    //image는 프론트에서 보내는 <input name=image /> 의 값
    console.log(req.files); // 이미지 주소
    res.json(req.files.map((v) => v.filename));
});

router.post('/:postId/comment' , isLoggedIn , async (req, res) => {
    try{
        const post = await Post.findOne({
            where : { id : req.params.postId }
        })
        if(!post){
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }
        const comment = await Comment.create({
            content: req.body.content,
            PostId: parseInt(req.params.postId),
            UserId: req.user.id,
        })
        const fullComment = await Comment.findOne({
            where : { id : comment.id },
            include : [{
                model : User,
                attributes : ['id', 'nickname'],
            }],
        })
        res.status(201).json(fullComment);
    }catch(error){
        console.log(error);
        next(error);
    }
});

router.patch('/:postId/like' , isLoggedIn , async (req , res , next) => {
    try{
        const post = await Post.findOne({where : {id : req.params.postId}});
        if(!post){
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
        await post.addLikers(req.user.id);
        res.json({ PostId : post.id , UserId : req.user.id });
    }catch(error){
        console.log(error);
        next(error);
    }
});

router.delete('/:postId/like' , isLoggedIn , async (req , res , next) => {
    try{
        const post = await Post.findOne({where : {id : req.params.postId}});
        if(!post){
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
        await post.removeLikers(req.user.id);
        res.json({ PostId : post.id , UserId : req.user.id });
    }catch(error){
        console.log(error);
        next(error);
    }
});

router.delete('/:postId' , isLoggedIn , async(req, res, next) => {
    try{
        await Post.destroy({
            where : { 
                id : req.params.postId, 
                UserId : req.user.id 
            },
        })
        res.status(200).json({PostId : parseInt(req.params.postId , 10)});
    }catch(error){
        console.log(error);
        next(error);
    }
});

router.post('/:postId/retweet' , isLoggedIn , async (req, res) => {
    try{
        const post = await Post.findOne({
            where : { id : req.params.postId },
            include:[{
                model : Post,
                as: 'Retweet',
            }]
        })
        if(!post){
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }
        if(post.Retweet && post.Retweet.UserId === req.user.id){
            // 내가 리트윗한 게시글을 다시 리트윗할 때
            return res.status(403).send('자신의 글은 리트윗 할 수 없습니다.');
        }
        const retweetTargetId = post.RetweetId || post.id;
        const exPost = await Post.findOne({
            where : {
                UserId : req.user.id,
                RetweetId : retweetTargetId,
            }
        });
        if(exPost){
            return res.status(403).send('이미 리트윗 했습니다.');
        }
        const retweet = await Post.create({
            UserId : req.user.id,
            RetweetId : retweetTargetId, // 원본 게시글의 아이디
            content : 'retweet',
        })
        const retweetWithPrevPost = await Post.findOne({
            where : { id : retweet.id },
            include : [{
                model : Post,
                as : 'Retweet',
                include : [{
                    model : User,
                    attributes : ['id', 'nickname'],
                },{
                    model : Image,
                },{
                    model : User,
                    through : 'Like',
                    as : 'Likers',
                    attributes : ['id' , 'nickname'],
                }]
            },{
                model : User,
                attributes : ['id', 'nickname'],
            },{
                model : User,
                through : 'Like',
                as : 'Likers',
                attributes : ['id'],
            },{
                model : Comment,
                include : [{
                    model : User,
                    attributes : ['id', 'nickname'],
                }]
            },{
                model : Image,
            }]
        })
        res.status(201).json(retweetWithPrevPost);
    }catch(error){
        console.log(error);
        next(error);
    }
});

router.get('/:postId' , async (req, res) => {
    try{
        console.log(req.params);
        const post = await Post.findOne({
            where : { id : req.params.postId },
        })
        if(!post){
            return res.status(404).send('존재하지 않는 게시글입니다.');
        }
        const SinglePost = await Post.findOne({
            where : { id : post.id },
            include : [{
                model : Post,
                as : 'Retweet',
                include : [{
                    model : User,
                    attributes : ['id', 'nickname'],
                },{
                    model : Image,
                },{
                    model : User,
                    through : 'Like',
                    as : 'Likers',
                    attributes : ['id', 'nickname'],
                }]
            },{
                model : User,
                attributes : ['id', 'nickname'],
            },{
                model : User,
                through : 'Like',
                as : 'Likers',
                attributes : ['id', 'nickname'],
            },{
                model : Comment,
                include : [{
                    model : User,
                    attributes : ['id', 'nickname'],
                }]
            },{
                model : Image,
            }]
        })
        res.status(201).json(SinglePost);
    }catch(error){
        console.log(error);
        next(error);
    }
});

router.delete('/' , (req, res) => {
    res.json([
        {id: 1},
    ]);
});


module.exports = router; 