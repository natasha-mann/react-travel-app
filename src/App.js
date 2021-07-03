import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";

function App() {
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

      <div className="border position-absolute top-50 start-50 translate-middle">
        Search Form
      </div>
    </div>
  );
}

export default App;
