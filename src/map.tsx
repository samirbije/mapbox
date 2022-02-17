import React from "react";

import MapGL, {
  Popup,
  Marker,
  NavigationControl,
  FullscreenControl,
} from "react-map-gl";
import CityPin from "./city-pin";
import CityInfo from "./city-info";
import Data from "./cities.json";
import { Dropdown, Option } from "./Dropdown";

interface State {
  viewport: Viewport;
  popupInfo?: {
    longitude: string;
    latitude: string;
  };
}

interface Viewport {
  latitude: number; //latitude value of the place you want to focus the map
  longitude: number; //longitude value of the place you want to focus the map
  zoom: number; // zoom level
  bearing: number;
  pitch: number;
}

interface City {
  latitude: string; //latitude value of the place you want to focus the map
  longitude: string; //longitude value of the place you want to focus the map
  city?: string;
}

class map extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      viewport: {
        latitude: 36.204824, //latitude value of the place you want to focus the map
        longitude: 138.252924, //longitude value of the place you want to focus the map
        zoom: 6, // zoom level
        bearing: 0,
        pitch: 0,
      },
      popupInfo: undefined,
    };
    // window.test = () => {
    //   this.setState({
    //     ...this.state,
    //     viewport: {
    //       ...this.state.viewport,
    //       zoom: this.state.viewport.zoom === 5 ? 1 : 5,
    //     },
    //   });
    // };
  }

  _updateViewport = (viewport: Viewport) => {
    this.setState({ viewport });
  };
  // the method to render the markers
  _renderCityMarker = (city: any): JSX.Element => {
    return (
      <Marker
        longitude={Number(city.longitude)}
        latitude={Number(city.latitude)}
      >
        <CityPin
          size={20}
          onMouseEnter={() => this.setState({ popupInfo: city })}
        />
      </Marker>
    );
  };
  // method to render the Popup
  _renderPopup = () => {
    const { popupInfo } = this.state;
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={+popupInfo.longitude}
          latitude={+popupInfo.latitude}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: undefined })}
        >
          <CityInfo info={popupInfo} />
        </Popup>
      )
    );
  };

  handleSelect = (event: any) => {
    const { target } = event;
    const { value, selectedIndex } = target;
    const cityInfo = {
      city: target[selectedIndex].text,
      latitude: value.split(",")[0],
      longitude: value.split(",")[1],
    };
    this._renderCityMarker(cityInfo);
    this.setState({ popupInfo: cityInfo }, () => this._renderPopup);
  };

  render() {
    var { viewport } = this.state;

    const fullscreenControlStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      padding: "10px",
    };

    const navStyle = {
      position: "absolute",
      top: 36,
      left: 0,
      padding: "10px",
    };

    return (
      ///////////////////////////////////////////////////////////
      <>
        <div>
          <h1>Which location are you interested in?</h1>
          <Dropdown
            formLabel="Choose a location"
            buttonText="Send form"
            action="/"
            onChange={this.handleSelect}
          >
            <Option value="35.6895, 139.69171">Tokyo </Option>
            <Option value="35.43333, 139.65">Yokohama </Option>
            <Option value="35.6, 140.11667">Chiba </Option>
          </Dropdown>
        </div>
        <div className="screens">
          <div className="container">
            <div className="row">
              <div className="subContainer"></div>
              <div className="mapContainer">
                <div>
                  <MapGL
                    {...viewport}
                    width="400px"
                    height="400px"
                    mapStyle="mapbox://styles/mapbox/light-v10"
                    onViewportChange={this._updateViewport}
                    mapboxApiAccessToken={
                      "pk.eyJ1Ijoia3NhbmthbHBhIiwiYSI6ImNrZ2tuYXVxMjBqNGgycnFwajMyY2Rpb3UifQ.4XEbhyaiL5uCvKFpgMISXA"
                    }
                  >
                    {Data.map(this._renderCityMarker)}
                    {this._renderPopup()}
                    <div
                      className="fullscreen"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        padding: "10px",
                      }}
                    >
                      <FullscreenControl />
                    </div>
                    <div
                      className="nav"
                      style={{
                        position: "absolute",
                        top: 36,
                        left: 0,
                        padding: "10px",
                      }}
                    >
                      <NavigationControl />
                    </div>
                  </MapGL>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default map;
