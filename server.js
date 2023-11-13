// .env 파일 생성 및 다뤄보기
require('dotenv').config(); // 환경 변수 설정
// const Router = require('./router');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// mongoose를 활용한 DB 작성
mongoose.connect(process.env.uri) // 연결 성공 
  .then(()=>{ console.log("연결 성공",)}) 
  .catch((err)=>{ console.error("연결 실패", err)});

// 스키마 설정
const Todo = mongoose.model('Todo', new mongoose.Schema({
  title : String,
  description : String,
  completed : Boolean
}));

// DB 전용 라우터
// find를 통해 읽어오기 //[] 확인완료
app.get('/todo', async(req, res)=>{
  const todos = await Todo.find();
  res.send(todos);
})

// 추가하기
app.post('/todos', async(req, res)=>{
  const newTodo = new Todo(req.body);
  await newTodo.save();
  res.send(newTodo);
})
// 이하 put 및 delete 라우트 구현



// controller Part -----------------

app.use(express.json());// JSON 요청 본문을 처리하기 위한 미들웨어

app.get('/', (req, res)=>{
  res.send('hello world');
});

const Port = process.env.Port;
app.listen(Port, ()=>{
  console.log(`http://localhost:${Port}`);
})
