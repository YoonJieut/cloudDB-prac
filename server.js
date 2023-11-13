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
// * 몽고 디비는 document에 자동으로 _id 항목이 추가되기 때문에 id를 만들 필요가 없다.
const todoSchema = new mongoose.Schema({
  title : String,
  description : String,
  completed : Boolean
})
todoSchema.methods.consoleLogId = function(){
  console.log(this._id);
}

const Todo = mongoose.model('Todo', 
);

// 스키마 메소드를 통해 프로토타입 메소드를 설정
Todo.

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
app.put('/todos/:id', async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(updatedTodo);
});

// DELETE /todos/:id
app.delete('/todos/:id', async (req, res) => {
  const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
  res.send(deletedTodo);
});


// controller Part -----------------

app.use(express.json());// JSON 요청 본문을 처리하기 위한 미들웨어

app.get('/', (req, res)=>{
  res.send('hello world');
});

const Port = process.env.Port;
app.listen(Port, ()=>{
  console.log(`http://localhost:${Port}`);
})
