document.addEventListener('DOMContentLoaded', () => {

  // Кнопка "заказать звонок"
  (() => {
    const phoneBtn = document.querySelector('.header__contact-button');
    const headerPhone = document.querySelector('.header__contact-button-wrapper');

    phoneBtn.addEventListener('click', () => {
      headerPhone.classList.toggle('active');
    });
  })();


  // Слайдер
  (() => {
    if (!document.querySelector('.slider')) return;

    const slides = document.querySelectorAll('.slide'),
          slider = document.querySelector('.slider');

    if (slides.length === 1) return;
    
    let currentSlide = 0,
        intervalID;

    const prevSlide = (elem, index, strclass) => {
      elem[index].classList.remove(strclass);
    };

    const nextSlide = (elem, index, strclass) => {
      elem[index].classList.add(strclass);
    };

    const autoPlaySlider = () => {
      prevSlide(slides, currentSlide, 'active');
      currentSlide++;
      if (currentSlide >= slides.length) currentSlide = 0;
      nextSlide(slides, currentSlide, 'active');
    };

    const startSlide = (time = 3000) => {
      intervalID = setInterval(autoPlaySlider, time);
    };

    const stopSlide = () => {
      clearInterval(intervalID);
    };

    slider.addEventListener('click', e => {
      e.preventDefault();

      prevSlide(slides, currentSlide, 'active');

      if (e.target.matches('.arrow_left')) {
        currentSlide--;
      } else if (e.target.matches('.arrow_right')) {
        currentSlide++;
      }

      if (currentSlide >= slides.length) currentSlide = 0;
      if (currentSlide < 0) currentSlide = slides.length - 1;

      nextSlide(slides, currentSlide, 'active');
    });

    slider.addEventListener('mouseenter', e => {
      if (e.target.matches('.arrow')) {
        stopSlide();
      }
    }, true);

    slider.addEventListener('mouseleave', e => {
      if (e.target.matches('.arrow')) {
        startSlide(1000);
      }
    }, true);

    startSlide(7000);
  })();


});