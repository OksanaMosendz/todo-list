import { useRef } from 'react';
import { useState } from 'react';
import TextInputWithLabel from './shared/TextInputWithLabel';

function TodoForm({ onAddTodo }) {
  const todoTitleInput = useRef();
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle('');
    todoTitleInput.current.focus();
  }

  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="todoTitle"
        ref={todoTitleInput}
        value={workingTodoTitle}
        label="Todo"
        onChange={(e) => {
          setWorkingTodoTitle(e.target.value);
        }}
      ></TextInputWithLabel>

      <button disabled={workingTodoTitle === ''}>Add Todo</button>
    </form>
  );
}
export default TodoForm;
