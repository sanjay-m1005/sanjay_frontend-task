import { useState } from "react"

const Search = () => {

  const [display, setDisplay] = useState("");
  
  const handleChange = e => {
    const { value } = e.target;
    console.log(value)
    setDisplay(value)
  }

  return (
    <>

      <input type="text" onChange={handleChange} placeholder="search" value={display}/>
      <h1>You are searching for {display}</h1>
    </>
  )
}

export default Search
