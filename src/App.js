import "./App.css";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import { Component } from "react";

import fetchData from "./utils/fetchData";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countryName: "",
      data: null,
      error: null,
      isLoading: false,
      firstSearch: true,
    };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({
      isLoading: true,
    });

    const { data, error } = await fetchData(
      `https://restcountries.eu/rest/v2/name/${this.state.countryName}`
    );

    if (data) {
      this.setState({
        data,
        error: null,
        isLoading: false,
        firstSearch: false,
      });
    }

    if (error) {
      this.setState({
        error,
        data: null,
        isLoading: false,
        firstSearch: false,
      });
    }
  };

  onChange = (event) => {
    this.setState({
      countryName: event.target.value,
    });
  };

  renderCurrentCard() {
    const { data, error, isLoading } = this.state;

    if (data && !isLoading && !error) {
      return (
        <div className="row main g-0">
          <div className="border col-sm-12 col-md-4">
            <SearchForm
              className="p-3"
              placeholder="Enter a country"
              onSubmit={this.onSubmit}
              onChange={this.onChange}
            />
            <div>Country Card</div>
          </div>
          <div className="border col-sm-12 col-md-8">
            <div className="border weather">Weather Card</div>
            <div className="border health">Health Card</div>
          </div>
        </div>
      );
    } else if (!data && !isLoading && error) {
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
