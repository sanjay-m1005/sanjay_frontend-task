const Name = () => {
    const name={
        name:"sanjay",
        age:22,
        coures:"full stack",
        city:"chennai"
    }
  return (
    <>
    <div>
        <div>
            <h2>names</h2>
        </div>
        <div>
            <p>{name.name}</p>
            <p>{name.age}</p>
            <p>{name.coures}</p>
            <p>{name.city}</p>
        </div>
    </div>
    
    
    </>
  )
}

export default Name
