import { useState } from "react"

const True = () => {
    const [newbolean,setneqBolean]=useState(true)
   
  return (
    <>
    {
      newbolean && <p>hello world</p>
    }
    <button onClick={()=>setneqBolean(!newbolean)}>
      {
        newbolean?"hide":"show"
      }
    </button>
    
    </>
  )
}

export default True
