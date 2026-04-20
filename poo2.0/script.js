document.getElementById("miFormulario").addEventListener("submit", function(event) {
    
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value;
    const pais = document.getElementById("pais").value.trim();

    const regexTexto = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validar nombre
    if (!regexTexto.test(nombre)) {
        alert("El nombre solo debe contener letras.");
        return;
    }

    // Validar país
    if (!regexTexto.test(pais)) {
        alert("El país solo debe contener letras.");
        return;
    }

    // Validar correo
    if (!regexCorreo.test(correo)) {
        alert("Correo inválido.");
        return;
    }

    // Validar contraseña
    if (password.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres.");
        return;
    }

    // Mostrar mensaje de éxito
    const mensaje = document.getElementById("mensajeExito");
    mensaje.style.display = "block";

    setTimeout(() => {
        mensaje.style.display = "none";
    }, 3000);

    this.reset();
});