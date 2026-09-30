import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <>
    <div className="bg-red-400 flex gap-50 p-8 m-5">
    <Link to={"/student"}>student</Link>
    <Link to={"/product"}>product</Link>
    <Link to={"/employee"}>employee</Link>
    </div>
    
    </>
  )
}

export default Navbar
