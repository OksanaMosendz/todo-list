
import './App.css'
import TodoList from './ToDoList';
import TodoForm from './TodoForm';
import { useState } from 'react';


function App() {
  const [newTodo, setNewTodo]=useState("New Todo Example");
  return (
      <div>
      <h1>Todo List</h1>
      <TodoForm></TodoForm>
      <p>{newTodo}</p>
      <TodoList></TodoList>
      </div>
        
  )
}

export default App
