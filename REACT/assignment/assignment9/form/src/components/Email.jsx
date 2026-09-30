import { useState } from "react"

const Email = () => {
    const[valueemail,setvalueemail]=useState("")
    const[newemail,setnewemail]=useState("")
    const handlemail=(e)=>{
        setvalueemail(e.target.value)
    }
    const clickhandle=()=>{
        setnewemail(valueemail)
    }
  return (
    <>
    <div>
        <input type="email" onChange={handlemail} placeholder="enter the email"/>
        <button onClick={clickhandle}>show</button>
        <p>{newemail}</p>
    </div>
    
    
    
    </>
  )
}

export default Email
