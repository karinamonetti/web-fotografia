// FUNCION FOOTER PUBLIC TO PRIVATE
$(document).ready(function () {
    // Contraseña correcta
    const correctPassword = "enEsteRetoYoLoPeto";
    
    // Abrir el cuadro de diálogo al hacer clic en el enlace
    $("#privado").click(function () {
      $("#loginDialog")[0].showModal();  // Mostrar el cuadro de diálogo
    });

    // Manejar el clic en el botón de "Acceder"
    $("#loginDialog form").submit(function (event) {
      event.preventDefault();  // Prevenir el comportamiento por defecto del formulario

      // Obtener la contraseña ingresada
      const password = $("#password").val();

      // Verificar si la contraseña es correcta
      if (password === correctPassword) {
        // Redirigir a la página deseada
        window.location.href = "/pages/peticiones.html"; 
      } else {
        // Mostrar mensaje de error
        $("#passwordError").show();
      }
    });

    // Cerrar el cuadro de diálogo si se hace clic en "Cancelar"
    $("#cancelBtn").click(function () {
      $("#loginDialog")[0].close();  // Cerrar el cuadro de diálogo
    });
  });



  
  // FUNCION PRIVATE TO PUBLIC
  $(document).ready(function () {
    $("#publico").click(function () {
        window.location.href = "/pages/index.html"; 
      });
  });