import { useEffect } from 'react';

function TodoViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
}) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
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
          onChange={(e) => setSortDirection(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </form>
  );
}
export default TodoViewForm;
