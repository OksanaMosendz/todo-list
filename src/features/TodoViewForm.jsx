import styled from 'styled-components';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import { useState, useEffect, useContext } from 'react';
import { StateContext } from '../stateContext';

const StyledViewForm = styled.form`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  div {
    display: flex;
    flex: 1;
  }
`;

const StyledSortingOptions = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

function TodoViewForm() {
  const { todoState, dispatch, todoActions } = useContext(StateContext);

  const [localQueryString, setLocalQueryString] = useState(
    todoState.queryString
  );

  useEffect(() => {
    const debounce = setTimeout(() => {
      dispatch({ type: todoActions.setQueryString, string: localQueryString });
    }, 500);

    return () => clearTimeout(debounce);
  }, [localQueryString, todoState.queryString]);

  return (
    <StyledViewForm onSubmit={(e) => e.preventDefault()}>
      <div>
        <TextInputWithLabel
          elementId="searchTodos"
          label="Search todos"
          onChange={(e) => {
            setLocalQueryString(e.target.value);
          }}
          value={localQueryString}
          type="search"
        />
        <button type="button" onClick={() => setLocalQueryString('')}>
          Clear
        </button>
      </div>

      <StyledSortingOptions>
        <label htmlFor="sort-by">Sort by</label>
        <select
          id="sort-by"
          value={todoState.sortField}
          onChange={(e) => dispatch({ type: todoActions.setSortField, e })}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </select>

        <label htmlFor="direction">Direction</label>
        <select
          id="direction"
          value={todoState.sortDirection}
          onChange={(e) => dispatch({ type: todoActions.setSortDirection, e })}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </StyledSortingOptions>
    </StyledViewForm>
  );
}
export default TodoViewForm;
