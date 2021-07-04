import "./App.css";
import { Component } from "react";

import fetchData from "./utils/fetchData";

import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import WeatherCard from "./components/WeatherCard";
import HealthCard from "./components/HealthCard";
import CountryCard from "./components/CountryCard";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countryName: "",
      countryData: null,
      travelData: null,
      weatherData: null,
      countryDataError: null,
      travelDataError: null,
      weatherDataError: null,
      isLoading: false,
      firstSearch: true,
    };
  }

  async getCountryData() {
    const { data, error } = await fetchData(
      `https://restcountries.eu/rest/v2/name/${this.state.countryName}`
    );

    if (data) {
      this.setState({
        countryData: data,
        countryDataError: null,
        isLoading: false,
        firstSearch: false,
      });
    }

    if (error) {
      this.setState({
        countryDataError: error,
        countryData: null,
        isLoading: false,
        firstSearch: false,
      });
    }
  }

  async getTravelData() {
    const params = {
      format: "json",
    };
    const { data, error } = await fetchData(
      `https://travelbriefing.org/${this.state.countryName}`,
      params
    );

    if (data) {
      this.setState({
        travelData: data,
        travelDataError: null,
        isLoading: false,
        firstSearch: false,
      });
    }

    if (error) {
      this.setState({
        travelDataError: error,
        travelData: null,
        isLoading: false,
        firstSearch: false,
      });
    }
  }

  async getWeatherData(cityName) {
    const params = {
      q: cityName,
      units: "metric",
      appid: "60b4fb66103f9e3c6f93920a7d7f1377",
    };

    const { data, error } = await fetchData(
      "http://api.openweathermap.org/data/2.5/weather",
      params
    );

    if (data) {
      this.setState({
        weatherData: data,
        weatherDataError: null,
        isLoading: false,
        firstSearch: false,
      });
    }

    if (error) {
      this.setState({
        weatherDataError: error,
        weatherData: null,
        isLoading: false,
        firstSearch: false,
      });
    }
  }

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({
      isLoading: true,
    });

    await this.getCountryData();

    await this.getTravelData();

    await this.getWeatherData(this.state.countryData[0].capital);

    console.log(this.state.weatherData);
  };

  onChange = (event) => {
    this.setState({
      countryName: event.target.value,
    });
  };

  renderCurrentCard() {
    const {
      countryData,
      travelData,
      weatherData,
      countryDataError,
      travelDataError,
      weatherDataError,
      isLoading,
    } = this.state;

    if (
      countryData &&
      travelData &&
      weatherData &&
      !isLoading &&
      !countryDataError &&
      !travelDataError &&
      !weatherDataError
    ) {
      return (
        <div className="row main g-0">
          <div className="border col-sm-12 col-md-4">
            <SearchForm
              className="p-3"
              placeholder="Enter a country"
              onSubmit={this.onSubmit}
              onChange={this.onChange}
            />
            <CountryCard />
          </div>
          <div className="border col-sm-12 col-md-8">
            <WeatherCard />
            <HealthCard />
          </div>
        </div>
      );
    } else if (
      (!countryData &&
        !travelData &&
        !weatherData &&
        !isLoading &&
        countryDataError,
      travelDataError,
      weatherDataError)
    ) {
      // return <ErrorCard message={error} />;
      return <div>Error</div>;
    } else if (isLoading) {
      // return <LoadingSpinner />;
      return <div>Loading</div>;
    }
  }

  render() {
    return (
      <div>
        <Header title="Travel Companion" />

        {this.state.firstSearch && (
          <SearchForm
            className="position-absolute top-50 start-50 translate-middle p-5 search-container"
            text="Where would you like to go?"
            placeholder="Enter a country"
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            value={this.state.countryName}
          />
        )}

        {this.renderCurrentCard()}
      </div>
    );
  }
}

export default App;
