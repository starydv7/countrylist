import React,{useState,useEffect} from 'react'

const CounterPage = () => {
    const [data, setData] = useState([]);
    const fetchData = () => {
        fetch("https://restcountries.com/v3.1/all")
            .then((res) => res.json())
            .then((res) => {
            setData(res)
            }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        fetchData()
    }, [])
    console.log(setData);
  return (
    <div>CounterPage</div>
  )
}

export default CounterPage