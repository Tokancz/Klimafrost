// Plynulé scrollování a animace po kliknutí
document.querySelectorAll(".scroll-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        target.classList.remove("animate__animated", "animate__jello");
        setTimeout(() => {
          target.style.setProperty('--animate-duration', '0.6s');
          target.classList.add("animate__animated", "animate__jello");
        }, 10);
      }, 300);
    }
  });
});

// === První slider (slider 1) ===
const slider = document.getElementById('slider');
const dots = document.querySelectorAll('.dot');

if (slider && dots.length > 0) {
  let currentIndex = 0;
  const slideCount = dots.length;
  let interval = setInterval(nextSlide, 5000);
  let autoSliding = true;

  function goToSlide(index) {
    slider.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    currentIndex = index;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    goToSlide(currentIndex);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'));
      goToSlide(index);
      if (autoSliding) {
        clearInterval(interval);
        autoSliding = false;
      }
    });
  });

  // Hover zastavení/průběh pro slider 1
  slider.addEventListener('mouseenter', () => {
    if (autoSliding) clearInterval(interval);
  });

  slider.addEventListener('mouseleave', () => {
    if (autoSliding) interval = setInterval(nextSlide, 5000);
  });
}

// === Druhý slider (slider 2) ===
const slider2 = document.getElementById('slider2');

if (slider2) {
  const slides = slider2.querySelectorAll('.slide');
  const dots2 = document.querySelectorAll('#dots2 .dot');

  let currentIndex2 = 1;
  let slideCount2 = slides.length;
  let autoSliding2 = true;
  let interval2;
  const slideWidthPercent = 30;

  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slideCount2 - 1].cloneNode(true);
  slider2.insertBefore(lastClone, slides[0]);
  slider2.appendChild(firstClone);

  const allSlides = slider2.querySelectorAll('.slide');
  const totalSlides = allSlides.length;

  slider2.style.transform = `translateX(-${slideWidthPercent * currentIndex2}%)`;

  function updateDots(index) {
    dots2.forEach(dot => dot.classList.remove('active'));
    dots2[index % slideCount2].classList.add('active');
  }

  function goToSlide2(index) {
    slider2.style.transition = 'transform 0.5s ease-in-out';
    slider2.style.transform = `translateX(-${slideWidthPercent * index}%)`;
    currentIndex2 = index;
    updateDots(index - 1);
  }

  function nextSlide2() {
    if (currentIndex2 >= totalSlides - 1) return;
    currentIndex2++;
    goToSlide2(currentIndex2);
    setTimeout(() => {
      if (currentIndex2 === totalSlides - 1) {
        slider2.style.transition = 'none';
        currentIndex2 = 1;
        slider2.style.transform = `translateX(-${slideWidthPercent * currentIndex2}%)`;
      }
    }, 500);
  }

  function prevSlide2() {
    if (currentIndex2 <= 0) return;
    currentIndex2--;
    goToSlide2(currentIndex2);
    setTimeout(() => {
      if (currentIndex2 === 0) {
        slider2.style.transition = 'none';
        currentIndex2 = slideCount2;
        slider2.style.transform = `translateX(-${slideWidthPercent * currentIndex2}%)`;
      }
    }, 500);
  }

  dots2.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index')) + 1;
      goToSlide2(index);
      if (autoSliding2) {
        clearInterval(interval2);
        autoSliding2 = false;
      }
    });
  });

  interval2 = setInterval(nextSlide2, 4000);
}

let opened = false;
const menu = document.getElementById("menu");
const icon = document.getElementById("icon");
const navbar = document.getElementById("navbar");

function TabOpen() {
  if (!opened) {
    menu.classList.add("burgrmenu");
    menu.classList.remove("container");
    menu.classList.remove("nav-links");
    navbar.style.backdropFilter = "";
  }
  else {
    menu.classList.remove("burgrmenu");
    menu.classList.add("container");
    menu.classList.add("nav-links");
    navbar.style.backdropFilter = "blur(5px) brightness(.5)";
  }
  opened = !opened;
  console.log("Tab interact");
}

icon.addEventListener("click", TabOpen);
navbar.style.backdropFilter = "blur(5px) brightness(.5)";