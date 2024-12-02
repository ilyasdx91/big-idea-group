$(document).ready(function () {
  let sections = {
    design: null,
    production: null,
    presents: null,
  };

  $.getJSON("https://www.bigidea.uz/big_projects/big_works.json")
    .done(function (data) {
      console.log("Данные успешно загружены:", data);
      sections = {
        design: data.big_design,
        production: data.big_production,
        presents: data.big_presents,
      };
      // Добавление элементов в каждую галерею
      Object.keys(sections).forEach((section) => {
        const gallery = $(`#${section}`);
        const projects = sections[section];
        if (projects && projects.length) {
          projects.forEach((project, index) => {
            const item = $(`
              <div class="item" data-section="${section}" data-index="${index}">
              <div class="img-wrap">
               <img src="${baseUrl + project.file + thumbnail}" alt="${
              project.client
            }">
            </div>
                <div class="WorkInfo">${project.short_text_gallery}</div>
              </div>
            `);
            gallery.append(item);
          });
        }
      });
    })
    .fail(function (jqxhr, textStatus, error) {
      console.error("Ошибка:", textStatus, error);
    });

  const baseUrl = "https://www.bigidea.uz/big_projects/";
  const thumbnail = "-thumbnail.jpg";
  const webp = ".webp";

  // Списки проектов

  // Открытие модального окна
  let currentSection = ""; // Хранит текущую секцию
  let currentIndex = 0; // Хранит текущий индекс проекта

  function openModal(section, index) {
    currentSection = section;
    currentIndex = index;

    const project = sections[section][index];

    // Заполнение данных
    $("#modalImage").attr("src", `${baseUrl + project.file + webp}`);
    $("#modalInfo").html(`
        <div class="inner">
            <h2>${project.client}</h2>
            <span> ${project.client_profile}</span>

            <div class="work-info">${project.full_work_info}</div>
        </div> 

        <p class="bottom">© BIG Idea Group <b> ${project.year}</b></p>
      
    `);

    // Показ модального окна
    $("#modal").fadeIn();
  }

  // Закрытие модального окна
  $("#closeModal").on("click", function () {
    $("#modal").fadeOut();
  });

  // Навигация (стрелки)
  $("#prev").on("click", function () {
    const projects = sections[currentSection];
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
    openModal(currentSection, currentIndex);
  });

  $("#next").on("click", function () {
    const projects = sections[currentSection];
    currentIndex = (currentIndex + 1) % projects.length;
    openModal(currentSection, currentIndex);
  });

  // Клик по элементу галереи
  $(".gallery").on("click", ".item", function () {
    const section = $(this).data("section");
    const index = $(this).data("index");
    openModal(section, index);
  });
});
