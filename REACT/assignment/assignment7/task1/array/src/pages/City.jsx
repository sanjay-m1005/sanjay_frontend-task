
const City = () => {
    const name=["chennai" ,"bangalore","kovai","tuticorin"]
  return (
    <>
    <div>
        <div>
            <h2>enter the city</h2>
        </div>
        <div>
            {name.map((e,i)=>(
                <p key={i}>{e}</p>

            ))}

        </div>
    </div>
    
    </>
  )
}

export default City
