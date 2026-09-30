import { useState } from "react"

const Name = () => {
    const [username,setusername]=useState("")
    const handlechange=(e)=>{
        setusername(e.target.value)
    }
  return (
    <>
    <input type="text" onChange={handlechange} placeholder="enter name" />
    <p>{username}</p>
    
    
    </>
  )
}

export default Name
