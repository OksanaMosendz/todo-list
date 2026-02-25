import { StateContext } from '../stateContext';
import { useContext } from 'react';
import TodoList from '../features/TodoList/TodoList';
import TodoForm from '../TodoForm';
import TodoViewForm from '../features/TodoViewForm';

function TodosPage({ onCompleteTodo, onUpdateTodo, onAddTodo }) {
  const { todoState } = useContext(StateContext);

  return (
    <>
      <TodoForm onAddTodo={onAddTodo}></TodoForm>

      <TodoList
        onCompleteTodo={onCompleteTodo}
        onUpdateTodo={onUpdateTodo}
        todoList={todoState.todoList}
        isLoading={todoState.isLoading}
      ></TodoList>

      <TodoViewForm />
    </>
  );
}

export default TodosPage;
