import { Link } from "react-router-dom"
const Navbar = () => {

  return (
    <>
    <nav className="bg-blue-700 flex gap-70 p-5 ">
        <Link to={"/name"}>name</Link>
        <Link to={"/employee"}>employee</Link>
        <Link to={"/product"}>product</Link>
    </nav>
    
    
    </>
  )
}

export default Navbar
