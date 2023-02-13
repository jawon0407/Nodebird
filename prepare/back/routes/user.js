const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User , Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const user = require('../models/user');

const router = express.Router();

router.get('/', async (req , res , next) => {
    console.log(req.headers);
    try{
        if(req.user){
            const fullUserWithoutPassword = await User.findOne({
                where : { id : req.user.id },
                attributes : {
                    exclude : ['password'] // db에서 password를 제외한 모든 정보를 가져옴
                },
                include: [{// include : 관계된 모델을 가져옴
                    model: Post, // hasMany 로 연결된 모델 가져오기 -> posts로 넘어옴
                    attributes: ['id', 'content']
                }, {
                    model: User,
                    as : 'Followings',
                    attributes: ['id', 'nickname']
                }, {
                    model: User,
                    as : 'Followers',
                    attributes: ['id', 'nickname']
                }]
            })
            return res.status(200).json(fullUserWithoutPassword);
        } else {
            res.status(200).json(null);
        }
    }catch(error){
        console.log(error);
        next(error);
    }
});

router.get('/:userId', async (req , res , next) => {
    console.log(req.headers);
    try{
        const fullUserWithoutPassword = await User.findOne({
            where : { id : req.params.userId },
            attributes : {
                exclude : ['password'] // db에서 password를 제외한 모든 정보를 가져옴
            },
            include: [{// include : 관계된 모델을 가져옴
                model: Post, // hasMany 로 연결된 모델 가져오기 -> posts로 넘어옴
                attributes: ['id', 'content']
            }, {
                model: User,
                as : 'Followings',
                attributes: ['id', 'nickname']
            }, {
                model: User,
                as : 'Followers',
                attributes: ['id', 'nickname']
            }]
        })
        if(fullUserWithoutPassword){
            return res.status(200).json(fullUserWithoutPassword);
        }else{
            res.status(404).json('존재하지 않는 사용자입니다.');
        }
    }catch(error){
        console.log(error);
        next(error);
    }
});

router.post('/login', isNotLoggedIn ,(req, res, next) => {//미들웨어 확장
    //코드의 중복을 피하기 위해 isNotLoggedIn을 사용
    passport.authenticate('local', ( err, user, info ) => {// 서버 , 성공 , 클라이언트 에러
        if(err){
            console.error(err);
            return next(err);
        }
        if(info){
            return res.status(401).send(info.reason);
        }
        return req.login(user, async(loginErr) => {
            if(loginErr){
                console.error(loginErr);
                return next(loginErr);
            }
            const fullUserWithoutPassword = await User.findOne({
                where : { id : user.id },
                attributes : {
                    exclude : ['password'] // db에서 password를 제외한 모든 정보를 가져옴
                },
                include: [{// include : 관계된 모델을 가져옴
                    model: Post, // hasMany 로 연결된 모델 가져오기 -> posts로 넘어옴
                    attributes: ['id', 'content']
                }, {
                    model: User,
                    as : 'Followings',
                    attributes: ['id', 'nickname']
                }, {
                    model: User,
                    as : 'Followers',
                    attributes: ['id', 'nickname']
                }]
            })
            return res.status(200).json(fullUserWithoutPassword);
        });
    })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('ok');
});

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
    try{
        console.log(req.body);
        await User.update({
            nickname : req.body.nickname,
        },{
            where : { id : req.user.id }
        });
        res.status(200).json({nickname : req.body.nickname})
    }catch(error){
        console.error(error);
        next(error);
    }
});

router.patch('/:userId/follow' , isLoggedIn , async (req,res,next) => {
    try{
        const exUser = await User.findOne({
            where : { id : req.params.userId }
        });
        if(!exUser){
            return res.status(403).send('존재하지 않는 사용자입니다.');
        }
        await exUser.addFollowers(req.user.id);
        res.status(200).json({ UserId : parseInt(req.params.userId , 10)} );
    }catch(error){
        console.log(error);
        next(error);
    }
});

router.delete('/:userId/follow' , isLoggedIn , async (req,res,next) => {
    try{
        console.log(req.params);
        const exUser = await User.findOne({
            where : { id : req.params.userId }
        });
        if(!exUser){
            return res.status(403).send('존재하지 않는 사용자입니다.');
        }
        await exUser.removeFollowers(req.user.id);
        res.status(200).json({UserId : parseInt(req.params.userId , 10)});
    }catch(error){
        console.log(error);
        next(error);
    }
});

router.delete('/follow/:userId' , isLoggedIn , async (req,res,next) => {
    try{
        console.log(req.params);
        const exUser = await User.findOne({
            where : { id : req.params.userId }
        });
        if(!exUser){
            return res.status(403).send('존재하지 않는 사용자입니다.');
        }
        await exUser.removeFollowings(req.user.id);
        res.status(200).json({UserId : parseInt(req.params.userId , 10)});
    }catch(error){
        console.log(error);
        next(error);
    }
});

router.get('/followers' , isLoggedIn , async (req,res,next) => {
    try{
        const exUser = await User.findOne({
            where : { id : req.user.id }
            //자기 자신을 찾는다.
        });
        if(!exUser){
            return res.status(403).send('존재하지 않는 사용자입니다.');
        }
        const followers = await exUser.getFollowers();
        res.status(200).json(followers);
    }catch(error){
        console.log(error);
        next(error);
    }
});

router.get('/followings' , isLoggedIn , async (req,res,next) => { // GET /user/followings 팔로잉 목록
    try{
        const exUser = await User.findOne({
            where : { id : req.user.id}
        });
        if(!exUser){
            return res.status(403).send('존재하지 않는 사용자입니다.');
        }
        const followings = await exUser.getFollowings();
        res.status(200).json(followings);
    }catch(error){
        console.log(error);
        next(error);
    }
});


router.post('/' , isNotLoggedIn , async (req, res) => { //POST /user
    try{
        const exUser = await User.findOne({
            where : {
                email : req.body.email,
            }
        });
        
        const exNickname = await User.findOne({
            where : {
                nickname : req.body.nickname,
            }
        });
        
        if(exUser || exNickname){
            return res.status(403).send('이미 사용중인 아이디 혹은 닉네임입니다.');
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 12); // 12는 saltRound
        await User.create({
            email : req.body.email,
            nickname : req.body.nickname,
            password : hashedPassword,
        })
        res.status(200).send('ok');
    }catch(error){
        console.error(error);
        next(error); // status 500
    }
});

module.exports = router;