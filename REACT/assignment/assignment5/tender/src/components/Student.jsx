import React from 'react'

const Student = () => {
    let studentName="arun"
    let studentAge=22
    let studentCourses="fullstack"
    let isActive=true
    let studentFee=100000

  return (
    <>
    <div className='bg-red'>
        <h2>student name={studentName}</h2>
        <p>student age={studentAge}</p>
        <p>coures={studentCourses}</p>
        <p>status={isActive? "active":"not active"}</p>
        <p>fee={studentFee}</p>
    </div>

    
    
    </>
  )
}

export default Student
