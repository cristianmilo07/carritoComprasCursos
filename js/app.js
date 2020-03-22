// Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');


//Listeners
cargarEventListeners();

function cargarEventListeners(){
    //Dispara cuando se presiona "Agregar Carrito"
    cursos.addEventListener('click', comprarCurso);
    
}



//Funciones

//Función que añade el curso al carrito
function comprarCurso(e) {
    e.preventDefault();
    //console.log(e.target.classList);
    //Delegation para agregar-carrito
    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement;
        //console.log(curso)
        //Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);
    }
}

// Lee los datos del curso
function leerDatosCurso(curso){
    console.log(curso)
}