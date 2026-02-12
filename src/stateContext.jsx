import { createContext, useReducer } from 'react';
import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodosState,
} from './reducers/todos.reducer';

export const StateContext = createContext();

export function StateProvider({ children }) {
  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);

  return (
    <StateContext.Provider value={{ todoState, dispatch, todoActions }}>
      {children}
    </StateContext.Provider>
  );
}
