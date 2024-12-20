import { Solicitud } from "./Solicitud.js";


$(document).ready(function () {
  // Mostrar el campo "Otro" si el tipo de evento es "Otro"
  $("#evento").on("change", function () {
    if ($(this).val() === "otro") {
      $("#eventoOtroContainer").show();
    } else {
      $("#eventoOtroContainer").hide();
    }
  });

  // Validación del formulario
  $("#formularioContratacion").on("submit", function (e) {
    e.preventDefault(); // Evita el envío por defecto

    let isValid = true;

    // Validar Nombre
    const nombre = $("#nombre").val();
    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
      // Si no cumple la validación, mostramos el mensaje de error
      $("#nombre").addClass("is-invalid");
      $("#nombreError").text("El nombre solo puede contener letras.");
      isValid = false;
    } else {
      // Si es válido, removemos la clase de error y limpiamos el mensaje
      $("#nombre").removeClass("is-invalid");
      $("#nombreError").text("");
    }

    // Validar Apellidos
    const apellidos = $("#apellido").val();
    if (
      !/^[a-zA-Z\s]+$/.test(apellidos) ||
      apellidos.trim().split(" ").length < 2
    ) {
      $("#apellido").addClass("is-invalid");
      $("#apellidoError").text(
        "El apellido debe contener al menos dos palabras."
      );
      isValid = false;
    } else {
      $("#apellido").removeClass("is-invalid");
      $("#apellidoError").text("");
    }

    // Validar Email
    const email = $("#email").val();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      $("#email").addClass("is-invalid");
      $("#emailError").text("Ingresa un correo elecrónico válido.");

      isValid = false;
    } else {
      $("#email").removeClass("is-invalid");
      $("#emailError").text("");
    }

    // Validar Teléfono
    const telefono = $("#telefono").val();
    if (!/^\d{9}$/.test(telefono)) {
      $("#telefono").addClass("is-invalid");
      $("#telefonoError").text("El teléfono debe tener 9 dígitos.");
      isValid = false;
    } else {
      $("#telefono").removeClass("is-invalid");
      $("#telefonoError").text("");
    }

    // Validar Lugar
    const lugar = $("#lugar").val().trim();
    if (!lugar) {
      $("#lugar").addClass("is-invalid");
      $("#lugarError").text("El lugar no puede estar vacío.");
      isValid = false;
    } else {
      $("#lugar").removeClass("is-invalid");
      $("#lugarError").text("");
    }

    // Validar Fecha
    if (!$("#fecha").val()) {
      $("#fecha").addClass("is-invalid");
      $("#fechaError").text("Debe seleccionar una fecha.");
      isValid = false;
    } else {
      $("#fecha").removeClass("is-invalid");
      $("#fechaError").text("");
    }

    // Si todo es válido, envía el formulario
    if (isValid) {
      alert("Formulario enviado correctamente.");

      // CREO UNA INSTANCIA DE SOLICITUD
      const nuevaSolicitud = new Solicitud(
        $("#nombre").val(),
        $("#apellido").val(),
        $("#email").val(),
        $("#telefono").val(),
        $("#evento").val(),
        $("#evento").val() === "otro" ? $("#eventoOtro").val() : "", // Solo si se selecciona "otro"
        $("#lugar").val(),
        $("#fecha").val()
      );

      // guardo la solicitud en el localstorage.
      guardarSolicitudEnLocalStorage(nuevaSolicitud);

      
    }
  });

  // Guardar una solicitud en LocalStorage
  function guardarSolicitudEnLocalStorage(solicitud) {
    const solicitudes = obtenerSolicitudesDeLocalStorage();
    solicitudes.push(solicitud);
    localStorage.setItem("solicitudesDeTrabajo", JSON.stringify(solicitudes));
  }

  // Obtener todas las solicitudes desde LocalStorage
  function obtenerSolicitudesDeLocalStorage() {
    return JSON.parse(localStorage.getItem('solicitudesDeTrabajo')) || [];
}
});


// CARGAR DATOS EN LA TABLA
// Función para cargar y mostrar las solicitudes en la tabla
function cargarSolicitudes() {
  const solicitudes = obtenerSolicitudesDeLocalStorage();

  // Obtener todas las solicitudes desde LocalStorage
  function obtenerSolicitudesDeLocalStorage() {
    return JSON.parse(localStorage.getItem('solicitudesDeTrabajo')) || [];
}

  const tablaCuerpo = $("#tablaSolicitudes tbody");
  tablaCuerpo.empty(); // Limpiar la tabla antes de añadir las filas

  solicitudes.map((solicitud, index) => {
    const fila = `
      <tr>
        <td>${solicitud.nombre}</td>
        <td>${solicitud.apellidos}</td>
        <td>${solicitud.email}</td>
        <td>${solicitud.telefono}</td>
        <td>${solicitud.tipoEvento}${solicitud.especificarEvento ? ` (${solicitud.especificarEvento})` : ''}</td>
        <td>${solicitud.lugar}</td>
        <td>${solicitud.fecha}</td>
        <td>
          <button class="btn btn-success btn-aceptar" data-index="${index}">Aceptar</button>
          <button class="btn btn-danger btn-rechazar" data-index="${index}">Rechazar</button>
        </td>
      </tr>
    `;
    tablaCuerpo.append(fila);
  });

  // Añadir manejadores de eventos a los botones después de insertar las filas
  $(".btn-aceptar").click(function () {
    const index = $(this).data("index");
    aceptarSolicitud(index);
  });

  $(".btn-rechazar").click(function () {
    const index = $(this).data("index");
    rechazarSolicitud(index);
  });
}

// Función para aceptar una solicitud
function aceptarSolicitud(index) {
  const solicitudes = obtenerSolicitudesDeLocalStorage();
  alert(`Solicitud de ${solicitudes[index].nombre} aceptada.`);
  // Aquí puedes añadir lógica adicional para procesar la aceptación
  solicitudes.splice(index, 1); // Eliminar la solicitud aceptada
  localStorage.setItem("solicitudesDeTrabajo", JSON.stringify(solicitudes));
  cargarSolicitudes(); // Recargar la tabla
}

// Función para rechazar una solicitud
function rechazarSolicitud(index) {
  const solicitudes = obtenerSolicitudesDeLocalStorage();
  alert(`Solicitud de ${solicitudes[index].nombre} rechazada.`);
  // Aquí puedes añadir lógica adicional para procesar el rechazo
  solicitudes.splice(index, 1); // Eliminar la solicitud rechazada
  localStorage.setItem("solicitudesDeTrabajo", JSON.stringify(solicitudes));
  cargarSolicitudes(); // Recargar la tabla
}

// Llamar a cargarSolicitudes cuando el documento esté listo
$(document).ready(function () {
  cargarSolicitudes();
});
