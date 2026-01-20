function TodoViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label htmlFor="search-todos">Search todos</label>
        <input
          type="text"
          id="search-todos"
          value={queryString}
          onChange={(e) => {
            setQueryString(e.target.value);
          }}
        />
        <button type="button" onClick={() => setQueryString('')}>
          Clear
        </button>
      </div>

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
          value={sortDirection}
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
