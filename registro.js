// Función para validar el RUT chileno

function validarRut(rut) {
    if (!rut.value.includes('-')) {
        console.log("sin digito verificador")
        return false;
    }

    // Despejar Puntos
    let valor = rut.value.replace('.', '');
    // Despejar Guión
    valor = valor.replace('-', '');

    // Aislar Cuerpo y Dígito Verificador
    let cuerpo = valor.slice(0, -1);
    let dv = valor.slice(-1).toUpperCase();

    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if (cuerpo.length < 7) {
        rut.setCustomValidity("RUT Incompleto");
        return false;
    }

    // Calcular Dígito Verificador
    let suma = 0;
    let multiplo = 2;

    console.log("console.log a del for del rut ")

    // Para cada dígito del Cuerpo
      for (let i = 1; i <= cuerpo.length; i++) {

        // Obtener su Producto con el Múltiplo Correspondiente
         let index = multiplo * valor.charAt(cuerpo.length - i);

        // Sumar al Contador General
        suma = suma + index;

        // Consolidar Múltiplo dentro del rango [2,7]
        if (multiplo < 7) {
            multiplo = multiplo + 1;
        } else {
            multiplo = 2;
        }
    }

    // Calcular Dígito Verificador en base al Módulo 11
    let dvEsperado = 11 - (suma % 11);

    // Casos Especiales (0 y K)
    dv = (dv === 'K') ? 10 : dv;
    dv = (dv === 11) ? 0 : dv;

    // Validar que el Cuerpo coincide con su Dígito Verificador
    if (dvEsperado !== parseInt(dv)) {
        console.log("RUT Inválido")
        rut.setCustomValidity("RUT Inválido");
        return false;
    }

    

    // Si todo sale bien, eliminar errores (decretar que es válido)
    rut.setCustomValidity('');
    console.log("RUT válido")
    return true;
}



// Función para validar el formulario completo
async function validarFormulario(event) {
    console.log("hola0")
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
    
    // Obtener los valores de los campos del formulario
    const nombre = document.getElementById('nombre').value.trim();
    console.log(nombre)
    const apellido = document.getElementById('apellido').value.trim();
    console.log(apellido)
    const rut = document.getElementById('rut').value.trim();
    console.log(rut)
    const telefono = document.getElementById('telefono').value.trim();
    console.log(telefono)
    const correo = document.getElementById('correoelectronico').value.trim();
    console.log(correo)
    const contrasena = document.getElementById('contrasena').value.trim();
    console.log(contrasena)
    console.log("hola1 vamos " )
    // Validar cada campo
    if (nombre === '' || apellido === '' || rut === '' || telefono === '' || correo === '' || contrasena === '') {
         console.log('Por favor, completa todos los campos.');
        return;
    }
    console.log("hola2")

    
    //validacion del rut lo hice pero cuando hago que funcione no me corre el programa 
     if (!validarRut(rut)) {
        console.log('El RUT ingresado no es válido.');
        return;
     }

     console.log("hola 3")

    // Validar el correo electrónico
    const emailValido = validarCorreoElectronico(correo);
    if (!emailValido) {
        console.log('El correo electrónico ingresado no es válido.');
        return;
    }

    console.log("hola 4")

    // Validar el número de teléfono
    const telefonoValido = validarNumeroTelefono(telefono);
    if (!telefonoValido) {
        console.log('El número de teléfono debe contener solo números.');
        return;
    }

    console.log("hola 5")
    // Más validaciones si es necesario...

    //Si todas las validaciones pasan, redirigir al usuario a otra página
    // window.location.href = 'otra_pagina.html?rut='+rut; // Reemplaza 'otra_pagina.html' con la URL de la página a la que quieres redirigir

    console.log("hola 6")
}

// Función para validar el correo electrónico
function validarCorreoElectronico(correo) {
    // Expresión regular para validar correo electrónico
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexCorreo.test(correo);
}

console.log("hola 7")

// Función para validar el número de teléfono
function validarNumeroTelefono(telefono) {
    // Expresión regular para validar que el número de teléfono contenga solo números
    const regexTelefono = /^[0-9]+$/;
    return regexTelefono.test(telefono);
}
console.log("hola 8")

// Escuchar el evento 'click' del botón 'Registrarse'
//document.querySelector('.boton').addEventListener('click', validarFormulario);