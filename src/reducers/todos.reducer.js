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

const initialState = {
  todoList: [],
  isLoading: false,
  errorMessage: '',
  isSaving: false,
};

export { initialState, actions };
