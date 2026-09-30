const Language=()=>{
    const Value=["html","css","js","react"]
    return(<>
    <div>
        <div>
            <h2>programing language</h2>
        </div>
        <div>
            {Value.map((e,i)=>(
                <p key={i}>{e}</p>
             ))}
        </div>
    </div>
    </>)
}
export default Language