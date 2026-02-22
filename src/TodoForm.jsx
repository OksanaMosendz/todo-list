import styled from 'styled-components';
import { useRef } from 'react';
import { useState } from 'react';
import TextInputWithLabel from './shared/TextInputWithLabel';

const StyledTodoForm = styled.form`
  display: flex;
  width: 100%;
  align-items: center;
`;

const StyledButton = styled.button`
  font-style: ${(props) => (props.disabled ? 'italic' : 'normal')};
`;

function TodoForm({ onAddTodo, isSaving }) {
  const todoTitleInput = useRef();
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo({
      title: workingTodoTitle,
      isCompleted: false,
    });
    setWorkingTodoTitle('');
    todoTitleInput.current.focus();
  }

  return (
    <StyledTodoForm onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="todoTitle"
        ref={todoTitleInput}
        value={workingTodoTitle}
        label="Todo"
        onChange={(e) => {
          setWorkingTodoTitle(e.target.value);
        }}
      />

      <StyledButton disabled={workingTodoTitle === ''}>
        {isSaving ? 'Saving' : 'Add Todo'}
      </StyledButton>
    </StyledTodoForm>
  );
}
export default TodoForm;
