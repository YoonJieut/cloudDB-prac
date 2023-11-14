import TodoList from "./model/classComp.js";
const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', ()=>{
  let updatedtitle = document.getElementById('userInput').value;
  new TodoList().addTodoMethod({
    title : updatedtitle
  })
});