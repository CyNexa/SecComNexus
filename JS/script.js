let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        navbar.style.top = '-80px'; 
    } else {
        navbar.style.top = '0';
    }
    
    lastScrollTop = scrollTop;
});

const logo = document.getElementById('logo');
const darkModeToggle = document.getElementById('dark-mode-toggle');

if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark-mode');
  logo.src = 'Assets/seccom_logo-b.webp';
  darkModeToggle.textContent = "☀️";
}

darkModeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark-mode');

  if (document.documentElement.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    logo.src = 'Assets/seccom_logo-w.webp'; // Path for the dark version of the logo
    darkModeToggle.textContent = "☀️";
  } else {
    localStorage.setItem('theme', 'light');
    logo.src = 'Assets/seccom_logo-b.webp'; // Path for the light version of the logo
    darkModeToggle.textContent = "🌙";
  }
});