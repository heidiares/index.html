// funciones utilizadas por la calculadora

function mostrarCampos() {
    const operacion = document.getElementById("operacion").value;
    const campos = document.getElementById("campos");
    campos.innerHTML = "";
    limpiarMensajes();

    if (operacion === "triangulo") {
        campos.innerHTML = `
            <input type="number" id="base" placeholder="Base">
            <input type="number" id="altura" placeholder="Altura">
        `;
    } 
    else if (operacion === "esfera") {
        campos.innerHTML = `
            <input type="number" id="radio" placeholder="Radio">
        `;
    } 
    else if (operacion === "divisa") {
        campos.innerHTML = `
            <input type="number" id="cantidad" placeholder="Cantidad en MXN">
            <select id="moneda">
                <option value="">Seleccione moneda</option>
                <option value="usd">Dólar (USD)</option>
                <option value="eur">Euro (EUR)</option>
            </select>
        `;
    }
}

function validarNumero(valor, nombreCampo) {
    if (valor === "") {
        return "Te hizo falta ingresar: " + nombreCampo;
    }
    if (isNaN(valor)) {
        return "El campo " + nombreCampo + " debe ser numérico.";
    }
    if (Number(valor) <= 0) {
        return "El campo " + nombreCampo + " debe ser mayor que 0.";
    }
    return "";
}

function calcular() {
    const operacion = document.getElementById("operacion").value;
    const errorDiv = document.getElementById("error");
    const resultadoDiv = document.getElementById("resultado");

    limpiarMensajes();
    let errorMensaje = "";

    if (operacion === "triangulo") {
        const base = document.getElementById("base").value;
        const altura = document.getElementById("altura").value;

        errorMensaje = validarNumero(base, "Base") || validarNumero(altura, "Altura");

        if (!errorMensaje) {
            const area = (Number(base) * Number(altura)) / 2;
            resultadoDiv.textContent = "Área = " + area.toFixed(2);
        }
    }

    else if (operacion === "esfera") {
        const radio = document.getElementById("radio").value;

        errorMensaje = validarNumero(radio, "Radio");

        if (!errorMensaje) {
            const volumen = (4/3) * Math.PI * Math.pow(Number(radio), 3);
            resultadoDiv.textContent = "Volumen = " + volumen.toFixed(2);
        }
    }

    else if (operacion === "divisa") {
        const cantidad = document.getElementById("cantidad").value;
        const moneda = document.getElementById("moneda").value;

        errorMensaje = validarNumero(cantidad, "Cantidad en MXN");

        if (!errorMensaje && moneda === "") {
            errorMensaje = "Te hizo falta seleccionar la moneda.";
        }

        if (!errorMensaje) {
            let tasa = 0;

            if (moneda === "usd") {
                tasa = 0.058;
                resultadoDiv.textContent = "USD = " + (Number(cantidad) * tasa).toFixed(2);
            } 
            else if (moneda === "eur") {
                tasa = 0.054;
                resultadoDiv.textContent = "EUR = " + (Number(cantidad) * tasa).toFixed(2);
            }
        }
    }

    else {
        errorMensaje = "Seleccione una operación.";
    }

    if (errorMensaje) {
        errorDiv.textContent = errorMensaje;
    }
}

function limpiar() {
    document.getElementById("operacion").value = "";
    document.getElementById("campos").innerHTML = "";
    limpiarMensajes();
}

function limpiarMensajes() {
    document.getElementById("error").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
}

// enlazamos los manejadores una vez que carga el documento
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('operacion').addEventListener('change', mostrarCampos);
    document.getElementById('btnCalcular').addEventListener('click', calcular);
    document.getElementById('btnLimpiar').addEventListener('click', limpiar);
    document.getElementById('error').textContent = '';
    document.getElementById('resultado').textContent = '';
});