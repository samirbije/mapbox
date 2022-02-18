import "./App.css";
import Home from "./home";

function App() {
  return (
    <div className="App">
      <h1>React with Mapbox GL</h1>
      <div className="container">
        <div className="map">
          <Home />
        </div>
      </div>
    </div>
  );
}

export default App;
