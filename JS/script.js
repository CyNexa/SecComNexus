let lastScrollTop = 0;
const navibar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    navibar.style.top = "-10vh";
  } else {
    navibar.style.top = "0";
  }

  lastScrollTop = scrollTop;
});

// FAQ
function toggleAnswer(questionElement) {
  const answer = questionElement.nextElementSibling;
  if (answer.style.display === "none" || answer.style.display === "") {
    answer.style.display = "block";
  } else {
    answer.style.display = "none";
  }
}

// Sec 4 Auto Scroll
var copy = document.querySelector(".logos-slide").cloneNode(true);
document.querySelector(".logos").appendChild(copy);

// Toggle menu function
function toggleMenu() {
  const menuButton = document.querySelector('.float-menu');
  const navMenu = document.querySelector('.float-nav');

  menuButton.classList.toggle('active');
  navMenu.classList.toggle('active');

  menuButton.textContent = menuButton.classList.contains('active') ? '✖' : '☰';
}

document.getElementById('currentYear').textContent = new Date().getFullYear();

// TimeTable
function showDay(dayId) {
  document.querySelectorAll(".schedule-container").forEach(container => container.classList.remove("active"));
  document.getElementById(dayId).classList.add("active");
  document.querySelectorAll(".day-buttons button").forEach(btn => btn.classList.remove("active"));
  document.querySelector(`#${dayId}Btn`).classList.add("active");
}

