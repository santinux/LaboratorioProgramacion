const botonMenos = document.querySelector(".menos");
const botonMas = document.querySelector(".mas");
const cantidad = document.querySelector(".cantidad");
const stock = document.querySelector(".stock");
const precio = document.querySelector(".precio");
const precioTotal = document.querySelector(".precioTotal");
const botonComprar = document.querySelector(".comprar");
const dinero = document.querySelector(".dinero");


botonMas.addEventListener("click", function() {

    let numero = Number(cantidad.textContent);
    let stockDisponible = Number(stock.textContent);
    let precioUnitario = Number(precio.textContent);
    

    if(numero < stockDisponible) {
    numero = numero + 1;    
    }
    let calculo = precioUnitario * numero;
    precioTotal.textContent = calculo;
    cantidad.textContent = numero;
    cantidad.classList.remove("sin-stock");

});


botonMenos.addEventListener("click", function() {

    let numero = Number(cantidad.textContent);
     let precioUnitario = Number(precio.textContent);
    if (numero > 0) {
        numero = numero - 1;
        cantidad.textContent = numero;
    }
    let calculo = precioUnitario * numero;
    precioTotal.textContent = calculo;


}); 
botonComprar.addEventListener("click", function() {

    let numero = Number(cantidad.textContent);
    let stockDisponible = Number(stock.textContent);
    
    stockDisponible = stockDisponible - numero;
    stock.textContent = stockDisponible;
    cantidad.textContent = 0;
    precioTotal.textContent = 0;
     if (stockDisponible === 0) {

        stock.classList.add("sin-stock");

    }

});
