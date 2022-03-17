import React from "react";
import { useState } from "react";
import Search from "./components/Search";
import RenderCountries from "./components/RenderCountries";
import RenderWeather from "./components/RenderWeather";

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [capital, setCapital] = useState("");
  const [search, setSearch] = useState("");
  const [button, setButton] = useState("show");
  const [buttonIsVisible, setButtonVisible] = useState(false);
  const [weather, setWeather] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const api_key = process.env.REACT_APP_API_KEY;

  const matches = !search
    ? countries
    : search &&
      countries.filter((country) =>
        country.name.toLowerCase().split(" ")[0].includes(search.toLowerCase())
      ).length > 10
    ? "Too many matches, input more characters"
    : countries.filter((country) =>
        country.name.toLowerCase().split(" ")[0].includes(search.toLowerCase())
      );

  return (
    <div>
      <Search search={search} setSearch={setSearch} />
      <RenderCountries
        allCountries={allCountries}
        setAllCountries={setAllCountries}
        countries={countries}
        setCountries={setCountries}
        capital={capital}
        setCapital={setCapital}
        search={search}
        setSearch={setSearch}
        button={button}
        setButton={setButton}
        buttonIsVisible={buttonIsVisible}
        setButtonVisible={setButtonVisible}
        matches={matches}
      />
      {capital ? (
        <RenderWeather
          capital={capital}
          weather={weather}
          setWeather={setWeather}
          weatherIcon={weatherIcon}
          setWeatherIcon={setWeatherIcon}
          api_key={api_key}
        />
      ) : null}
    </div>
  );
};

export default App;
