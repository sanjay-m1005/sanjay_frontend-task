import { useState } from "react"

const Increment = () => {
    const[countNumber,setcountNumber]=useState(10)
    const handleClick=()=>{
        setcountNumber(countNumber+1)
    }
    const handleDec=()=>{
        setcountNumber(countNumber-1)
    }
    const handleReset=()=>{
        setcountNumber(1000)
    }
  return (
    <>
    <div>
        <h1>{countNumber}</h1>
        <button onClick={handleClick}>click++</button>
        <button onClick={handleDec}>click--</button>
        <button onClick={handleReset}>reset</button>
    </div>
    
    
    </>
  )
}

export default Increment
