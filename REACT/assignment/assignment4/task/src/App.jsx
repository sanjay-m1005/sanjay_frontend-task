import { Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import Gallery from "./pages/Gallery"
import Courses from "./pages/Courses"
import Services from "./pages/Services"
import Help from "./pages/Help"
import About from "./pages/About"

const App = () => {
  return (
    <>
    <Navbar/>

    <Routes>
      <Route path="/"element={<Home/>}/>
      <Route path="/about"element={<About/>}/>
      <Route path="/coures"element={<Courses/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/gallery" element={<Gallery/>}/>
      <Route path="/help"element={<Help/>}/>
      <Route path="/services"element={<Services/>}/>
    </Routes>
    </>
  )
}

export default App
