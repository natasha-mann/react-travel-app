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
      isLoadingCountry: true,
      isLoadingHealth: true,
      isLoadingWeather: true,
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
        isLoadingCountry: false,
        firstSearch: false,
      });
    }

    if (error) {
      this.setState({
        countryDataError: error,
        countryData: null,
        isLoadingCountry: false,
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
        isLoadingHealth: false,
        firstSearch: false,
      });
    }

    if (error) {
      this.setState({
        healthDataError: error,
        healthData: null,
        isLoadingHealth: false,
        firstSearch: false,
      });
    }
  }

  async getWeatherData(cityName) {
    const params = {
      q: cityName,
      units: "metric",
      appid: "785940357963f0488e126bd41a8d1e5c",
    };

    const { data, error } = await fetchData(
      "http://api.openweathermap.org/data/2.5/weather",
      params
    );

    if (data) {
      this.setState({
        weatherData: data,
        weatherDataError: null,
        isLoadingWeather: false,
        firstSearch: false,
      });
    }

    if (error) {
      this.setState({
        weatherDataError: error,
        weatherData: null,
        isLoadingWeather: false,
        firstSearch: false,
      });
    }
  }

  onSubmit = async (event) => {
    event.preventDefault();

    await this.getCountryData();

    if (this.state.countryData) {
      const capital = this.state.countryData[0].capital;
      await this.getWeatherData(capital);
    } else {
      this.setState({
        weatherDataError: "Failed to fetch data",
      });
    }

    await this.getHealthData();
  };

  onChange = (event) => {
    this.setState({
      countryName: event.target.value,
    });
  };

  renderCountryCard() {
    const { countryData, countryDataError, isLoadingCountry } = this.state;

    if (countryData && !isLoadingCountry && !countryDataError) {
      return <CountryCard data={countryData} />;
    } else if (!countryData && isLoadingCountry && !countryDataError) {
      return <LoadingSpinner />;
    } else if (!countryData && !isLoadingCountry && countryDataError) {
      return (
        <div>
          <ErrorCard
            className="alert alert-danger mx-auto w-50"
            message={countryDataError}
          />
        </div>
      );
    }
  }

  renderHealthCard() {
    const { healthData, healthDataError, isLoadingHealth } = this.state;

    if (healthData && !isLoadingHealth && !healthDataError) {
      return <HealthCard data={healthData} />;
    } else if (!healthData && isLoadingHealth && !healthDataError) {
      return <LoadingSpinner />;
    } else if (!healthData && !isLoadingHealth && healthDataError) {
      return (
        <div>
          <ErrorCard
            className="alert alert-danger mx-auto w-50"
            message={healthDataError}
          />
        </div>
      );
    }
  }

  renderWeatherCard() {
    const { weatherData, weatherDataError, isLoadingWeather } = this.state;

    if (weatherData && !isLoadingWeather && !weatherDataError) {
      return <WeatherCard data={weatherData} />;
    } else if (!weatherData && isLoadingWeather && !weatherDataError) {
      return <LoadingSpinner />;
    } else if (!weatherData && !isLoadingWeather && weatherDataError) {
      return (
        <div>
          <ErrorCard
            className="alert alert-danger mx-auto w-50"
            message={weatherDataError}
          />
        </div>
      );
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

        {!this.state.firstSearch && (
          <SearchForm
            className="p-3 w-50 mx-auto"
            placeholder="Enter a country"
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            value={this.state.countryName}
          />
        )}

        {this.isLoading && <LoadingSpinner />}

        {!this.state.firstSearch && (
          <div className="row main g-0">
            <div className=" col-sm-12 col-md-4">
              {this.renderCountryCard()}
            </div>
            <div className="justify-content-center col-sm-12 col-md-8">
              {this.renderWeatherCard()}
              {this.renderHealthCard()}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
