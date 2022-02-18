import React, { useState } from "react";
import Map, { City } from "./map";
import { Dropdown, Option } from "./Dropdown";

export default function Home() {
  const city = {
    latitude: "", //latitude value of the place you want to focus the map
    longitude: "", //longitude value of the place you want to focus the map
    city: "",
  };
  const [cityInfo, setlatitude] = useState(city);

  const handleSelect = (event: any) => {
    const { target } = event;
    const { value, selectedIndex } = target;
    const cityInfo = {
      city: target[selectedIndex].text,
      latitude: value.split(",")[0],
      longitude: value.split(",")[1],
    } as City;

    setlatitude(cityInfo);
  };

  return (
    <div>
      <div>
        <h1>Which location are you interested in?</h1>
        <Dropdown
          formLabel="Choose a location"
          buttonText="Send form"
          action="/"
          onChange={handleSelect}
        >
          <Option value="35.6895, 139.69171">Tokyo </Option>
          <Option value="35.43333, 139.65">Yokohama </Option>
          <Option value="35.6, 140.11667">Chiba </Option>
        </Dropdown>
      </div>
      <Map cityInfo={cityInfo} />
    </div>
  );
}
