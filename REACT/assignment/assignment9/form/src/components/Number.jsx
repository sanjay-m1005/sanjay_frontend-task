import { useState } from "react"

const Number = () => {
    const[valueage,setvalueage]=useState("")
    const[newage,setnewage]=useState()

    const handelage=(e)=>{
        setvalueage(e.target.value)

    }
    const changeage=(e)=>{
        e.preventDefault()

        if(valueage===""){
            setnewage("enter age")
        }else{
            setnewage(valueage)
            setvalueage("hi")//
        }
        


    }
  return (
    <>
    <div>
        <input type="number"placeholder="enter the name" value={valueage} onChange={handelage} />
        <button onClick={changeage}>submit</button>
        <p>{newage}</p>
    </div>
    
    
    </>
  )
}

export default Number
