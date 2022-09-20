import React,{useState,useEffect} from 'react'

const CounterPage = () => {
    const [countrydata, setCountryData] = useState([]);
    const fetchData = () => {
        fetch("https://restcountries.com/v3.1/all")
            .then((res) => res.json())
            .then((res) => {
            setCountryData(res)
            }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        fetchData()
    }, [])
    console.log(setCountryData);
  return (
    <div>CounterPage</div>
  )
}

export default CounterPage