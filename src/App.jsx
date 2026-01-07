import './App.css';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './TodoForm';
import { useState } from 'react';

function App() {
  const [todoList, setTodoList] = useState([]);

  function addTodo(title) {
    const newTodo = { title, id: Date.now(), isCompleted: false };
    setTodoList([...todoList, newTodo]);
  }

  function completeTodo(id) {
    const updatedTodo = todoList.map((todo) => {
      if (id === todo.id) {
        return { ...todo, isCompleted: true };
      } else return todo;
    });
    setTodoList(updatedTodo);
  }

  function updateTodo(editedTodo) {
    const updatedTodo = todoList.map((todo) => {
      if (editedTodo.id === todo.id) {
        return { editedTodo };
      } else return todo;
    });
    setTodoList(updatedTodo);
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo}></TodoForm>

      <TodoList
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        todoList={todoList}
      ></TodoList>
    </div>
  );
}

export default App;
