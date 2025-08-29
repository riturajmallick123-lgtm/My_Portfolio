const sections = document.querySelectorAll("section");
const toggle = document.getElementById("theme-toggle");
const body = document.body;

// Load theme from localStorage
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    toggle.textContent = "☀️"; // Sun icon for light mode
  }
});

// Toggle theme on button click
toggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const isDarkMode = body.classList.contains("dark-mode");
  toggle.textContent = isDarkMode ? "☀️" : "🌙"; // Toggle icon
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
});

// Intersection Observer for animations and skill bars
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Skill bar animation
      if (entry.target.id === "skills") {
        const bars = entry.target.querySelectorAll(".skill-fill");
        bars.forEach(bar => {
          const targetWidth = bar.getAttribute("data-width");
          bar.style.width = targetWidth;
        });
      }
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.scroll-reveal, .scroll-fade-left, .scroll-fade-right, .project-card').forEach(el => {
  observer.observe(el);
});

// Hamburger Menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger?.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});



window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById('progress-bar').style.width = scrollPercent + '%';
});

const resumeBtn = document.getElementById("view-resume");
const resumeModal = document.getElementById("resume-modal");
const overlay = document.getElementById("modal-overlay");
const closeBtn = document.getElementById("close-resume");

resumeBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  resumeModal.classList.add("active");
  overlay.classList.add("active");
});

closeBtn?.addEventListener("click", () => {
  resumeModal.classList.remove("active");
  overlay.classList.remove("active");
});

overlay?.addEventListener("click", () => {
  resumeModal.classList.remove("active");
  overlay.classList.remove("active");
});

// Save Contact Form to Excel
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  const data = [["Name", "Email", "Message"], [name, email, message]];
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Contact Details");
  XLSX.writeFile(workbook, "Contact_Details.xlsx");
});
