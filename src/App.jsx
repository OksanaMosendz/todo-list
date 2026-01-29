import './App.css';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './TodoForm';
import TodoViewForm from './features/TodoViewForm';
import { useState, useEffect, useCallback } from 'react';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [queryString, setQueryString] = useState('');

const encodeUrl=useCallback(()=>{
    let searchQuery = '';
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
  if (queryString) {
    searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
  }
   return encodeURI(
    `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?${sortQuery}${searchQuery}`
  )
  },[sortField, sortDirection, queryString]);

const API = {
    url: encodeUrl(),
    token: `Bearer ${import.meta.env.VITE_PAT}`,
  };

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      setErrorMessage('');

      const options = {
        method: 'GET',
        headers: {
          Authorization: API.token,
          'Content-Type': 'application/json',
        },
      };

      try {
        const response = await fetch(API.url, options);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error.message);
        }
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
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [sortField, sortDirection, queryString]);

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
        Authorization: API.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      setIsSaving(true);
      const response = await fetch(API.url, options);
      const data = await response.json();

      const records = data.records;
      if (!response.ok) {
        throw new Error(records.error.message);
      }
      const savedTodo = {
        title: records[0].fields.title,
        id: records[0].id,
        isCompleted: records[0].fields.isCompleted,
      };

      if (!records[0].fields.isCompleted) {
        savedTodo.isCompleted = false;
      }

      setTodoList([...todoList, savedTodo]);
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsSaving(false);
  };

  const changeTodo = async (editedTodo) => {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    setTodoList((prevTodoList) =>
      prevTodoList.map((todo) =>
        todo.id === editedTodo.id ? editedTodo : todo
      )
    );

    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: API.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      const response = await fetch(API.url, options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(`${error.message}. Reverting todo...`);

      const revertedTodos = todoList.map((todo) => {
        if (originalTodo.id === todo.id) {
          return originalTodo;
        } else return todo;
      });
      setTodoList([...revertedTodos]);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo} isSaving={isSaving}></TodoForm>

      <TodoList
        onCompleteTodo={changeTodo}
        onUpdateTodo={changeTodo}
        todoList={todoList}
        isLoading={isLoading}
      ></TodoList>

      <hr />

      <TodoViewForm
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortField={sortField}
        setSortField={setSortField}
        queryString={queryString}
        setQueryString={setQueryString}
      />

      <div>
        {errorMessage !== '' && (
          <div>
            <hr />
            <p>{errorMessage}</p>{' '}
            <button type="button" onClick={() => setErrorMessage('')}>
              Dismiss
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
