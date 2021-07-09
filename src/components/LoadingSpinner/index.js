const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center py-5 my-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
