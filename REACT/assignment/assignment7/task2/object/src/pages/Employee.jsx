const Employee = () => {
    const employee={
        name:"sanjay",
        role:"devoloper",
        salary:23456,
        location:"chennai"

    }
  return (
    <>
    <div>
        <div>
            <h2>names</h2>
        </div>
        <div>
            <p>{employee.name}</p>
            <p>{employee.role}</p>
            <p>{employee.salary}</p>
            <p>{employee.location}</p>
        </div>
    </div>
    
    
    </>
  )
}

export default Employee