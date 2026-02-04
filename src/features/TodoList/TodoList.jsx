import styles from './TodoList.module.css'
import TodoListItem from './TodoListItem';

function TodoList({ todoList, onUpdateTodo, isLoading }) {
  const filtredTodoList = todoList.filter((todo) => !todo.isCompleted);

  return filtredTodoList.length === 0 ? (
    isLoading ? (
      <p>Todo list loading...</p>
    ) : (
      <p>Add todo above to get started</p>
    )
  ) : (
    <ul className={styles.list}>
      {filtredTodoList.map((todo) => (
        <TodoListItem
          onCompleteTodo={onUpdateTodo}
          onUpdateTodo={onUpdateTodo}
          key={todo.id}
          todo={todo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
