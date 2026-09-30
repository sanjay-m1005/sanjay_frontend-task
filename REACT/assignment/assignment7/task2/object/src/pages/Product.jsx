const Product = () => {
    const product={
        name:"sanjay",
        price:12000,
        category:"gun",
        brand:"good"

    }
  return (
    <>
    <div>
        <div><h2>product</h2></div>
        <div>
            <p>{product.name}</p>
            <p>{product.price}</p>
            <p>{product.category}</p>
            <p>{product.brand}</p>
        </div>
    </div>

    
    
    
    </>
  )
}

export default Product
