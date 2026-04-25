class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    mostrarInfo() {
        return `Nombre: ${this.nombre}, Edad: ${this.edad}`;
    }

    tipo() {
        return "Persona";
    }
}

class Estudiante extends Persona {
    constructor(nombre, edad, carrera, semestre) {
        super(nombre, edad);
        this.carrera = carrera;
        this.semestre = semestre;
    }

    mostrarInfo() {
        return `${super.mostrarInfo()}, Carrera: ${this.carrera}, Semestre: ${this.semestre}`;
    }

    tipo() {
        return "Estudiante";
    }
}

class Profesor extends Persona {
    constructor(nombre, edad, materias) {
        super(nombre, edad);
        this.materias = materias.split(",");
    }

    mostrarInfo() {
        return `${super.mostrarInfo()}, Materias: ${this.materias.join(", ")}`;
    }

    tipo() {
        return "Profesor";
    }
}

let lista = [];
let indiceEditando = null;

// VALIDACIÓN
function validar(nombre, edad, tipo, extra1, extra2) {
    if (!nombre || !edad || !tipo) {
        alert("Completa nombre, edad y tipo.");
        return false;
    }

    if (tipo === "estudiante" && (!extra1 || !extra2)) {
        alert("Completa carrera y semestre.");
        return false;
    }

    if (tipo === "profesor" && !extra1) {
        alert("Ingresa las materias.");
        return false;
    }

    return true;
}

// REGISTRAR
function registrar() {
    let nombre = document.getElementById("nombre").value.trim();
    let edad = document.getElementById("edad").value;
    let tipo = document.getElementById("tipo").value;
    let extra1 = document.getElementById("extra1").value.trim();
    let extra2 = document.getElementById("extra2").value.trim();

    if (!validar(nombre, edad, tipo, extra1, extra2)) return;

    let persona;

    if (tipo === "persona") {
        persona = new Persona(nombre, edad);
    } else if (tipo === "estudiante") {
        persona = new Estudiante(nombre, edad, extra1, extra2);
    } else {
        persona = new Profesor(nombre, edad, extra1);
    }

    lista.push(persona);
    limpiar();
    mostrar();
}

// MOSTRAR
function mostrar() {
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    lista.forEach((p, i) => {
        resultado.innerHTML += `
            <div class="card">
                <strong>[${i}] ${p.tipo()}</strong><br>
                ${p.mostrarInfo()}<br>
                <button onclick="cargarParaEditar(${i})">Editar</button>
            </div>
        `;
    });
}

// CARGAR DATOS PARA EDITAR
function cargarParaEditar(i) {
    let p = lista[i];
    indiceEditando = i;

    document.getElementById("nombre").value = p.nombre;
    document.getElementById("edad").value = p.edad;
    document.getElementById("tipo").value = p.tipo().toLowerCase();

    if (p.tipo() === "Estudiante") {
        document.getElementById("extra1").value = p.carrera;
        document.getElementById("extra2").value = p.semestre;
    } else if (p.tipo() === "Profesor") {
        document.getElementById("extra1").value = p.materias.join(",");
        document.getElementById("extra2").value = "";
    } else {
        document.getElementById("extra1").value = "";
        document.getElementById("extra2").value = "";
    }
}

// ACTUALIZAR (EDITAR TODO)
function actualizar() {
    if (indiceEditando === null) {
        alert("Selecciona primero un registro para editar.");
        return;
    }

    let nombre = document.getElementById("nombre").value.trim();
    let edad = document.getElementById("edad").value;
    let tipo = document.getElementById("tipo").value;
    let extra1 = document.getElementById("extra1").value.trim();
    let extra2 = document.getElementById("extra2").value.trim();

    if (!validar(nombre, edad, tipo, extra1, extra2)) return;

    let persona;

    if (tipo === "persona") {
        persona = new Persona(nombre, edad);
    } else if (tipo === "estudiante") {
        persona = new Estudiante(nombre, edad, extra1, extra2);
    } else {
        persona = new Profesor(nombre, edad, extra1);
    }

    lista[indiceEditando] = persona;

    indiceEditando = null;
    limpiar();
    mostrar();
}

// ELIMINAR
function eliminar() {
    let i = document.getElementById("numeroEliminar").value;

    if (i === "" || !lista[i]) {
        alert("numero inválido.");
        return;
    }

    lista.splice(i, 1);
    mostrar();
}

// BUSCAR
function buscar() {
    let nombre = document.getElementById("buscarNombre").value.toLowerCase();
    let resultado = document.getElementById("resultado");

    resultado.innerHTML = "";

    let encontrados = lista.filter(p =>
        p.nombre.toLowerCase().includes(nombre)
    );

    if (encontrados.length === 0) {
        resultado.innerHTML = "<p>No encontrado</p>";
        return;
    }

    encontrados.forEach(p => {
        resultado.innerHTML += `<div class="card">${p.mostrarInfo()}</div>`;
    });
}

// LIMPIAR
function limpiar() {
    document.getElementById("nombre").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("tipo").value = "";
    document.getElementById("extra1").value = "";
    document.getElementById("extra2").value = "";
}