// Función Sumatoria
function sumatoria() {
    let n = parseInt(document.getElementById("num1").value);
    let suma = 0;
    
    if (isNaN(n) || n < 1) {
        document.getElementById("res1").innerHTML = "Ingresa un número válido mayor que 0";
        return;
    }

    for (let i = 1; i <= n; i++) {
        suma = suma + i;
    }
    
    document.getElementById("res1").innerHTML = "La sumatoria desde 1 hasta " + n + " es: " + suma;
}

// Función Factorial
function factorial() {
    let n = parseInt(document.getElementById("num2").value);
    let resultado = 1;

    if (isNaN(n) || n < 0) {
        document.getElementById("res2").innerHTML = "Ingresa un número válido (0 o mayor)";
        return;
    }

    if (n == 0) {
        resultado = 1;
    } else {
        for (let i = 1; i <= n; i++) {
            resultado = resultado * i;
        }
    }

    document.getElementById("res2").innerHTML = "El factorial de " + n + " es: " + resultado;
}

// Función Procesar Número (Reto)
function procesarNumero(){
    let valor = document.getElementById("numero").value;
    let n = Number(valor);

    if(valor === "" || isNaN(n) || !Number.isInteger(n) || n <= 0){
        document.getElementById("resultado").innerHTML =
        "<p style='color:red;'>Error: Ingresa un número entero positivo válido.</p>";
        return;
    }

    let suma = 0;
    let serie = "";

    for(let i = 1; i <= n; i++){
        serie += i + " ";
        suma += i;
    }

    let tipo = (n % 2 === 0) ? "Par" : "Impar";

    document.getElementById("resultado").innerHTML =
    "<p><strong>Serie:</strong> " + serie + "</p>" +
    "<p><strong>Suma total:</strong> " + suma + "</p>" +
    "<p><strong>El número es:</strong> " + tipo + "</p>";
}