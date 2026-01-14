import TodoListItem from './TodoListItem';

function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }) {
  const filtredTodoList = todoList.filter((todo) => !todo.isCompleted);

  return filtredTodoList.length === 0 ? (
    isLoading ? (
      <p>Todo list loading...</p>
    ) : (
      <p>Add todo above to get started</p>
    )
  ) : (
    <ul>
      {filtredTodoList.map((todo) => (
        <TodoListItem
          onCompleteTodo={onCompleteTodo}
          onUpdateTodo={onUpdateTodo}
          key={todo.id}
          todo={todo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
