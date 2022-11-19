const cards = document.getElementById('cards');
const codigoQr = document.querySelector('#codigo_qr')
const botonQr = document.querySelector('#botonQr')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()
let carrito = {};

// Se ordena que el objeto Window espera a la ejecucion de JS
document.addEventListener('DOMContentLoaded', () =>{
    fetchData()
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
    
})

cards.addEventListener('click', e => {
    addCarrito(e)
})



// El JS espera a la lecura del archivo Json
let fetchData = async ()=>{
    try{
        const res = await fetch('json/api.json');// el archivo Json es llamado dede el index
        const data = await res.json()
        //console.log(data)
        pintarCards(data)
    } catch (error) {
        console.log(error)
    }
}

// Formacion de las celdas de ventas
const pintarCards = data => {
    data.forEach((producto, index) => {
        templateCard.querySelector('h5'). textContent = producto.title
        templateCard.querySelector('p'). textContent = "Precio $:"+producto.precio
        templateCard.querySelector('img').setAttribute('src', "./img/gondola_lactea.png")
        templateCard.querySelector('h6').textContent = producto.descrip
        templateCard.querySelector('button').dataset.id = producto.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment) // Se utiliza una memoria volatil
}

// Evente codogo QR

function mostrarQr() {
    codigoQr.style.display = "block";
}

function ocultarQr() {
    codigoQr.style.display = "none";
}

function Mostrar_Ocultar() {
    if (codigoQr.style.display == "none"){
        mostrarQr()
        botonQr.value = "Ocultar QR"
    }else{
        ocultarQr()
        botonQr.value = "Mostrar QR"
    }
}

