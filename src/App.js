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
      isLoading: true,
    };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const { data, error } = await fetchData(
      `https://restcountries.eu/rest/v2/name/${this.state.countryName}`
    );

    if (data) {
      this.setState({
        data,
        error: null,
        isLoading: false,
      });
    }

    if (error) {
      this.setState({
        error,
        data: null,
        isLoading: false,
      });
    }
  };

  onChange = (event) => {
    this.setState({
      countryName: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <Header title="Travel Companion" />
        {/* <div className="row main g-0">
    <div className="border col-sm-12 col-md-4">Country Card</div>
    <div className="border col-sm-12 col-md-8">
      <div className="border weather">Weather Card</div>
      <div className="border health">Health Card</div>
    </div>
  </div> */}

        <SearchForm
          text="Where would you like to go?"
          placeholder="Enter a country"
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          value={this.state.countryName}
        />
      </div>
    );
  }
}

export default App;
