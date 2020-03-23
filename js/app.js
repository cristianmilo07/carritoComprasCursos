// Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');


//Listeners
cargarEventListeners();

function cargarEventListeners(){
    //Dispara cuando se presiona "Agregar Carrito"
    cursos.addEventListener('click', comprarCurso);

    // Cuando se limina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Al vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // Al cargar el documento, mostrar LocalStorage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
    
}



//Funciones

//Función que añade el curso al carrito
function comprarCurso(e) {
    e.preventDefault();
    //console.log(e.target.classList);
    //Delegation para agregar-carrito
    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement;
        debugger;
        //console.log(curso)
        //Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);
    }
}

// Lee los datos del curso
function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    debugger;
    console.log(curso)
    console.log(infoCurso)

    insertarCarrito(infoCurso)
}

// Muestra el curso seleccionado en el carrito
function insertarCarrito(curso){
    const row = document.createElement('tr');
    row.innerHTML=`
        <td>
            <img src="${curso.imagen}">
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;
    debugger;
    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso);
}

//Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
    e.preventDefault();

    //console.log('Eliminado');

    let curso,
        cursoId;
    if(e.target.classList.contains('borrar-curso')){
        //console.log(e.target.parentElement.parentElement.remove());
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');

        //console.log(cursoId)
    }
    eliminarCursoLocalStorage(curso);
}

//Eliminar los cursos del carrito en el DOM
function vaciarCarrito(){
    // Forma lenta
    //listaCursos.innerHTML = '';
    // Forma rápida (recomendada)
    while(listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild);
    }
    return false
}

//Almacena cursos en el carrito a local storage

function guardarCursoLocalStorage(curso){
    let cursos;

    cursos = obtenerCursoLocalStorage();

    //console.log(cursos)

    //el curso seleccionado se agrega al agreglo
    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos))
}

// Comprueba q haya elementos en el local storage
function obtenerCursoLocalStorage(){
    let cursosLS;
    // comprobamos si hay algo en el local storage
    if (localStorage.getItem('cursos')=== null){
        cursosLS = []
    } else {
        cursosLS = JSON.parse (localStorage.getItem('cursos'));
    }
    return cursosLS
}

// Imprime los cursos del Local Storage en el carrito

function leerLocalStorage(){
    let cursosLS
    cursosLS = obtenerCursoLocalStorage();
    //console.log("Imprime los cursos del local Storage",cursosLS)

    cursosLS.forEach(function(curso){
        const row = document.createElement('tr');
        row.innerHTML=`
            <td>
                <img src="${curso.imagen}">
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;
        debugger;
        listaCursos.appendChild(row);
    })
}

function eliminarCursoLocalStorage(curso) {
   let cursosLS;
    //Obtenemos el arreglo de cursos
   cursosLS = obtenerCursoLocalStorage();
   // Iteramos comparando el ID del curso borrado con los del ls
   cursosLS.forEach(function(cursoLS, index){
    if(cursoLS.id === curso) {
        cursosLS.splice(index, 1);
    }
   });

   // Añadimos el arreglo actual a storage
   localStorage.setItem('cursos', JSON.stringify(cursosLS));
}
