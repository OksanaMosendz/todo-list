import './App.css';
import styles from './App.module.css';
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

  const encodeUrl = useCallback(() => {
    let searchQuery = '';
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    if (queryString) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    }
    return encodeURI(
      `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?${sortQuery}${searchQuery}`
    );
  }, [sortField, sortDirection, queryString]);

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
    <div className={styles.app}>
      <div className={styles.title}>
        <svg
          fill="#000000"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 32.045 32.046"
          xml:space="preserve"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {' '}
            <g>
              {' '}
              <g>
                {' '}
                <path d="M25.302,6.499h-2.308v-0.6c0-1.181-0.957-2.138-2.137-2.138h-1.021C19.807,1.675,18.108,0,16.022,0 c-2.086,0-3.785,1.675-3.815,3.761h-1.021c-1.18,0-2.137,0.957-2.137,2.138v0.6H6.742c-0.765,0-1.408,0.618-1.408,1.383v22.78 c0,0.765,0.643,1.384,1.408,1.384h18.561c0.766,0,1.408-0.619,1.408-1.384V7.881C26.71,7.117,26.067,6.499,25.302,6.499z M16.022,1.999c0.984,0,1.788,0.785,1.817,1.762h-3.634C14.235,2.784,15.038,1.999,16.022,1.999z M24.95,30.35H7.094V8.192h1.955 v1.564h13.945V8.192h1.955V30.35z"></path>{' '}
                <path d="M22.476,12.69h-4.495c-0.707,0-1.283,0.527-1.283,1.236s0.576,1.238,1.283,1.238h4.495c0.708,0,1.282-0.529,1.282-1.238 S23.184,12.69,22.476,12.69z"></path>{' '}
                <path d="M11.481,13.864l-0.965-0.752c-0.238-0.187-0.58-0.156-0.782,0.068l-0.556,0.616c-0.106,0.118-0.159,0.275-0.146,0.435 c0.014,0.159,0.092,0.305,0.217,0.403l1.683,1.328c0.406,0.321,0.988,0.287,1.354-0.079l2.949-2.949 c0.143-0.143,0.223-0.336,0.223-0.538s-0.08-0.396-0.223-0.538l-0.337-0.337c-0.297-0.297-0.778-0.297-1.075,0L11.481,13.864z"></path>{' '}
                <path d="M22.476,18.424h-4.495c-0.707,0-1.283,0.529-1.283,1.238c0,0.707,0.576,1.238,1.283,1.238h4.495 c0.708,0,1.282-0.531,1.282-1.238C23.758,18.954,23.184,18.424,22.476,18.424z"></path>{' '}
                <path d="M11.481,19.598l-0.965-0.752c-0.238-0.186-0.58-0.154-0.782,0.069l-0.556,0.616c-0.106,0.117-0.159,0.275-0.146,0.435 c0.014,0.158,0.092,0.306,0.217,0.403l1.683,1.328c0.407,0.32,0.989,0.285,1.355-0.08l2.95-2.949 c0.143-0.143,0.223-0.336,0.223-0.538c0-0.2-0.08-0.396-0.223-0.538L14.9,17.255c-0.297-0.297-0.778-0.297-1.075,0L11.481,19.598z "></path>{' '}
                <path d="M22.476,23.963h-4.495c-0.707,0-1.283,0.529-1.283,1.238s0.576,1.238,1.283,1.238h4.495c0.708,0,1.282-0.529,1.282-1.238 S23.184,23.963,22.476,23.963z"></path>{' '}
                <path d="M11.481,25.137l-0.965-0.752c-0.238-0.188-0.58-0.156-0.782,0.068l-0.556,0.615c-0.106,0.119-0.16,0.275-0.146,0.436 c0.013,0.159,0.092,0.305,0.217,0.402l1.683,1.33c0.407,0.32,0.989,0.285,1.355-0.08l2.95-2.95c0.297-0.298,0.297-0.776,0-1.075 L14.9,22.794c-0.143-0.144-0.336-0.224-0.538-0.224s-0.395,0.08-0.538,0.224L11.481,25.137z"></path>{' '}
              </g>{' '}
            </g>{' '}
          </g>
        </svg>
        <h1>Todo List</h1>
      </div>
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

      {errorMessage !== '' && (
        <div className={styles.error}>
          <svg
            viewBox="-2.4 -2.4 28.80 28.80"
            xmlns="http://www.w3.org/2000/svg"
            fill="#c5111a"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {' '}
              <g>
                {' '}
                <path fill="none" d="M0 0h24v24H0z"></path>{' '}
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z"></path>{' '}
              </g>{' '}
            </g>
          </svg>
          <p>{errorMessage}</p>{' '}
          <button type="button" onClick={() => setErrorMessage('')}>
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
