const ProductList =()=>{
    return fetch("http://localhost:3000/productos")
    .then ((res)=>res.json())
    .catch ((err)=>console.log(err))
};

const createProducts=(modelo, precio, imagen)=>{
    return fetch("http://localhost:3000/productos",{
        method:"POST",
        Headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({
            modelo,
            precio,
            imagen,
        }),
    })
    .then ((res)=>res.json())
    .catch ((err)=>console.log(err))
};

const borrarProducto = (id) => {
    return fetch(`http://localhost:3000/productos/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(res => {
            if (res.ok) {
                id.remove();
            } else {
                console.log("Error al eliminar el producto");
            }
        })
        .catch((err) => console.log(err))
}


export const servicesProducts={
    ProductList,createProducts,borrarProducto,
}