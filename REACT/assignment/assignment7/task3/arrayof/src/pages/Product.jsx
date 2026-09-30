const Product = () => {
    const product=[
        {
            id:123,
            name:"watch",
            price:2000,
            category:"red"
        },
        {
            id:1234,
            name:"camera",
            price:2000,
            category:"white"
        },
        {
            id:1235,
            name:"helmet",
            price:2000,
            category:"green"
        },
        {
            id:1236,
            name:"bike",
            price:2000,
            category:"yellow"
        },
        {
            id:1237,
            name:"car",
            price:2000,
            category:"pink"
        },
    ]
  return (
    <>
    <div>
        <div><h2 className="bg-red-900 text-white">product page</h2></div>
        <div className="bg-gray-900 flex p-9 gap-6 flex-wrap">
            {product.map((e)=>(
                <div key={e.id} className="bg-green-600 text-white p-4 rounded-lg shadow-md border border-green-800 w-48">
                    <p>name:{e.name}</p>
                    <p>price:{e.price}</p>
                    <p>category:{e.category}</p>
                </div>
            ))}
        </div>
    </div>
    
    
    </>
  )
}

export default Product
