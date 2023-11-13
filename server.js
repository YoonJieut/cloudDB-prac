// .env 파일 생성 및 다뤄보기
require('dotenv').config(); // 환경 변수 설정

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.uri) // 연결 성공 
  .then(()=>{ console.log("연결 성공",)}) 
  .catch((err)=>{ console.error("연결 실패", err)});

app.use(express.json());// JSON 요청 본문을 처리하기 위한 미들웨어

app.get('/', (req, res)=>{
  res.send('hello world');
});

const Port = process.env.Port;
app.listen(Port, ()=>{
  console.log(`http://localhost:${Port}`);
})
