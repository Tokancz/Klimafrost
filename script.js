
document.querySelectorAll(".scroll-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Zamezí výchozímu chování (okamžité skrolování)
    // Najdeme cílový prvek podle href
    const targetId = link.getAttribute("href"); 
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      // Počkáme, než scrollování skončí, a spustíme animaci
      setTimeout(() => {
        // Odebrání případné předchozí animace (pro restart)
        target.classList.remove("animate__animated", "animate__jello");
        // Krátké zpoždění pro restart animace
        setTimeout(() => {
          target.style.setProperty('--animate-duration', '0.6s');
          target.classList.add("animate__animated", "animate__jello");
        }, 10); // Stačí malé zpoždění před přidáním animace
      }, 300); // Delay (300 ms) mezi scrollováním a animací
    }
  });
});
const slider = document.getElementById('slider');
const dots = document.querySelectorAll('.dot');
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
  goToSlidePhoto(currentIndex);
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

const slider2 = document.getElementById('slider2');
const slides = slider2.querySelectorAll('.slide');
const dots2 = document.querySelectorAll('#dots2 .dot');

let currentIndex2 = 1; // start on the first real slide
let slideCount2 = slides.length;
let autoSliding2 = true;
let interval2;

const slideWidthPercent = 30;

// Clone first and last slides for infinite effect
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slideCount2 - 1].cloneNode(true);

slider2.insertBefore(lastClone, slides[0]); // prepend last
slider2.appendChild(firstClone); // append first

// Update count now that clones are in
const allSlides = slider2.querySelectorAll('.slide');
const totalSlides = allSlides.length;

// Move to first real slide
slider2.style.transform = `translateX(-${slideWidthPercent * currentIndex2}%)`;

// Set up dot state
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
  if (currentIndex2 >= totalSlides - 1) return; // safety check
  currentIndex2++;
  goToSlide2(currentIndex2);

  // Handle loop reset
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

  
// Dots
dots2.forEach(dot => {
  dot.addEventListener('click', () => {
    const index = parseInt(dot.getAttribute('data-index')) + 1; // offset for clone
    goToSlide2(index);
    if (autoSliding2) {
      clearInterval(interval2);
      autoSliding2 = false;
    }
  });
});

interval2 = setInterval(nextSlide2, 4000);