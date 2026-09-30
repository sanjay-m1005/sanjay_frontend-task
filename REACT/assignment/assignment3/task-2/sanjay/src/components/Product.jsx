import juise from "../assets/image/coca.jpg"

const product = () => {
  return (
   <>
   
    <div>
        <div>
            <img src="./images/cam.jpg" alt="camera" />
            <h2>CAMERA</h2>
            <h3>1000</h3>
            <button>buy</button>
        </div>
        <div>
            <img src={juise} alt="" />
            <h2>juice</h2>
            <h3>200</h3>
            <button>buy</button>
            
        </div>

      
    </div>
   
   </>
  )
}

export default product
