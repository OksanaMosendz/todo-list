import { useRef } from 'react';
import { useState } from 'react';

function TodoForm({ onAddTodo }) {

  const todoTitleInput = useRef(document.querySelector('#todoTitle'));
  const [workingTodoTitle, setWorkingTodoTitle]=useState('');

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle('');
    todoTitleInput.current.focus();
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">ToDo</label>
      <input ref={todoTitleInput} name="title" id="todoTitle" value={workingTodoTitle} onChange={(e=>{setWorkingTodoTitle(e.target.value)})}></input>
      <button disabled={workingTodoTitle===''}>Add Todo</button>
    </form>
  );
}
export default TodoForm;
