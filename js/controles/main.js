import { servicesProducts } from "../services/services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-formulario]");

function createCard(modelo, precio, imagen, id) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="img-container">
            <img src="${imagen}" alt="${modelo}">
        </div>
        <div class="info-container">
            <p class="lapto">${modelo}</p>
            <div class="value-container">
                <p>${precio}</p>
                <button class="delete-button" data-id="${id}"> 
                    <img src="./iconos/borrar.png" alt="icono-borrar">
                </button>
            </div>
        </div>
    `;

    const deleteButton = card.querySelector(".delete-button");
    if (deleteButton) {
        deleteButton.addEventListener("click", async (event) => {
            event.preventDefault();
            try {
                await servicesProducts.borrarProducto(id);
                card.remove();
            } catch (error) {
                console.log(error);
            }
        });
    } else {
        console.error("Error: No se encontró el botón de borrar en la tarjeta");
    }

    productContainer.appendChild(card);
    return card;
}

const render = async () => {
    try {
        const listaProduct = await servicesProducts.ProductList();
        listaProduct.forEach(product => {
            productContainer.appendChild(
                createCard(product.modelo, product.precio, product.imagen, product.id)
            );
        });
    } catch (error) {
        console.log(error);
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const modelo = document.querySelector("[data-modelo]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value;

    console.log(modelo);
    console.log(precio);
    console.log(imagen);

    servicesProducts.createProducts(modelo, precio, imagen).then((res)=>console.log(res)). catch((res)=>console.log(res));
});

render();
