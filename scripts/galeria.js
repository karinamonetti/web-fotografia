$(document).ready(function () {
  // Al hacer clic en las miniaturas, cambiamos la imagen principal del carrusel
  $(".gallery-thumbnails img").on("click", function () {
    // Obtén el índice de la miniatura clickeada
    var index = $(this).parent().index();

    // Cambia al slide correspondiente usando el índice
    $("#carouselExample").carousel(index);
  });

  // Sincroniza las miniaturas cuando se cambia la imagen principal del carrusel
  $("#carouselExample").on("slid.bs.carousel", function (e) {
    var index = $(e.relatedTarget).index(); // Obtén el índice de la imagen actual
    $(".gallery-thumbnails img").removeClass("active"); // Elimina la clase 'active' de todas las miniaturas
    $(".gallery-thumbnails img").eq(index).addClass("active"); // Agrega la clase 'active' a la miniatura correspondiente
  });

  // Asegurarse de que la miniatura correspondiente esté activa al cargar la página
  var activeIndex = $("#carouselExample .carousel-item.active").index();
  $(".gallery-thumbnails img").eq(activeIndex).addClass("active");
});
