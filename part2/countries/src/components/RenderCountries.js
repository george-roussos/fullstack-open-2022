import React from "react";
import axios from "axios";
import { useEffect } from "react";

const RenderCountries = (props) => {
  const hook = () =>
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      const results = response.data.map((country) => ({
        name: country.name.common,
        capital: Array.isArray(country.capital)
          ? country.capital[0]
          : country.capital,
        area: country.area,
        languages: country.languages
          ? Object.values(country.languages)
          : ["No language"],
        flag: country.flags.png,
        id: country.cca2,
      }));
      props.setAllCountries(results);
      props.setCountries(results);
    });

  useEffect(hook, []);

  return (
    <div>
      {!Array.isArray(props.matches) ? (
        <div>{props.matches}</div>
      ) : (
        props.matches.map((country) => (
          <span key={country.id}>
            <h2>{country.name}</h2>
            {!props.search ? null : (
              <>
                <button
                  onClick={() => {
                    props.setButtonVisible(true);
                    if (props.button === "show") {
                      props.setCountries([country]);
                      props.setButton("hide");
                      props.setCapital(country.capital);
                    } else if (props.button === "hide") {
                      props.setCountries(props.allCountries);
                      props.setButton("show");
                      props.setButtonVisible(false);
                      props.setCapital("");
                    }
                  }}
                >
                  {`${props.button}`}
                </button>
              </>
            )}
            {(props.buttonIsVisible && props.search) ||
            (!props.buttonIsVisible && !props.search) ? (
              <>
                <p>capital:&nbsp;{country.capital}</p>
                <p>area:&nbsp;{country.area}</p>
                <b>languages:</b>
                <ul>
                  {country.languages.map((language, index) => (
                    <li key={index}>{language}</li>
                  ))}
                </ul>
                <img alt="country flag" src={country.flag} />
              </>
            ) : null}
          </span>
        ))
      )}
    </div>
  );
};

export default RenderCountries;
