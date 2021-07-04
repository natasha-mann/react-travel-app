import { v4 as uuidv4 } from "uuid";

const CountryCard = ({ data }) => {
  const { name, capital, region, languages, flag } = data[0];

  const languageListItems = (languages) => {
    return languages.map((language) => {
      return (
        <li className="list-group-item" key={uuidv4()}>
          {language.name}
        </li>
      );
    });
  };

  return (
    <div className="card mx-auto country-card ">
      <img src={flag} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title text-center pb-2">{name}</h5>
        <ul className="list-group ">
          <li className="list-group-item">
            <span className="fw-bold">Capital: </span> {capital}
          </li>
          <li className="list-group-item">
            <span className="fw-bold">Region: </span>
            {region}
          </li>

          <ul className="list-group ">
            <li className="list-group-item ">
              <span className="fw-bold">Languages:</span>
            </li>
            {languageListItems(languages)}
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default CountryCard;
