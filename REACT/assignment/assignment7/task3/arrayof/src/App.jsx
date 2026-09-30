import { Route, Routes } from "react-router-dom"
import Student from "./pages/Student"
import Product from "./pages/Product"
import Employee from "./pages/Employee"
import Navbar from "./componets/Navbar"

const App = () => {
  return (
    <>
    <div>
        <Navbar/>
        <div>
            <h1 className="bg-pink-700 text-center text-white">main page</h1>
        </div>
        <div>
            <Routes>
                <Route path="/student" element={<Student/>}/>
                <Route path="/Product" element={<Product/>}/>
                <Route path="/employee" element={<Employee/>}/>
            </Routes>
        </div>
    </div>
    
    
    </>
  )
}

export default App
