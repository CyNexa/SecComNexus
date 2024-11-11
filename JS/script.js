let lastScrollTop = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    navbar.style.top = "-15vh";
  } else {
    navbar.style.top = "0";
  }

  lastScrollTop = scrollTop;
});

// Connect Dots
const canvas = document.getElementById("dotsCanvas");
const ctx = canvas.getContext("2d");

// Set canvas to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Dot properties
const dots = [];
let dotCount;
        if (window.innerWidth >= 1024) {
            dotCount = 120; // High count for desktops
        } else if (window.innerWidth >= 768) {
            dotCount = 80; // Medium count for tablets
        } else {
            dotCount = 30;  // Low count for phones
        } // dots
const maxDistance = 150; // distance
const speed = 0.3; // movement

// Create dot class
class Dot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = (Math.random() - 0.5) * speed;
    this.dy = (Math.random() - 0.5) * speed;
    this.radius = 3;
  }

  // Update position
  update() {
    this.x += this.dx;
    this.y += this.dy;

    // Bounce from edges
    if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.dy *= -1;
  }

  // Draw dot with glow effect
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

    // Set the fill color to green
    ctx.fillStyle = "cyan";

    ctx.shadowBlur = 20;
    ctx.shadowColor = "cyan";

    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";
  }
}

// Initialize dots
for (let i = 0; i < dotCount; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  dots.push(new Dot(x, y));
}

// Draw lines between close dots
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

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  dots.forEach((dot) => {
    dot.update();
    dot.draw();
  });

  // Connect dots
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      connectDots(dots[i], dots[j]);
    }
  }

  requestAnimationFrame(animate);
}

// Start animation
animate();

// Resize canvas on window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
