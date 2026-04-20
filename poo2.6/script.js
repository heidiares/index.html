// Obtener elementos del DOM
const input = document.getElementById("tareaInput"); // Campo de entrada para nuevas tareas
const boton = document.getElementById("agregarBtn"); // Botón para agregar tareas
const lista = document.getElementById("lista"); // Contenedor de la lista de tareas
const contador = document.getElementById("contador"); // Elemento para mostrar tareas pendientes

// Cargar tareas del localStorage o inicializar como array vacío si no hay datos guardados
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// Función para guardar el array de tareas en localStorage
function guardarLocal() {
    localStorage.setItem("tareas", JSON.stringify(tareas)); // Convierte el array a JSON y lo guarda
}

// Función para actualizar el contador de tareas pendientes
function actualizarContador() {
    // Cuenta cuántas tareas no están completadas
    const pendientes = tareas.filter(t => !t.completada).length;
    // Actualiza el texto del contador con el número de tareas pendientes
    contador.textContent = pendientes;
}

// Función para crear y mostrar una tarea en la lista
function crearTarea(texto, completada = false) {
    // Crear elemento de lista
    const li = document.createElement("li");

    // Crear elemento span para el texto de la tarea
    const span = document.createElement("span");
    span.textContent = texto;

    // Si la tarea ya está completada, agregar la clase CSS "completada"
    if (completada) {
        span.classList.add("completada");
    }

    // Agregar evento de click para marcar/desmarcar la tarea como completada
    span.addEventListener("click", () => {
        span.classList.toggle("completada"); 

        // Buscar la tarea en el array y cambiar su estado de completada
        const index = tareas.findIndex(t => t.texto === texto);
        tareas[index].completada = !tareas[index].completada;

        guardarLocal(); 
        actualizarContador(); 
    });

    // Crear botón para eliminar la tarea
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "X";
    btnEliminar.classList.add("eliminar");

    // Agregar evento de click al botón eliminar
    btnEliminar.addEventListener("click", () => {
        lista.removeChild(li); // Eliminar el elemento del DOM

        // Eliminar la tarea del array
        tareas = tareas.filter(t => t.texto !== texto);

        guardarLocal(); 
        actualizarContador(); 
    });

    // Agregar el texto y el botón al elemento li
    li.appendChild(span);
    li.appendChild(btnEliminar);
    // Agregar el elemento li a la lista en el DOM
    lista.appendChild(li);
}

// Función para agregar una nueva tarea
function agregarTarea() {
    // Obtener el valor del input y eliminar espacios en blanco
    const texto = input.value.trim();

    // Validar que el campo no esté vacío
    if (texto === "") {
        alert("No puedes agregar una tarea vacía");
        return;
    }

    // Agregar la nueva tarea al array con estado no completada
    tareas.push({ texto, completada: false });

    // Crear y mostrar la tarea en la lista
    crearTarea(texto);
    // Guardar los cambios en localStorage
    guardarLocal();
    // Actualizar el contador de tareas pendientes
    actualizarContador();

    // Limpiar el campo de entrada
    input.value = "";
}

// Agregar evento al botón para ejecutar la función agregarTarea cuando se haga click
boton.addEventListener("click", agregarTarea);

// Recorrer todas las tareas guardadas y mostrarlas en la lista
tareas.forEach(t => {
    crearTarea(t.texto, t.completada);
});

// Actualizar el contador inicial con las tareas pendientes
actualizarContador();