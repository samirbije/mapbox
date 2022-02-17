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

interface State {
  viewport: Viewport;
  popupInfo?: {
    longitude: string;
    latitude: string;
    city: string;
  };
}

interface Viewport {
  latitude: number; //latitude value of the place you want to focus the map
  longitude: number; //longitude value of the place you want to focus the map
  zoom: number; // zoom level
  bearing: number;
  pitch: number;
}

interface CityInformation {
  cityInfo: City;
}

export interface City {
  latitude: string; //latitude value of the place you want to focus the map
  longitude: string; //longitude value of the place you want to focus the map
  city: string;
}

class Map extends React.Component<CityInformation, State> {
  constructor(props: CityInformation) {
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
  }

  updateViewport = (viewport: Viewport) => {
    this.setState({ viewport });
  };
  // the method to render the markers
  renderCityMarker = (): JSX.Element => {
    const { cityInfo } = this.props;
    return (
      <Marker
        longitude={Number(cityInfo ? cityInfo.longitude : 0)}
        latitude={Number(cityInfo ? cityInfo.latitude : 0)}
      >
        {cityInfo && (
          <CityPin
            size={20}
            onMouseEnter={() => this.setState({ popupInfo: cityInfo })}
          />
        )}
      </Marker>
    );
  };

  // method to render the Popup
  renderPopup = () => {
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

  render() {
    var { viewport } = this.state;
    return (
      <>
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
                    onViewportChange={this.updateViewport}
                    mapboxApiAccessToken={
                      "pk.eyJ1Ijoia3NhbmthbHBhIiwiYSI6ImNrZ2tuYXVxMjBqNGgycnFwajMyY2Rpb3UifQ.4XEbhyaiL5uCvKFpgMISXA"
                    }
                  >
                    {Object.keys(this.props.cityInfo).length > 0 &&
                      Data.map(this.renderCityMarker)}
                    {Object.keys(this.props.cityInfo).length > 0 &&
                      this.renderPopup()}
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

export default Map;
