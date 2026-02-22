import styles from './TodoList.module.css'
import TodoListItem from './TodoListItem';
import { useSearchParams } from 'react-router';


function TodoList({ todoList, onUpdateTodo, isLoading }) {
  const filtredTodoList = todoList.filter((todo) => !todo.isCompleted);
const [searchParams, setSearchParams] = useSearchParams();
 const currentPage=parseInt(searchParams.get('page')||'1', 10);
const itemsPerPage=15;
const indexOfFirstTodo=(currentPage-1)*itemsPerPage;
const totalPages=Math.ceil(filtredTodoList.length/itemsPerPage);

return filtredTodoList.length === 0 ? (
    isLoading ? (
      <p>Todo list loading...</p>
    ) : (
      <p>Add todo above to get started</p>
    )
  ) : (
    <><ul className={styles.list}>
      {filtredTodoList.map((todo) => (
        <TodoListItem
          onCompleteTodo={onUpdateTodo}
          onUpdateTodo={onUpdateTodo}
          key={todo.id}
          todo={todo}
        />
      ))}
    </ul>

</>
  );
}

export default TodoList;
