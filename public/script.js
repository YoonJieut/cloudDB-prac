
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
 * 3-4 태그들 클릭했을 때, 고유의 id 넘기는 태그
 * 4. add와 updata를 합치기
 * 
 * Todo2 : React 컴포넌트를 작성한 후 적용해본다.
 * 1. class 형식 React 작성
 * 1-1. 현재 index.html에 적용해보기
 * 2. function 형식 React 작성
 * 2-1. 현재 index.html에 적용해보기
 */

// ! getAttribute로 속성 값을 html에서 속성값을 전달할 수 있었지!
let selectedTodoId = null; // 전역 변수로 선택된 Todo의 ID를 저장

function selectTodo(todoElement) {
  selectedTodoId = todoElement.getAttribute('data-id');
  console.log(selectedTodoId);
  // 선택된 Todo의 ID를 전역 변수에 저장
  // 이제 todoId를 사용하여 deleteTodo, updateTodo 함수를 호출할 수 있습니다.
  // 예: deleteTodo(todoId);
  // 혹은 사용자에게 버튼을 보여주어 선택할 수 있게 할 수도 있습니다.
}

function updateTodo() {
  console.log("updateTodo시작");
  if (!selectedTodoId) {
    console.error("No todo selected");
    return;
  }
  let updatedtitle = document.getElementById('userInput').value;
  // put 요청 구현
  fetch(`/todos/${selectedTodoId}`, {
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
    removeItem(selectedTodoId);
    let todoList = document.getElementById('todoList');
    todoList.innerHTML += `
    <div class="lists" data-id="${updatedtitle._id}" onclick="selectTodo(this)">
      ${updatedtitle.title}
      <!-- 여기에 추가적인 Todo 정보 렌더링 -->
    </div>
    `;
  })
  .catch((err)=>console.log(err, "에러발생"));
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

function deleteTodo() {
  console.log("deleteTodo시작");
  if (!selectedTodoId) {
    console.error("No todo selected");
    return;
  }
  // delete 요청 구현
  fetch(`/todos/${selectedTodoId}`, {
    method : 'DELETE'
  })
  .then((res)=>res.json())
  .then((result)=> {
    console.log('데이터 전송 완료', result);
    removeItem(selectedTodoId);
  })
  .catch((err)=>{console.log(err, "에러발생")});
}


// 요소 삭제 로직
function removeItem(todoID){
  const todoEl = document.querySelector(`[data-id="${todoID}"]`);
  if(todoEl) {
    todoEl.remove();
  }
}

