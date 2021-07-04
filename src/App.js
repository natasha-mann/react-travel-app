import "./App.css";
import { Component } from "react";

import fetchData from "./utils/fetchData";

import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import WeatherCard from "./components/WeatherCard";
import HealthCard from "./components/HealthCard";
import CountryCard from "./components/CountryCard";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorCard from "./components/ErrorCard";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countryName: "",
      countryData: null,
      healthData: null,
      weatherData: null,
      countryDataError: null,
      healthDataError: null,
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

  async getHealthData() {
    const params = {
      format: "json",
    };
    const { data, error } = await fetchData(
      `https://travelbriefing.org/${this.state.countryName}`,
      params
    );

    if (data) {
      this.setState({
        healthData: data,
        healthDataError: null,
        isLoading: false,
        firstSearch: false,
      });
    }

    if (error) {
      this.setState({
        healthDataError: error,
        healthData: null,
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

    await this.getHealthData();

    if (this.state.countryData) {
      await this.getWeatherData(this.state.countryData[0].capital);
    }
  };

  onChange = (event) => {
    this.setState({
      countryName: event.target.value,
    });
  };

  // renderCountryCard() {
  //   const { countryData, countryDataError, isLoadingCountryData } = this.state;

  //   if (countryData && !isLoadingCountryData && !countryDataError) {
  //     return <CountryCard data={countryData} />;
  //   } else if (!countryData && !isLoadingCountryData && countryDataError) {
  //     return <ErrorCard message={countryDataError} />;
  //   } else if (isLoadingCountryData) {
  //     return <LoadingSpinner />;
  //   }
  // }

  // renderHealthCard() {
  //   const { countryData, healthData, healthDataError, isLoadingHealthData } =
  //     this.state;

  //   if (healthData && !isLoadingHealthData && !healthDataError) {
  //     return <HealthCard />;
  //   } else if (
  //     // !countryData &&
  //     !healthData &&
  //     !isLoadingHealthData &&
  //     healthDataError
  //   ) {
  //     return <ErrorCard message={healthDataError} />;
  //   } else if (isLoadingHealthData) {
  //     return <LoadingSpinner />;
  //   }
  // }

  // renderWeatherCard() {
  //   const { countryData, weatherData, weatherDataError, isLoadingWeatherData } =
  //     this.state;

  //   if (
  //     // countryData &&
  //     weatherData &&
  //     !isLoadingWeatherData &&
  //     !weatherDataError
  //   ) {
  //     return <WeatherCard />;
  //   } else if (
  //     // !countryData &&
  //     !weatherData &&
  //     !isLoadingWeatherData &&
  //     weatherDataError
  //   ) {
  //     return <ErrorCard message={weatherDataError} />;
  //   } else if (isLoadingWeatherData) {
  //     return <LoadingSpinner />;
  //   }
  // }

  renderCurrentCard() {
    const {
      countryData,
      weatherData,
      healthData,
      countryDataError,
      healthDataError,
      weatherDataError,
      isLoading,
    } = this.state;

    if (
      countryData &&
      !isLoading &&
      !countryDataError &&
      !healthDataError &&
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
            <CountryCard data={countryData} />
          </div>
          <div className="border col-sm-12 col-md-8">
            <WeatherCard data={weatherData} />
            <HealthCard data={healthData} />
          </div>
        </div>
      );
    } else if (!countryData && !isLoading && countryDataError) {
      return (
        <div>
          <ErrorCard message={countryDataError} />
          <SearchForm
            className="p-3"
            placeholder="Enter a country"
            onSubmit={this.onSubmit}
            onChange={this.onChange}
          />
        </div>
      );
    } else if (isLoading) {
      return <LoadingSpinner />;
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

        {this.isLoading && <LoadingSpinner />}

        {!this.state.firstSearch && this.renderCurrentCard()}
      </div>
    );
  }
}

export default App;
