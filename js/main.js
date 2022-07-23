let email_registrado = "marco@naa.com"
let pass_registrado = "1234"
let bienvenida = document.getElementById("bienvenida"); //CAPTURA DE NODO POR ID
let seccionProductos = document.getElementById("products");
let boton_logIn = document.getElementById("boton-logIn");
let boton_signUp = document.getElementById("boton-signUp");
const contenedorJugos = document.getElementById("contenedorJugos");
let secSesion =  document.getElementById("sesion");

class Usuario { //CONSTRUCTOR
    constructor(nombre, nuevo_email, nuevo_pass){
        this.nombre = nombre
        this.nuevo_email = nuevo_email
        this.nuevo_pass = nuevo_pass
    }
}

const usuarios = [ //ARREGLO DE OBJETOS -- de LET A CONST para que no se pueda modificar su estructura 
    new Usuario("Marco", "marco@naa.com", "1234"),
]

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

function saludo(){ //FUNCIÓN
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
        //mostrar error

        //agregar la clase de error
    }
    else{
        //agreagr la clase de correcto
        let nuevo_usuario = new Usuario(nombre, nuevo_email, nuevo_pass);
        usuarios.push(nuevo_usuario); //METODO PUSH

        secSesion.remove();
        saludo()
    }
    
}

boton_signUp.addEventListener("click", signUp) //EVENTO

function logIn(){ //FUNCIÓN
    let email = document.getElementById("email_usuario").value; //CAPTURA DE NODO POR ID Y VALUE
    let pass = document.getElementById("pass_usuario").value; 

    
    if(email == email_registrado && pass == pass_registrado){ //CONDICIONAL
        secSesion.remove();
        saludo()
    }
    else{
        bienvenida.innerHTML="<h2 class='titulo-error'>¡Datos incorrectos! No puede ingresar</h2>"; //MODIFICANDO EL NODO CON INNER HTML
    }
}

boton_logIn.addEventListener("click", logIn) //EVENTO


//CARRITO
const carrito = []; //ARREGLO VACÍO

document.addEventListener("click", function(e){

    if(e.target.matches(".btn-agregar")){ //BOTÓN PARA AGREGAR AL CARRITO
        const productoSeleccionado = productos.find(el => el.id === parseInt(e.target.id)) //METODO FIND
        //console.log(productoSeleccionado) //solo para prueba
        carrito.push(productoSeleccionado) //METODO PUSH
    
        const $carrito = document.getElementById('carrito') //$carrito: nodo del HTML
        $carrito.innerHTML += `
            <div class="product-card">
                <img src="${productoSeleccionado.img}" alt="Jugo de naranja y zanahoria">
                <h3>${productoSeleccionado.nombre}</h3>
                <div class="juice-price">
                    <span>${productoSeleccionado.precio}</span>
                </div>
                <i id="${productoSeleccionado.id}" class="fa-solid fa-trash-can"></i>
            </div>
        `

        /* FALTA TOTALIZAR */

    }

    if(e.target.matches(".social i")){ //BOTÓN PARA REGISTRO E INICIO DE SESIÓN CON RRSS
        secSesion.remove();
        saludo()
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