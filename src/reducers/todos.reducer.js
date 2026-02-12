const initialState = {
  todoList: [],
  isLoading: false,
  errorMessage: '',
  isSaving: false,
};

const actions = {
  fetchTodos: 'fetchTodos',
  loadTodos: 'loadTodos',
  revertTodos: 'revertTodos',

  addTodo: 'addTodo',
  changeTodo: 'changeTodo',

  setError: 'setError',
  clearError: 'clearError',

  startRequest: 'startRequest',
  endRequest: 'endRequest',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.fetchTodos:
      return {
        ...state,
        isLoading: true,
      };

    case actions.loadTodos:
      const fetchedTodos = action.records.map((record) => {
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
      return {
        ...state,
        todoList: [...fetchedTodos],
        isLoading: false,
      };

    case actions.revertTodos:
      const revertedTodos = state.todoList.map((todo) => {
        if (action.originalTodo.id === todo.id) {
          return originalTodo;
        } else return todo;
      });
      return {
        ...state,
        todoList: [...revertedTodos],
        errorMessage: `${action.error.message}. Reverting todo...`,
      };

    case actions.addTodo:
      const savedTodo = {
        title: action.records[0].fields.title,
        id: action.records[0].id,
        isCompleted: action.records[0].fields.isCompleted,
      };

      if (!action.records[0].fields.isCompleted) {
        savedTodo.isCompleted = false;
      }

      return {
        ...state,
        todoList: [...state.todoList, savedTodo],
        isSaving: false,
      };

    case actions.changeTodo:
      const changedTodos = state.todoList.map((todo) =>
        todo.id === action.editedTodo.id ? action.editedTodo : todo
      );

      const updatedState = {
        ...state,
        todoList: [...changedTodos],
        errorMessage: action.error ? action.error.message : '',
      };

      return {
        ...updatedState,
      };

    case actions.setError:
      return {
        ...state,
        errorMessage: action.error.message,
        isLoading: false,
      };

    case actions.clearError:
      return {
        ...state,
        errorMessage: '',
      };

    case actions.startRequest:
      return {
        ...state,
        isSaving: true,
      };

    case actions.endRequest:
      return {
        ...state,
        isLoading: false,
        isSaving: false,
      };

    default:
      break;
  }
}

export { initialState, actions, reducer };
