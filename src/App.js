import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div>
      <div className="border header">Header</div>
      <div className="row main g-0">
        <div className="border col-sm-12 col-md-4">Country Card</div>
        <div className="border col-sm-12 col-md-8">
          <div className="border weather">Weather Card</div>
          <div className="border health">Health Card</div>
        </div>
      </div>
    </div>
  );
}

export default App;
