
const Arrayofobject = () => {
  const off=[
    
      {name:"sanjay",age:22,city:"chennai"},
      {name:"raj",age:33,city:"arumabakam"},
      {name:"arun",age:34,city:"nerrustreet"}
    
  ]
    
  return (
    <>
    <div>
      <div>
        <h1>arrayof</h1>
      </div>
      <div>
        {off.map((e,i)=>(
          <p key={i}>{e}</p>
        ))}

      </div>
    </div>
    
    
    </>
  )
}

export default Arrayofobject
