const ErrorCard = (props) => {
  return (
    <div className="container">
      <div className={props.className} role="alert">
        {props.message}
      </div>
    </div>
  );
};

export default ErrorCard;
