import styles from './TodoList.module.css';
import TodoListItem from './TodoListItem';
import { useSearchParams } from 'react-router-dom';

function TodoList({ todoList, onUpdateTodo, isLoading }) {
  const filtredTodoList = todoList.filter((todo) => !todo.isCompleted);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const itemsPerPage = 5;
  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;
  const indexOfLastTodo = indexOfFirstTodo + itemsPerPage;
  const totalPages = Math.ceil(filtredTodoList.length / itemsPerPage);
  const currentPageTodos = filtredTodoList.slice(
    indexOfFirstTodo,
    indexOfLastTodo
  );

  function handlePreviousPage() {
    if (currentPage > 1) {
      setSearchParams({ page: currentPage - 1 });
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      setSearchParams({ page: currentPage + 1 });
    }
  }

  return filtredTodoList.length === 0 ? (
    isLoading ? (
      <p>Todo list loading...</p>
    ) : (
      <p>Add todo above to get started</p>
    )
  ) : (
    <>
      <ul className={styles.list}>
        {currentPageTodos.map((todo) => (
          <TodoListItem
            onCompleteTodo={onUpdateTodo}
            onUpdateTodo={onUpdateTodo}
            key={todo.id}
            todo={todo}
          />
        ))}
      </ul>

      <div className={styles.paginationControls}>
        <button onClick={handlePreviousPage}>Previous</button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </>
  );
}

export default TodoList;
