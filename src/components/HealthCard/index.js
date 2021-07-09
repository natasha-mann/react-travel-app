const HealthCard = ({ data }) => {
  console.log("health", data);
  const vaccineData = (vaccinations) => {
    if (vaccinations.length !== 0) {
      return vaccinations.map((vaccination) => {
        return <li className="list-group-item">{vaccination.name}</li>;
      });
    } else {
      return (
        <div className="fs-4 text-center">
          <i className="medkit icon"></i>
          There is currently no vaccine data available for {data.names.name}.
        </div>
      );
    }
  };

  return (
    <div className="card me-4 my-2">
      <div className="card-header text-center fs-2">
        Health and Vaccines for {data.names.name}
      </div>
      <div className="card-body">
        <ul className="list-group text-center">
          {vaccineData(data.vaccinations)}
        </ul>
      </div>
    </div>
  );
};

export default HealthCard;
