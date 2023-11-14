import Component from "./classicComp";

class TodoList extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos : []
    };
  }
  addTodo(todo) {
    const newTodos = [...this.state.todos, todo];
    this.setState({ todos : newTodos });
  }

  render() {
    const todoContainer = document.getElementById('todoList');
    todoContainer.innerHTML = "";

    this.state.todos.forEach(todo => {
      const reactTodoEl = document.createElement('div');
      reactTodoEl.textContent = todo.title;
      todoContainer.appendChild(reactTodoEl);
    });
  }
}