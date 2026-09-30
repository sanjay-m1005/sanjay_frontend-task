import { useState } from "react"

const Alpha = () => {
    const[valueAlpha,setvalueAlpha]=useState("hello react")
    const handlechange=()=>{
        setvalueAlpha("welcome to react")
    }
  return (
    <>
    <div>
        <h1>{valueAlpha}</h1>
        <button onClick={handlechange}>click</button>
    </div>

    
    
    
    
    </>
  )
}

export default Alpha
