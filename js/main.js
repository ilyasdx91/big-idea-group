$(document).ready(function () {
  //===============================================
  // Функция для прокрутки к нужному блоку
  function scrollToTarget(targetId) {
    var target = $(targetId);
    if (target.length) {
      var targetOffset = target.offset().top - 120;
      $("html, body").animate(
        {
          scrollTop: targetOffset,
        },
        500
      );
    }
  }

  // Проверяем наличие хэша в URL при загрузке страницы
  var hash = window.location.hash;
  if (hash) {
    scrollToTarget(hash);
    // Добавляем класс active для соответствующей ссылки
    $(".side-bar a").removeClass("active");
    $(`.side-bar a[href="${hash}"]`).addClass("active");
  }

  // Обрабатываем клик по ссылкам боковой панели
  $(".side-bar a").on("click", function (event) {
    event.preventDefault(); // Отменяем стандартное поведение ссылки
    var targetId = $(this).attr("href"); // Получаем ID целевого блока
    scrollToTarget(targetId);

    // Добавляем класс active для текущей ссылки
    $(".side-bar a").removeClass("active");
    $(this).addClass("active");
  });

  // Для переходов между страницами
  $(window).on("hashchange", function () {
    var newHash = window.location.hash;
    if (newHash) {
      scrollToTarget(newHash);

      // Добавляем класс active для соответствующей ссылки
      $(".side-bar a").removeClass("active");
      $(`.side-bar a[href="${newHash}"]`).addClass("active");
    }
  });
});
