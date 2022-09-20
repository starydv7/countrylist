import React, { useState, useEffect } from 'react';
import styles from "./country.module.css";
import { useContext } from 'react';
import { AppContext } from './Context';
import { useNavigate } from "react-router-dom";
const CounterPage = () => {
    const [countrydata, setCountrydata] = useState([]);
    const { setNewdata, newdata } = useContext(AppContext);
    const [countryList, setCountryList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    //data fetch full data
    const fetchData = () => {
        fetch("https://restcountries.com/v3.1/all")
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
            setCountrydata(res)
            }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        fetchData()
    }, [])
    //sorting working
    const sorthandle=(e) => {
        const { value } = e.target;
        if (value === "asc") {
            const newdata = countrydata.sort((a, b) => {
                return a.population-b.population
            })
            setCountrydata([...newdata])
            console.log(newdata)
        }
        if (value === "desc") {
            const newdata = countrydata.sort((a, b) => {
                return b.population-a.population
            })
            setCountrydata([...newdata])
            console.log(newdata)
        }
    }
    //filter full working
     const filterhandle = (e) => {
       const { value } = e.target;
       if (value !== "empty") {
         fetch(`https://restcountries.com/v3.1/region/${value}`)
           .then((res) => res.json())
           .then((res) => {
             setCountrydata([...res]);
           })
           .catch((err) => {
             console.log(err);
           });
       }
    };
    
    //searching minor mistakes
    // function handleChange(e) {
    //   setSearchTerm(e.target.value);
    //   const list = countrydata.filter((p) =>
    //     p.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    //   );
    //   setCountrydata(list);
    // }
    const searchFun = (key) => {
        fetch("https://restcountries.com/v3.1/all")
            .then((res) => {
                res.json()
                    .then((data) => {
                        console.log(data);
                })
        })    
    };
    return (
      <div>
        <div>
          <h3>
            Sort by Population :-{" "}
            <span>
              <select onChange={sorthandle}>
                <option value="/">Sort by Population</option>
                <option value="desc">High to Low</option>
                <option value="asc">Low to High</option>
              </select>
            </span>
          </h3>
        </div>
        <div>
          <h3>
            Filter by Regision :-{" "}
            <span>
              <select onChange={filterhandle}>
                <option value="empty">Select Regision </option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
              </select>
            </span>
          </h3>
        </div>
        <label>find countries</label>
        <input type="text" onChange={searchFun} />
        <br />
        {countrydata.length > 1 &&
          countrydata.length < 10 &&
          countrydata.map((list) => {
            return (
              <div key={list.name} style={{ display: "flex" }}>
                <p>{list.name}</p>{" "}
                <button onClick={() => setCountrydata([list])}>Show</button>
              </div>
            );
          })}

        <div className={styles.pawan}>
          {countrydata &&
            countrydata.map((el, i) => {
              return (
                <div key={i}>
                  <img
                    className={styles.img}
                    src={
                      el.coatOfArms?.svg
                        ? el.coatOfArms?.svg
                        : "https://preview.redd.it/5mr5jn1kd8111.png?auto=webp&s=887ce4f9569f6d7abb7cd3412015640a841354e6"
                    }
                    alt=""
                  />
                  <h2>{el.name?.common}</h2>
                  <h3>
                    Population: <span>{el.population}</span>
                  </h3>
                  <h3>
                    Regision: <span>{el.region}</span>
                  </h3>
                  <h3>
                    Capital: <span>{el.capital}</span>
                  </h3>
                  <button
                    className={styles.submit}
                    onClick={() => {
                      setNewdata(el);
                      navigate("/details");
                    }}
                  >
                    More details
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    );
}

export default CounterPage