import { useEffect, useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTodoTitle] = useState(todo.title);

  useEffect(() => {
    setWorkingTodoTitle(todo.title);
  }, [todo]);

  function handleCancel() {
    setWorkingTodoTitle(todo.title);
    setIsEditing(false);
  }

  function handleEdit(e) {
    setWorkingTodoTitle(e.target.value);
  }

  function handleUpdate(e) {
    if (isEditing === false) {
      return;
    }
    e.preventDefault();
    onUpdateTodo({ ...todo, title: workingTitle });
    setIsEditing(false);
  }

  return (
    <li key={todo.id}>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <>
            <TextInputWithLabel
              value={workingTitle}
              onChange={handleEdit}
              elementId={todo.id}
              type="text"
            />
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="button" onClick={handleUpdate}>
              Update
            </button>
          </>
        ) : (
          <>
            <label htmlFor={todo.id}>
              <input
                onChange={() => onCompleteTodo({ ...todo, isCompleted: true })}
                type="checkbox"
                checked={todo.isCompleted}
                id={todo.id}
              />
            </label>
            <span onClick={() => setIsEditing(true)}>{todo.title}</span>
          </>
        )}{' '}
      </form>
    </li>
  )
};

export default TodoListItem;
