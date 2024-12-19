$(document).ready(function () {
  // Mostrar el cuadro de texto si se selecciona "Otro" en tipo de evento
  $("#evento").change(function () {
    if ($(this).val() === "otro") {
      $("#eventoOtroContainer").show();
    } else {
      $("#eventoOtroContainer").hide();
    }
  });

  // Validar al enviar el formulario
  $("#formularioContratacion").submit(function (e) {
    e.preventDefault();

    let isValid = true;

    // Primero, quitar cualquier clase de error o éxito previa
    $("#nombre, #apellido, #email, #telefono").removeClass(
      "is-invalid is-valid"
    );

    // Validar nombre (solo letras)
    const nombre = $("#nombre").val();
    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
      $("#nombre").addClass("is-invalid");
      isValid = false;
    } else {
      $("#nombre").addClass("is-valid");
    }

    // Validar apellido (al menos dos palabras)
    const apellido = $("#apellido").val();
    if (!/^[a-zA-Z]+\s[a-zA-Z]+$/.test(apellido)) {
      $("#apellido").addClass("is-invalid");
      isValid = false;
    } else {
      $("#apellido").addClass("is-valid");
    }

    // Validar email
    const email = $("#email").val();
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      $("#email").addClass("is-invalid");
      isValid = false;
    } else {
      $("#email").addClass("is-valid");
    }

    // Validar teléfono (9 dígitos numéricos)
    const telefono = $("#telefono").val();
    if (!/^\d{9}$/.test(telefono)) {
      $("#telefono").addClass("is-invalid");
      isValid = false;
    } else {
      $("#telefono").addClass("is-valid");
    }

    // Si la validación es correcta, se puede enviar el formulario
    if (isValid) {
      alert("Formulario enviado correctamente.");
      // Aquí puedes agregar el código para enviar el formulario o hacer otra acción
    }
  });
});
