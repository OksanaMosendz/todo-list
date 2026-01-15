import './App.css';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './TodoForm';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const addTodo = async (newTodo) => {
    const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
          },
        },
      ],
    };

    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      setIsSaving(true);
      const response = await fetch(url, options);
      const data = await response.json();

      const records = data.records;
      if (!response.ok) {
        throw new Error(records.error.message);
      } else {
        const savedTodo = {
          title: records[0].fields.title,
          id: records[0].fields.id,
          isCompleted: records[0].fields.isCompleted,
        };
        if (!records[0].fields.isCompleted) {
          savedTodo.isCompleted = false;
        }
        setTodoList([...todoList, savedTodo]);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsSaving(false);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);

      const options = {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error.message);
        } else {
          const records = data.records;
    
          const fetchedTodos = records.map((record) => {
            const todo = {
              title: record.fields.title,
              id: record.id,
              isCompleted: record.fields.isCompleted,
            };

            if (!todo.isCompleted) {
              todo.isCompleted = false;
            }
            return todo;
          });
          setTodoList([...fetchedTodos]);
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  function completeTodo(id) {
    const updatedTodo = todoList.map((todo) => {
      if (id === todo.id) {
        return { ...todo, isCompleted: true };
      } else return todo;
    });
    setTodoList(updatedTodo);
  }

  function updateTodo(editedTodo) {
    const updatedTodo = todoList.map((todo) => {
      if (editedTodo.id === todo.id) {
        return { editedTodo };
      } else return todo;
    });
    setTodoList(updatedTodo);
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo} isSaving={isSaving}></TodoForm>

      <TodoList
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        todoList={todoList}
        isLoading={isLoading}
      ></TodoList>

      <div>
        {errorMessage !== '' && (
          <div>
            <hr />
            <p>{errorMessage}</p>{' '}
            <button type="button" onClick={() => setErrorMessage('')}>
              Dissmiss
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
