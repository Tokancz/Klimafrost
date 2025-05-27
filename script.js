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
              target.classList.remove("animate__animated", "animate__zoomIn");
              // Krátké zpoždění pro restart animace
              setTimeout(() => {
                target.classList.add("animate__animated", "animate__zoomIn");
              }, 10); // Stačí malé zpoždění před přidáním animace
            }, 300); // Delay (300 ms) mezi scrollováním a animací
          }
        });
      });
