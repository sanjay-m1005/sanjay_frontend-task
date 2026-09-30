
const array = () => {
    const value=["sanjay","raj","ragul","anbu","vishnu"]
  return (
    <>
    <div>
        <div>
            <h2>name</h2>
        </div>
        <div>
            {value.map((e,i)=>(
                <p key={i}>{e}</p>
            ))}
        </div>
    </div>
    
    
    </>
  )
}

export default array
