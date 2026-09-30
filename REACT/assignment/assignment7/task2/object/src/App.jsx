import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Name from "./pages/Name"
import Employee from "./pages/Employee"
import Product from "./pages/product"

const App = () => {
  return (
    <>
    <div>
        <div>
            <h1>main page</h1>
        </div>
        <Navbar/>
        <div className="bg-red-300">
            <Routes>
                <Route path="/name" element={<Name/>}/>
                <Route path="/employee" element={<Employee/>}/>
                <Route path="/product" element={<Product/>}/>
            </Routes>
        </div>
    </div>
    
    
    </>
  )
}

export default App
