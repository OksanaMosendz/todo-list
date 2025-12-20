import './App.css';
import TodoList from './ToDoList';
import TodoForm from './TodoForm';
import { useState } from 'react';

function App() {
  const [todoList, setTodoList] = useState([]);

  function addTodo(title) {
    const newTodo = { title, id: Date.now() };

    setTodoList([...todoList, newTodo]);
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo}></TodoForm>

      <TodoList todoList={todoList}></TodoList>
    </div>
  );
}

export default App;
