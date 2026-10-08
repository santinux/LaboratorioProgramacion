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
    let dineroDisponible = Number(dinero.textContent);
    

    if(numero < stockDisponible) {
    numero = numero + 1;    
    }
    let calculo = precioUnitario * numero;
    if (calculo > dineroDisponible) {
       precioTotal.classList.add("sin-stock");
    }else{
    precioTotal.classList.remove("sin-stock");
    }
    precioTotal.textContent = calculo;
    cantidad.textContent = numero;

});


botonMenos.addEventListener("click", function() {

    let numero = Number(cantidad.textContent);
     let precioUnitario = Number(precio.textContent);
    if (numero > 0) {
        numero = numero - 1;
        cantidad.textContent = numero;
    }
    if (calculo < dineroDisponible) {
       precioTotal.classList.remove("sin-stock");
    }
    let calculo = precioUnitario * numero;
    precioTotal.textContent = calculo;


}); 
botonComprar.addEventListener("click", function() {

    let numero = Number(cantidad.textContent);
    let stockDisponible = Number(stock.textContent);
    let dineroDisponible = Number(dinero.textContent);
    let preciototalCompra = Number(precioTotal.textContent);
    let dineroRestante = dineroDisponible - preciototalCompra;
    if (dineroRestante < 0) {
        alert("No tienes suficiente dinero para realizar la compra.");
        return;
    }
    dinero.textContent = dineroDisponible - preciototalCompra;
    
    stockDisponible = stockDisponible - numero;
    stock.textContent = stockDisponible;
    cantidad.textContent = 0;
    precioTotal.textContent = 0;
     if (stockDisponible === 0) {

        stock.classList.add("sin-stock");

    }

});
