let bienvenida = document.getElementById("bienvenida"); //CAPTURA DE NODO POR ID
let seccionProductos = document.getElementById("products");
let boton_logIn = document.getElementById("boton-logIn");
let boton_signUp = document.getElementById("boton-signUp");
const contenedorJugos = document.getElementById("contenedorJugos");
let secSesion =  document.getElementById("sesion");

let precioSubTotal = document.querySelector('.precioSubtotal'); //CAPTURA DE NODO POR CLASE
let precioTotalizado = document.querySelector('.precioTotalizado');

class Usuario { //CONSTRUCTOR
    constructor(nombre, email, pass){
        this.nombre = nombre
        this.email = email
        this.pass = pass
    }
}

if(localStorage.getItem('usuarios') === null){
    localStorage.setItem("usuarios", '[]')
}

const productos = [ // ARREGLO DE OBJETOS LITERAL
    {id: 1, nombre: "Jugo de naranja", precio: 1, img: "./img/jugo-naranja.png"},
    {id: 2, nombre: "Jugo de naranja con zanahoria", precio: 1.5, img: "./img/jugo-naranja-zanahoria.png"},
    {id: 3, nombre: "Jugo de mango", precio: 1.7, img: "./img/Jugo-de-mango.png"},
    {id: 4, nombre: "Jugo de manzana", precio: 1, img: "./img/Jugo-de-manzana.png"},
    {id: 5, nombre: "Jugo de manzana con espinaca", precio: 1.2, img: "./img/Jugo-de-manzana-y-espinaca.png"},
    {id: 6, nombre: "Jugo rojo", precio: 1.3, img: "./img/Jugo-rojo.png"},
]

//MODIFICACION CON INNER HTML
contenedorJugos.innerHTML=`
                <div class="juice-card">
                    <div class="juice-like">
                        <i class="fa-solid fa-heart"></i>
                    </div>
                    <img src="..." alt="...">
                    <h3>Nombre del jugo</h3>
                    <div class="juice-price">
                        <p>€<span> precio</span></p>
                    </div>
                    <div class="juice-add">
                        <button id="agregar" class="btn-agregar">Añadir</button>
                    </div>
                </div>
`

function mostrarJugos(arrayJugos){
    contenedorJugos.innerHTML=""
    arrayJugos.forEach(element => {
        //CONCATENACIÓN DE STRING CON LAS ETIQUETAS
        contenedorJugos.innerHTML+=`
                <div class="juice-card">
                    <div class="juice-like">
                        <i class="fa-solid fa-heart"></i>
                    </div>
                    <img src="${element.img}" alt="${element.nombre}">
                    <h3>${element.nombre}</h3>
                    <div class="juice-price">
                        <p>€<span>${element.precio}</span></p>
                    </div>
                    <div class="juice-add">
                        <button id="${element.id}" class="btn-agregar">Añadir</button>
                    </div>
                </div>
        `;
    });
}

function compraJugos(){ //FUNCIÓN
    bienvenida.innerHTML="<h2 class='titulo-bienvenida'>¡Bienvenido/a! Ahora puedes comprar los jugos que quieras.</h2>"; //MODIFICANDO EL NODO CON INNER HTML
    mostrarJugos(productos)
    seccionProductos.className = "showProducts"; //CLASS NAME
}

function signUp(){ //FUNCIÓN
    let nombre = document.getElementById("nombre_usuario").value; //CAPTURA DE NODO POR ID Y VALUE
    let nuevo_email = document.getElementById("nuevo_email").value; 
    let nuevo_pass = document.getElementById("nueva_pass").value; 

    //Expresión regular
    expReg = /^\s+$/;

    if(nombre == null || nombre.length == 0 || expReg.test(nombre)){
        document.getElementById("nombre_usuario").style.border = 'solid red 1px';
    }
    else{
        let nuevo_usuario = new Usuario(nombre, nuevo_email, nuevo_pass);
        
        const usuariosStorageString = localStorage.getItem("usuarios")
        const usuariosStorageArray = JSON.parse(usuariosStorageString)
        usuariosStorageArray.push(nuevo_usuario)
        localStorage.setItem('usuarios', JSON.stringify(usuariosStorageArray))

        secSesion.remove();
        compraJugos()
    }
}

boton_signUp.addEventListener("click", signUp) //EVENTO

function logIn(){ //FUNCIÓN
    let email = document.getElementById("email_usuario").value; //CAPTURA DE NODO POR ID Y VALUE
    let pass = document.getElementById("pass_usuario").value; 
    const $formLogIn = document.getElementById('logIn')
    $formLogIn.addEventListener('submit', (e) => e.preventDefault())

    const usuariosStorageString = localStorage.getItem("usuarios");

    const usuariosStorageArray = JSON.parse(usuariosStorageString);

    const usuarioDB = usuariosStorageArray.find( (el) => el.email === email && el.pass === pass)
    console.log(usuarioDB) // {.....}

    if(usuarioDB !== undefined){ //CONDICIONAL
        secSesion.remove();
        compraJugos()
    }
    else{
        bienvenida.innerHTML="<h2 class='titulo-error'>¡Datos incorrectos! No puede ingresar</h2>"; //MODIFICANDO EL NODO CON INNER HTML
    }
}

boton_logIn.addEventListener("click", logIn) //EVENTO


//CARRITO
localStorage.setItem('carrito', '[]')

document.addEventListener("click", function(e){

    if(e.target.matches(".btn-agregar")){ //BOTÓN PARA AGREGAR AL CARRITO
        const productoSeleccionado = productos.find(el => el.id === parseInt(e.target.id)) //METODO FIND
        //console.log(productoSeleccionado) //solo para prueba
        const carritoLocalStorage = JSON.parse(localStorage.getItem('carrito'))
        carritoLocalStorage.push(productoSeleccionado)
        localStorage.setItem('carrito', JSON.stringify(carritoLocalStorage))
    
        const $carrito = document.getElementById('carrito') //$carrito: nodo del HTML
        $carrito.innerHTML += `
            <div class="product-card">
                <img src="${productoSeleccionado.img}" alt="${productoSeleccionado.nombre}">
                <h3>${productoSeleccionado.nombre}</h3>
                <div class="juice-price">
                    <span>${productoSeleccionado.precio}</span>
                </div>
                <i id="${productoSeleccionado.id}" class="fa-solid fa-trash-can eliminar_jugo"></i>
            </div>
        `;

        /* SUBTOTAL */
        let subtotal_venta = carritoLocalStorage.reduce( (sub, jugo) => sub + jugo.precio, 0)
        //console.log(subtotal_venta) //solo para prueba
        precioSubTotal.innerText = subtotal_venta.toFixed(1)

        /* TOTAL */
        const COSTO_ENVIO = 2;
        let total = subtotal_venta + COSTO_ENVIO;
        precioTotalizado.innerText = total
    }

    if(e.target.matches(".eliminar_jugo")){
        console.log('Hice clic en el tachito')
        console.log(e.target)
        let padre = e.target.parentNode;
        padre.remove()

        /* FALTA ELIMINAR DEL ARRAY */
        const carritoLocalStorage = JSON.parse(localStorage.getItem('carrito'))
            
        let jugo_a_eliminar_storage = carritoLocalStorage.findIndex(element => element.id === parseInt(e.target.id));
        carritoLocalStorage.splice(jugo_a_eliminar_storage, 1);
        localStorage.setItem('carrito', JSON.stringify(carritoLocalStorage))

        /* RESTAR */
        let jugo_a_eliminar_precio = carritoLocalStorage.find(element => element.id === parseInt(e.target.id));
        let resta_subtotal = parseFloat(precioSubTotal.innerText) - jugo_a_eliminar_precio.precio; //.toFixed(2)
        precioSubTotal.innerText = resta_subtotal.toFixed(1)
        if (resta_subtotal == 0){
            precioSubTotal.innerText = 0
            precioTotalizado.innerText = "-"
        }
        else{
            let resta_total = parseFloat(precioTotalizado.innerText) - jugo_a_eliminar_precio.precio;
            precioTotalizado.innerText = resta_total.toFixed(1)
        }
    }

    if(e.target.matches(".social i")){ //BOTÓN PARA REGISTRO E INICIO DE SESIÓN CON RRSS
        secSesion.remove();
        compraJugos()
    }

    if(e.target.matches('.fa-heart')){ //BOTÓN PARA LIKE
        if(e.target.classList.contains('corazon-rojo')){
            e.target.classList.remove('corazon-rojo')
        }
        else{
            e.target.classList.add('corazon-rojo')
        }
    }
})