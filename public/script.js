
/**
 * TODO : 요청을 보내는 로직을 완성한다.
 * 
 * 1. 고유의 id는 함수가 실행 될 때마다 1씩 늘어난다.
 * 
 * 2. fetch를 통해 요청을 보낼 수 있다.
 * 
 * 3-1 add
 * 3-2 updata
 * 3-3 delete
 * 
 * 4. add와 updata를 합치기
 */



function updataTodo() {
  console.log("updataTodo시작");
  let title = document.getElementById('userInput').value;
  // put 요청 구현
  fetch(`/todos/{id}`, {
    method : 'PUT',
    headers : { 'Content-Type' : 'application/json'},
    body : JSON.stringify({ title }),
  })
  .then(()=> console.log('데이터 전송 완료'))
  .cathch((err)=>{console.log(err, "에러발생")});
}

function addTodo() {
  let value = document.getElementById('userInput').value;
  fetch(`/todos`, {
    method : 'POST',
    headers : { 'Content-Type' : 'application/json'},
    body : JSON.stringify({ 
      title : value,
      description : `새로운 할 일`,
      completed : false
    })
  })
  .then(res => res.json())
  .then(todo => {
    console.log("todo입니다.");
    console.table(todo);
    let todoList = document.getElementById('todoList');
    todoList.innerHTML += `<div class="lists">${todo.title}</div>`;
  })
  .catch(err => console.error(err))
}

function deleteTodo() {
  // delete 요청 구현
  console.log("deleteTodo시작");
  // delete 요청 구현
  fetch(`/todos/{id}`, {
    method : 'DELETE',
    headers : { 'Content-Type' : 'application/json'},
    body : JSON.stringify({ title }),
  })
  .then(()=> console.log('데이터 전송 완료'))
  .cathch((err)=>{console.log(err, "에러발생")});
}
