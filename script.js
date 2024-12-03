document.getElementById("calcular").addEventListener("click", function () {
    const dni = document.getElementById("dni").value.trim();
    const origen = document.getElementById("origen").value;
    const destino = document.getElementById("destino").value;
    const peso = parseFloat(document.getElementById("peso").value);
    const resultado = document.getElementById("resultado");

    // Validación del DNI (formato básico: 8 dígitos + 1 letra)
    const dniRegex = /^\d{8}[A-Za-z]$/;
    if (!dniRegex.test(dni)) {
        resultado.innerHTML = "<p style='color: red;'>Por favor, introduce un DNI válido.</p>";
        return;
    }

    // Validación de ciudades y peso
    if (!origen || !destino) {
        resultado.innerHTML = "<p style='color: red;'>Por favor, selecciona las ciudades de origen y destino.</p>";
        return;
    }
    if (isNaN(peso) || peso <= 0) {
        resultado.innerHTML = "<p style='color: red;'>Por favor, introduce un peso válido.</p>";
        return;
    }

    // Cálculo del precio base
    let precioBase;
    if (origen === destino) {
        precioBase = 5;
    } else if ((origen === "Palma" && destino !== "Palma") || (destino === "Palma" && origen !== "Palma")) {
        precioBase = 9;
    } else {
        precioBase = 7;
    }

    // Ajuste por peso
    let precioFinal = precioBase;
    if (peso > 10 && peso <= 20) {
        precioFinal *= 1.5;
    } else if (peso > 20) {
        precioFinal *= 2;
    }

    // Mostrar resultado
    resultado.innerHTML = `<p style='color: green;'>El precio del envío es: <strong>${precioFinal.toFixed(2)}€</strong></p>`;
});
