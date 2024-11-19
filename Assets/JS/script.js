let lastScrollTop = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    navbar.style.top = "-10vh";
  } else {
    navbar.style.top = "0";
  }

  lastScrollTop = scrollTop;
});

// Connect Dots
const canvas = document.getElementById("dotsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const dots = [];
let dotCount;
        if (window.innerWidth >= 1024) {
            dotCount = 120;
        } else if (window.innerWidth >= 768) {
            dotCount = 80;
        } else {
            dotCount = 30;
        }
const maxDistance = 150;
const speed = 0.5;

class Dot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = (Math.random() - 0.5) * speed;
    this.dy = (Math.random() - 0.5) * speed;
    this.radius = 3;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.dy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

    ctx.fillStyle = "cyan";

    ctx.shadowBlur = 20;
    ctx.shadowColor = "cyan";

    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";
  }
}

for (let i = 0; i < dotCount; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  dots.push(new Dot(x, y));
}

function connectDots(dot1, dot2) {
  const dx = dot1.x - dot2.x;
  const dy = dot1.y - dot2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < maxDistance) {
    ctx.beginPath();
    ctx.moveTo(dot1.x, dot1.y);
    ctx.lineTo(dot2.x, dot2.y);
    ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxDistance})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  dots.forEach((dot) => {
    dot.update();
    dot.draw();
  });

  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      connectDots(dots[i], dots[j]);
    }
  }
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
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
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector('.carousel-track');
  const items = document.querySelectorAll('.carousel-item');

  // Duplicate items to create a seamless loop
  items.forEach(item => {
      const clone = item.cloneNode(true);
      track.appendChild(clone);
  });

  let scrollAmount = 0;

  function scrollCarousel() {
      scrollAmount += 1; // Adjust this value to control the speed

      if (scrollAmount >= items[0].offsetWidth) {
          track.appendChild(track.firstElementChild);
          scrollAmount = 0;
      }

      track.style.transform = `translateX(-${scrollAmount}px)`;
      requestAnimationFrame(scrollCarousel);
  }

  scrollCarousel();
});