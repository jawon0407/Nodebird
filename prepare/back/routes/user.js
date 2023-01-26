const express = require('express');
const bycrpt = require('bcrypt');
const { User } = require('../models');
const router = express.Router();

router.post('/' , async (req, res) => { //POST /user
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

        const hashedPassword = await bycrpt.hash(req.body.password, 12); // 12는 saltRound
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