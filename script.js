document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("envioForm");
    const resultado = document.getElementById("resultado");

    // Escuchar cambios en cualquier campo del formulario
    formulario.addEventListener("input", calcularPrecio);

    function calcularPrecio() {
        let dni = document.getElementById("dni").value.trim();
        let origen = document.getElementById("origen").value;
        let destino = document.getElementById("destino").value;
        let peso = parseFloat(document.getElementById("peso").value);
        
        // Validar DNI (8 números + 1 letra)
        let dniRegex = /^[0-9]{8}[A-Z]$/;
        if (!dniRegex.test(dni)) {
            resultado.innerHTML = "<p style='color:red;'>DNI no válido. Debe tener 8 números seguidos de una letra mayúscula.</p>";
            return;
        }

        // Validar que los demás campos estén completos
        if (!origen || !destino || isNaN(peso) || peso <= 0) {
            resultado.innerHTML = "<p style='color:red;'>Por favor, completa todos los campos correctamente.</p>";
            return;
        }

        // Determinar el precio base según las ciudades
        let precioBase;
        if (origen === destino) {
            precioBase = 5;
        } else if (origen === "Palma" || destino === "Palma") {
            precioBase = 9;
        } else {
            precioBase = 7;
        }

        // Aplicar ajustes según el peso
        if (peso >= 10 && peso <= 20) {
            precioBase *= 1.5;
        } else if (peso > 20) {
            precioBase *= 2;
        }

        // Mostrar resultado
        resultado.innerHTML = `<p>El costo del envío es: <strong>${precioBase.toFixed(2)}€</strong></p>`;
    }
});
