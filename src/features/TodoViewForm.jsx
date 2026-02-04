import styled from 'styled-components';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import { useState, useEffect } from 'react';

const StyledViewForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const StyledSortingOptions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

function TodoViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  const [localQueryString, setLocalQueryString] = useState(queryString);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);

    return () => clearTimeout(debounce);
  }, [localQueryString, setQueryString]);

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
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </select>

        <label htmlFor="direction">Direction</label>
        <select
          id="direction"
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </StyledSortingOptions>
    </StyledViewForm>
  );
}
export default TodoViewForm;
