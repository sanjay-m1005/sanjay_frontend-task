const Student = () => {
    const student=[
        {id:1234,
        name:"sanjay",
        deparment:"ece",
        salary:100000
        },
        {id:1234,
        name:"sanjay",
        deparment:"ece",
        salary:100000
        },
        {id:1234,
        name:"sanjay",
        deparment:"ece",
        salary:100000
        },
        {id:1234,
        name:"sanjay",
        deparment:"ece",
        salary:100000
        },
    ]
  return (
    <>
    <div>
        <h2 className="bg-yellow-500 p-4">stident page</h2>
    </div>
    <div>
        <table className="border-collapse border-2 border-black bg-orange-400 text-blue-900">
            <thead>
                <tr>
                    <th className="border-2">name</th>
                    <th className="border-2">deparment</th>
                    <th className="border-2">salary</th>
                </tr>
            </thead>
            <tbody>
                {student.map((e)=>(
                    <tr key={e.id}>
                        <td className="border-2">{e.name}</td>
                        <td className="border-2 text-center">{e.deparment}</td>
                        <td className="border-2">{e.salary}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    
    
    </>
  )
}

export default Student
