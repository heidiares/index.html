document.getElementById("miFormulario").addEventListener("submit", function(event) {
    
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value;
    const pais = document.getElementById("pais").value;

    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validaciones
    if (!regexNombre.test(nombre)) {
        alert("El nombre solo debe contener letras.");
        return;
    }

    if (!regexCorreo.test(correo)) {
        alert("Correo inválido.");
        return;
    }

    if (password.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres.");
        return;
    }

    if (pais === "") {
        alert("Selecciona un país.");
        return;
    }

    // Mostrar mensaje de éxito
    const mensaje = document.getElementById("mensajeExito");
    mensaje.style.display = "block";

    // Ocultar después de 8 segundos
    setTimeout(() => {
        mensaje.style.display = "none";
    }, 8000);

    // Limpiar formulario
    this.reset();
});