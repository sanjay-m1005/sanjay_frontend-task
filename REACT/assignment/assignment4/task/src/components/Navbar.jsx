import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <>
    <div className="bg-red-10 p-5 ">
        <div>
            <h2>web page</h2>
        </div>
        <div>
            <Link to="/">home</Link>
            <Link to="/about">about</Link>
            <Link to="/contact">contact</Link>
            <Link to="/courses">coures</Link>
            <Link to="/gallery">gallery</Link>
            <Link to="/help">help</Link>
            <Link to="/services">services</Link>
        </div>
    </div>
    
    
    </>
  )
}

export default Navbar
