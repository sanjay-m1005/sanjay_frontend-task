const Employee = () => {
    const employee=[
        {
            id:1234,
            name:"sanjay",
            age:22,
            course:"full stack"
        },
        {
            id:1235,
            name:"raj",
            age:32,
            course:"ui ux"
        },
        {
            id:1236,
            name:"vhisnu",
            age:28,
            course:"jawa full stack"
        },
        {
            id:1237,
            name:"naresh",
            age:89,
            course:"devops "
        }
    ]
  return (
    <>
    <div>
        <div>
            <h2 className="bg-yellow-700 p-7">employe page</h2>
        </div>
        <div className="bg-blue-700 flex gap-20 p-4 text-white">
            {employee.map((e)=>(
                <div className="bg-red-900 p-4 w-29 text-center rounded-lg"ckey={e.id}>
                    <p>{e.name}</p>
                    <p>{e.age}</p>
                    <p>{e.coure}</p>

                </div>

            ))}
        </div>
    </div>
    
    
    </>
  )
}

export default Employee
