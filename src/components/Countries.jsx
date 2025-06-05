import React, { useEffect, useState } from "react";
import axios from "axios";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const getAllCountries = async () => {
    try {
      const response = await axios.get(
        "https://crio-location-selector.onrender.com/countries"
      );
      setCountries(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };
  const getAllStates = async () => {
    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      );
      setStates(response.data);
      setSelectedState("");
      setCities([]);
      setSelectedCity("");
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const getAllCities = async () => {
    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      );
      setCities(response.data);
      setSelectedCity("");
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };
  useEffect(() => {
    getAllCountries();
  }, []);
  useEffect(() => {
    if (selectedCountry) {
      getAllStates();
    }
  }, [selectedCountry]);
  useEffect(() => {
    if (selectedCountry && selectedState) {
      getAllCities();
    }
  }, [selectedState, selectedCountry]);

  return (
    <div className="main-container">
      <h1>Select Location</h1>
      <div className="container">
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="select-one"
        >
          <option value="" disabled>
            Select Country
          </option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          disabled={!selectedCountry}
          className="select-two"
        >
          <option value="" disabled>
            Select State
          </option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
          className="select-two"
        >
          <option value="" disabled>
            Select City
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {selectedCity && (
        <h2>
          You selected <span className="heading-two">{selectedCity}</span>,
          <span className="heading-three">
            {" "}
            {selectedState}, {selectedCountry}
          </span>
        </h2>
      )}
    </div>
  );
};

export default Countries;
