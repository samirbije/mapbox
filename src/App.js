import "./App.css";
import Map from "./map";
import logo from "./Assets/img/logo.jpeg";

function App() {
  return (
    <div className="App">
      <h1>React with Mapbox GL</h1>
      <div className="container">
        <div className="map">
          <Map />
        </div>
      </div>
    </div>
  );
}

export default App;
