const express = require('express');
const cors = require('cors');

const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');

const app = express();
db.sequelize.sync()
    .then(() => {
        console.log('DB 연결 성공');
    })
    .catch(console.error);

/**
 * app.get : 가져오다
 * app.post : 생성하다
 * app.delete : 삭제하다
 * app.put : 전체 수정
 * app.patch : 부분 수정
 * app.options : 찔러보다
 * app.head : 헤더만 가져오다(요청 헤더 정보만 가져옴)
*/

app.use(cors({
    origin: '*',
    credentials: false, // 쿠키를 전달할지 말지
}));
app.use(express.json()); // json 형식의 데이터를 받아올 수 있게 해줌
app.use(express.urlencoded({ extended: true })); // front에서의 form 형식의 데이터를 받아올 수 있게 해줌
// 이 두개를 사용하면 req.body에 데이터가 들어옴 라우팅 하기 전에 제일 위에 있어야 한다

app.get('/', (req, res) => {
    res.send('Hello Express')
})

app.get('/api', (req, res) => {
    res.send('Hello Express API')
})

app.get('/post' , (req, res) => {
    res.json([
        {id: 1, content: 'Post 1'},
        {id: 2, content: 'Post 2'},
        {id: 3, content: 'Post 3'},
    ])
})

app.use('/post',postRouter)
app.use('/user',userRouter)

app.listen(4070 , () => {
    console.log('서버 실행 중!!')
});