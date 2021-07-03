const SearchForm = (props) => {
  return (
    <div className="position-absolute top-50 start-50 translate-middle p-5 search-container">
      <form onSubmit={props.onSubmit}>
        <h2 className="pb-3">{props.text}</h2>
        <div className="input-group my-4">
          <input
            type="text"
            className="form-control"
            placeholder={props.placeholder}
            onChange={props.onChange}
            value={props.value}
          />
          <button
            className="btn btn-outline-secondary search-btn"
            type="submit"
            id="search-btn"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
