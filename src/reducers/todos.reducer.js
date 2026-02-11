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
  updateTodo: 'updateTodo',
  completeTodo: 'completeTodo',

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
      };

    case actions.loadTodos:
      return {
        ...state,
      };

    case actions.revertTodos:
      return {
        ...state,
      };

    case actions.addTodo:
      return {
        ...state,
      };

    case actions.updateTodo:
      return {
        ...state,
      };

    case actions.completeTodo:
      return {
        ...state,
      };

    case actions.setError:
      return {
        ...state,
      };

    case actions.clearError:
      return {
        ...state,
      };

    case actions.startRequest:
      return {
        ...state,
      };

    case actions.endRequest:
      return {
        ...state,
      };

    default:
      break;
  }
}

export { initialState, actions };
