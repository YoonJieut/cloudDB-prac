
/**
 * TODO : 요청을 보내는 로직을 완성한다.
 * 
 * 1. 고유의 id는 함수가 실행 될 때마다 1씩 늘어난다.
 * 2. fetch를 통해 요청을 보낼 수 있다.
 */

console.log('script.js');
console.log(document.getElementById('userInput'));
function updataTodo() {
  console.log("updataTodo시작");
  let title = document.getElementById('userInput').value;
  // put 요청 구현
  fetch(`/todos/{id}`, {
    method : 'PUT',
    headers : { 'Content-Type' : 'application/json'},
    body : JSON.stringify({ title }),
  })
}
function deleteTodo() {
  // delete 요청 구현
}
