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
// 스키마 메소드를 통해 프로토타입 메소드를 설정
// todoSchema.methods.consoleLogId = function(){
//   console.log(this._id);
// }

const Todo = mongoose.model('Todo', todoSchema);


// controller Part -----------------
// ! express.json은 파싱하기 위해, 위에 존재해야 한다.
app.use(express.json());// JSON 요청 본문을 처리하기 위한 미들웨어
// bodyParser를 사용하여 URL encoded form 데이터를 파싱합니다.
// app.use(bodyParser.urlencoded({ extended: true }));
// 정적 파일을 제공하기 위해 express.static 미들웨어를 사용합니다.
app.use(express.static('public'));




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
  // ! 로깅을 확인하기 위한 콘솔로그
  console.log(newTodo); // 저장된 객체 로깅
  res.send(newTodo);
})
// 이하 put 및 delete 라우트 구현
// ! :id는 문법 오류가 아니라, 이 자리를 대체해서 id가 들어가게 된다.
app.put('/todos/:id', async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(updatedTodo);
});

// DELETE /todos/:id
app.delete('/todos/:id', async (req, res) => {
  const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
  res.send(deletedTodo);
});



app.get('/', (req, res)=>{
  res.send('hello world');
});

const Port = process.env.Port;
app.listen(Port, ()=>{
  console.log(`http://localhost:${Port}`);
})
