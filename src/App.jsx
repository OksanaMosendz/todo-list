import './App.css';
import styles from './App.module.css';
import TodosPage from './pages/TodosPage';
import { StateContext } from './stateContext';
import Header from './shared/Header';
import { useLocation, Route, Routes } from 'react-router-dom';
import { useEffect, useCallback, useContext, useState } from 'react';

function App() {
  const { todoState, dispatch, todoActions } = useContext(StateContext);
  const location = useLocation();

  const [title, setTitle] = useState('TodoList');

  const encodeUrl = useCallback(() => {
    let searchQuery = '';
    let sortQuery = `sort[0][field]=${todoState.sortField}&sort[0][direction]=${todoState.sortDirection}`;

    if (todoState.queryString) {
      searchQuery = `&filterByFormula=SEARCH("${todoState.queryString}",+title)`;
    }
    return encodeURI(
      `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?${sortQuery}${searchQuery}`
    );
  }, [todoState.sortField, todoState.sortDirection, todoState.queryString]);

  const API = {
    url: encodeUrl(),
    token: `Bearer ${import.meta.env.VITE_PAT}`,
  };

  useEffect(() => {
    if (location.pathname === '/') {
      setTitle('TodoList');
    } else if (location.pathname === '/about') {
      setTitle('About');
    } else setTitle('Not Found');
  }, [location]);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: todoActions.fetchTodos });
      dispatch({ type: todoActions.clearError });

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
        const records = await data.records;

        dispatch({ type: todoActions.loadTodos, records });
      } catch (error) {
        dispatch({ type: todoActions.setError, error });
      } finally {
        dispatch({ type: todoActions.endRequest });
      }
    };

    fetchTodos();
  }, [todoState.sortField, todoState.sortDirection, todoState.queryString]);

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
      dispatch({ type: todoActions.startRequest });
      const response = await fetch(API.url, options);
      const data = await response.json();
      const records = await data.records;

      if (!response.ok) {
        throw new Error(records.error.message);
      }
      dispatch({ type: todoActions.addTodo, records });
    } catch (error) {
      dispatch({ type: todoActions.setError, error });
    }
    dispatch({ type: todoActions.endRequest });
  };

  const changeTodo = async (editedTodo) => {
    const originalTodo = todoState.todoList.find(
      (todo) => todo.id === editedTodo.id
    );

    dispatch({ type: todoActions.changeTodo, editedTodo });

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
      dispatch({ type: todoActions.revertTodos, originalTodo });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  };

  return (
    <div className={styles.app}>
      <Header title={title} />
      <Routes>
        <Route
          path="/"
          element={
            <TodosPage
              onAddTodo={addTodo}
              onCompleteTodo={changeTodo}
              onUpdateTodo={changeTodo}
            />
          }
        />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/\*" element={<h1>Not found</h1>} />
      </Routes>
      {todoState.errorMessage !== '' && (
        <div className={styles.error}>
          <svg
            viewBox="-2.4 -2.4 28.80 28.80"
            xmlns="http://www.w3.org/2000/svg"
            fill="#c5111a"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
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
          <p>{todoState.errorMessage}</p>{' '}
          <button
            type="button"
            onClick={() => dispatch({ type: todoActions.clearError })}
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
