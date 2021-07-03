import "./App.css";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
  }

  onSubmit = (event) => {
    event.preventDefault();
    console.log("click");
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
        />
      </div>
    );
  }
}

export default App;
