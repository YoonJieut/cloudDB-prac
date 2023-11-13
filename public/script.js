
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



function updateTodo(todoId) {
  console.log("updateTodo시작");
  let updatedtitle = document.getElementById('userInput').value;
  // put 요청 구현
  fetch(`/todos/${todoId}`, {
    method : 'PUT',
    headers : { 'Content-Type' : 'application/json'},
    body : JSON.stringify({ 
      title : updatedtitle
    })
  })
  .then((res)=>res.json())
  .then((updatedtitle)=>{ 
    console.log('데이터 전송 완료', updatedtitle)
    // ui 업데이트 로직
    let todoList = document.getElementById('todoList');
    todoList.innerHTML += `
    <div class="lists" data-id="${todo._id}" onclick="selectTodo(this)">
      ${todo.title}
      <!-- 여기에 추가적인 Todo 정보 렌더링 -->
    </div>
    `;
  })
  .cathch((err)=>{console.error(err, "에러발생")});
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
    // ui 업데이트 로직
    let todoList = document.getElementById('todoList');
    todoList.innerHTML += `
      <div class="lists" data-id="${todo._id}" onclick="selectTodo(this)">
        ${todo.title}
        <!-- 여기에 추가적인 Todo 정보 렌더링 -->
      </div>
    `;
  })
  .catch(err => console.error(err))
}

function deleteTodo(todoId) {
  // delete 요청 구현
  console.log("deleteTodo시작");
  // delete 요청 구현
  fetch(`/todos/${todoId}`, {
    method : 'DELETE'
  })
  .then((res)=>res.json())
  .then((result)=> console.log('데이터 전송 완료', result))
  .cathch((err)=>{console.log(err, "에러발생")});
}
