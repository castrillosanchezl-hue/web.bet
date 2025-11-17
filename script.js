// Generar fracciones aleatorias y verificar la suma

let fraccionActual = null;

// Función para calcular el MCD (para simplificar fracciones)
function mcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a || 1;
}

// Función para simplificar fracción (n/d)
function simplificar(n, d) {
    const divisor = mcd(n, d);
    return {
        n: n / divisor,
        d: d / divisor
    };
}

// Generar una fracción aleatoria (1–9 / 2–10)
function fraccionAleatoria() {
    const denominador = Math.floor(Math.random() * 9) + 2; // 2 a 10
    let numerador = Math.floor(Math.random() * (denominador - 1)) + 1; // 1 a denom-1
    return { n: numerador, d: denominador };
}

// Crear nuevo ejercicio de suma de fracciones
function nuevoEjercicio() {
    const f1 = fraccionAleatoria();
    const f2 = fraccionAleatoria();

    // Suma: a/b + c/d = (a*d + c*b) / (b*d)
    const num = f1.n * f2.d + f2.n * f1.d;
    const den = f1.d * f2.d;

    const resultadoSimplificado = simplificar(num, den);

    fraccionActual = {
        f1,
        f2,
        resultado: resultadoSimplificado
    };

    const problemaEl = document.getElementById("fraccion-problema");
    if (problemaEl) {
        problemaEl.textContent = `${f1.n}/${f1.d}  +  ${f2.n}/${f2.d}  =  ?`;
    }

    const mensajeEl = document.getElementById("mensaje-resultado");
    const inputEl = document.getElementById("respuesta");
    if (mensajeEl) mensajeEl.textContent = "";
    if (inputEl) inputEl.value = "";
}

// Verificar respuesta del estudiante
function verificarRespuesta() {
    const inputEl = document.getElementById("respuesta");
    const mensajeEl = document.getElementById("mensaje-resultado");

    if (!inputEl || !mensajeEl || !fraccionActual) return;

    const valor = inputEl.value.trim();

    if (!valor.includes("/")) {
        mensajeEl.textContent = "Por favor escribe la fracción en formato numerador/denominador (ej: 3/4).";
        mensajeEl.style.color = "#b91c1c";
        return;
    }

    const partes = valor.split("/");
    if (partes.length !== 2) {
        mensajeEl.textContent = "Formato inválido. Asegúrate de escribir algo como 5/6.";
        mensajeEl.style.color = "#b91c1c";
        return;
    }

    const numUsuario = parseInt(partes[0]);
    const denUsuario = parseInt(partes[1]);

    if (isNaN(numUsuario) || isNaN(denUsuario) || denUsuario === 0) {
        mensajeEl.textContent = "Revisa tu fracción. Debe ser algo como 3/5 (denominador diferente de 0).";
        mensajeEl.style.color = "#b91c1c";
        return;
    }

    const respuestaUsuario = simplificar(numUsuario, denUsuario);
    const correcta = fraccionActual.resultado;

    if (respuestaUsuario.n === correcta.n && respuestaUsuario.d === correcta.d) {
        mensajeEl.textContent = `¡Correcto! 🎉 La respuesta es ${correcta.n}/${correcta.d}.`;
        mensajeEl.style.color = "#15803d";
    } else {
        mensajeEl.textContent = `Casi... ❌ La respuesta correcta es ${correcta.n}/${correcta.d}.`;
        mensajeEl.style.color = "#b91c1c";
    }
}

// Asignar eventos cuando cargue la página
document.addEventListener("DOMContentLoaded", () => {
    const btnNuevo = document.getElementById("btn-nuevo");
    const btnVerificar = document.getElementById("btn-verificar");

    if (btnNuevo) {
        btnNuevo.addEventListener("click", nuevoEjercicio);
    }

    if (btnVerificar) {
        btnVerificar.addEventListener("click", verificarRespuesta);
    }

    // Generar el primer ejercicio al entrar
    nuevoEjercicio();
});
    