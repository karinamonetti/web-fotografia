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

  ////////////////////// VALIDACIÓN DEL FORMULARIO //////////////////////
  // Si pasa la validación entonces crea una instancia de la clase,  y la guarda en el array del LocalStorage.
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

  // Guardar una solicitud (instancia) en LocalStorage
  function guardarSolicitudEnLocalStorage(solicitud) {
    const solicitudes = obtenerSolicitudesDeLocalStorage();
    solicitudes.push(solicitud);
    localStorage.setItem("solicitudesDeTrabajo", JSON.stringify(solicitudes));
  }

  // Obtener todas las solicitudes (instancias) desde LocalStorage
  function obtenerSolicitudesDeLocalStorage() {
    return JSON.parse(localStorage.getItem("solicitudesDeTrabajo")) || [];
  }
});

////////////////////// CARGAR DATOS EN LA TABLA  //////////////////////
// Función para cargar y mostrar las solicitudes en la tabla
function cargarSolicitudes() {
  const solicitudes = obtenerSolicitudesDeLocalStorage();

  // Obtener todas las solicitudes desde LocalStorage
  function obtenerSolicitudesDeLocalStorage() {
    return JSON.parse(localStorage.getItem("solicitudesDeTrabajo")) || [];
  }

  const tablaCuerpo = $("#tablaSolicitudes tbody");
  tablaCuerpo.empty(); // Limpiar la tabla antes de añadir las filas

  solicitudes.map((solicitud, index) => {
    const fila = `
      <tr>
        <td>${solicitud.id}</td>
        <td>${solicitud.nombre}</td>
        <td>${solicitud.apellidos}</td>
        <td>${solicitud.email}</td>
        <td>${solicitud.telefono}</td>
        <td>${solicitud.tipoEvento}${
      solicitud.especificarEvento ? ` (${solicitud.especificarEvento})` : ""
    }</td>
        <td>${solicitud.lugar}</td>
        <td>${solicitud.fecha}</td>
        <td>
          <button class="btn btn-success btn-aceptar w-100" data-id="${
            solicitud.id
          }">Aceptar</button>
          <button class="btn btn-danger btn-rechazar w-100" data-id="${
            solicitud.id
          }">Rechazar</button>
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
    const id = $(this).data("id"); // Obtener el ID desde el atributo data-id
  rechazarSolicitud(id); // Llamar a la función para rechazar la solicitud
  });
}

// Función para aceptar una solicitud
function aceptarSolicitud(index) {

  
  // Obtener todas las solicitudes desde LocalStorage
  function obtenerSolicitudesDeLocalStorage() {
    return JSON.parse(localStorage.getItem("solicitudesDeTrabajo")) || [];
  }
  const solicitudesPendientes = obtenerSolicitudesDeLocalStorage();
  const solicitudesAceptadas = JSON.parse(localStorage.getItem("solicitudesAceptadas")) || [];

  // Mover la solicitud de pendientes a aceptadas
  const solicitud = solicitudesPendientes.splice(index, 1)[0];
  solicitudesAceptadas.push(solicitud);

  // Actualizar localStorage
  localStorage.setItem("solicitudesDeTrabajo", JSON.stringify(solicitudesPendientes));
  localStorage.setItem("solicitudesAceptadas", JSON.stringify(solicitudesAceptadas));

  alert(`Solicitud de ${solicitud.nombre} ${solicitud.apellidos} aceptada.`);
  
  // Recargar la tabla
  cargarSolicitudes(); // Recargar la tabla para reflejar los cambios
}

// Función para rechazar una solicitud
function rechazarSolicitud(id) {
  // Obtener todas las solicitudes desde LocalStorage
  function obtenerSolicitudesDeLocalStorage() {
    return JSON.parse(localStorage.getItem("solicitudesDeTrabajo")) || [];
  }
  const solicitudes = obtenerSolicitudesDeLocalStorage();
  
  // Encontrar el índice de la solicitud que tiene el ID correspondiente
  const solicitudIndex = solicitudes.findIndex(solicitud => solicitud.id === id);

  if (solicitudIndex !== -1) {
    alert(`Solicitud de ${solicitudes[solicitudIndex].nombre} rechazada.`);
    
    // Eliminar la solicitud del array
    solicitudes.splice(solicitudIndex, 1);
    
    // Actualizar el localStorage con la lista actualizada
    localStorage.setItem("solicitudesDeTrabajo", JSON.stringify(solicitudes));
    
    // Recargar la tabla para reflejar los cambios
    cargarSolicitudes();
  } else {
    alert("No se encontró la solicitud.");
  }
}

// Llamar a cargarSolicitudes cuando el documento esté listo
$(document).ready(function () {
  cargarSolicitudes();
});



//////////// CARGAR DATOS EN TABLAS DE TRABAJOS 
$(document).ready(function () {
  // Cargar trabajos por realizar y trabajos realizados
  cargarTrabajosPorRealizar();

  // Función para cargar los trabajos por realizar y trabajos realizados
  function cargarTrabajosPorRealizar() {
    const solicitudesAceptadas = JSON.parse(localStorage.getItem("solicitudesAceptadas")) || [];
    const trabajosRealizados = JSON.parse(localStorage.getItem("trabajosRealizados")) || [];

    // Cargar "Trabajos por Realizar"
    const trabajosPorRealizarTable = $("#trabajosPorRealizar");
    trabajosPorRealizarTable.empty();
    
    solicitudesAceptadas.forEach((solicitud, index) => {
      trabajosPorRealizarTable.append(`
        <tr>
          <td>${solicitud.nombre} ${solicitud.apellidos}</td>
          <td>${solicitud.lugar}</td>
          <td>${solicitud.fecha}</td>
          <td>
            <input type="checkbox" class="form-check-input" data-index="${index}">
          </td>
        </tr>
      `);
    });

    // Cargar "Trabajos Realizados"
    const trabajosRealizadosTable = $("#trabajosRealizados");
    trabajosRealizadosTable.empty();

    trabajosRealizados.forEach((trabajo) => {
      trabajosRealizadosTable.append(`
        <tr>
          <td>${trabajo.nombre} ${trabajo.apellidos}</td>
          <td>${trabajo.lugar}</td>
          <td>${trabajo.fecha}</td>
          <td>${trabajo.valoracion}</td>
        </tr>
      `);
    });

    // Manejar evento de checkbox para marcar como terminado
    $("input[type='checkbox']").change(function () {
      if ($(this).is(":checked")) {
        const index = $(this).data("index");
        const trabajo = solicitudesAceptadas[index];

        // Abrir el modal de valoración
        $("#valoracionModal").modal("show");

        // Al hacer clic en "Guardar", mover el trabajo a "Trabajos Realizados"
        $("#guardarValoracion").click(function () {
          const valoracion = $("#valoracion").val();

          // Eliminar de "Trabajos por Realizar" y agregar a "Trabajos Realizados"
          solicitudesAceptadas.splice(index, 1);
          trabajo.valoracion = valoracion;
          trabajosRealizados.push(trabajo);

          // Actualizar localStorage
          localStorage.setItem("solicitudesAceptadas", JSON.stringify(solicitudesAceptadas));
          localStorage.setItem("trabajosRealizados", JSON.stringify(trabajosRealizados));

          // Recargar tablas
          cargarTrabajosPorRealizar();

          // Cerrar el modal
          $("#valoracionModal").modal("hide");
        });
      }
    });
  }
});
