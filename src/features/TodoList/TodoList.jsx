import TodoListItem from './TodoListItem';

function TodoList({ todoList, onCompleteTodo }) {
  const filtredTodoList = todoList.filter((todo) => !todo.isCompleted);

  return filtredTodoList.length === 0 ? (
    <p>Add todo above to get started</p>
  ) : (
    <ul>
      {filtredTodoList.map((todo) => (
        <TodoListItem
          onCompleteTodo={onCompleteTodo}
          key={todo.id}
          todo={todo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
