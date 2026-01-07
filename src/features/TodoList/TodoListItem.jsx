import { useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';

function TodoListItem({ todo, onCompleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTodoTitle] = useState(todo.title);

  function handleCancel() {
    setWorkingTodoTitle(todo.title);
    setIsEditing(false);
  }
  function handleEdit(e) {
    setWorkingTodoTitle(e.target.value);
  }

  return (
    <li key={todo.id}>
      <form>
        {isEditing ? (
          <>
            <TextInputWithLabel value={workingTitle} onChange={handleEdit} />
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <label>
              <input
                onChange={() => onCompleteTodo(todo.id)}
                type="checkbox"
                checked={todo.isCompleted}
              />
            </label>
            <span onClick={() => setIsEditing(true)}>{todo.title}</span>
          </>
        )}{' '}
      </form>
    </li>
  );
}

export default TodoListItem;
