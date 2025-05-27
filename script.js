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