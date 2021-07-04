const ErrorCard = (props) => {
  return (
    <div className="container">
      <div
        className="alert alert-danger position-absolute top-50 start-50 translate-middle"
        role="alert"
      >
        {props.message}
      </div>
    </div>
  );
};

export default ErrorCard;
