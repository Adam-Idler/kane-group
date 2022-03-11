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
  function Slider({ 
    sliderSelector,
    slideSelector,
    dotsSelector,
    dotsListSelector,
    arrowsSelector,
    arrowLeftSelector,
    arrowRightSelector,
    slideSpeed = 0
  }) {
    if (!document.querySelector(sliderSelector)) return;

    const slider = document.querySelector(sliderSelector);

    const slides = slider.querySelectorAll(slideSelector);
    let dots;

    slides[0].classList.add('active');

    if (slides.length === 1) return;
    
    let currentSlide = 0,
        intervalID;

    const addDots = () => {
      if (!dotsListSelector) return;

      const dotsList = slider.querySelector(dotsListSelector);

      for (let i = 0; i < slides.length; i++) {
        let li = document.createElement('li');
        li.classList.add(dotsSelector)
        if (i === 0) li.classList.add('active');
        dotsList.appendChild(li);
      }
      dots = document.querySelectorAll(`.${dotsSelector}`);
    };

    const prevSlide = (elem, index, strclass) => {
      if (elem?.length)
        elem[index].classList.remove(strclass);
    };

    const nextSlide = (elem, index, strclass) => {
      if (elem?.length)
        elem[index].classList.add(strclass);
    };

    const autoPlaySlider = () => {
      prevSlide(slides, currentSlide, 'active');
      currentSlide++;
      if (currentSlide >= slides.length) currentSlide = 0;
      nextSlide(slides, currentSlide, 'active');
    };

    const startSlide = (time) => {
      intervalID = setInterval(autoPlaySlider, time);
    };

    const stopSlide = () => {
      clearInterval(intervalID);
    };

    slider.addEventListener('click', e => {
      e.preventDefault();

      prevSlide(slides, currentSlide, 'active');
      prevSlide(dots, currentSlide, 'active');

      if (e.target.matches(arrowLeftSelector)) {
        currentSlide--;
      } else if (e.target.matches(arrowRightSelector)) {
        currentSlide++;
      } else if (e.target.classList.contains(dotsSelector)) {
        dots.forEach((dot, i) => {
          if (dot === e.target) {
            currentSlide = i;
          }
        });
      }

      if (currentSlide >= slides.length) currentSlide = 0;
      if (currentSlide < 0) currentSlide = slides.length - 1;

      nextSlide(dots, currentSlide, 'active');
      nextSlide(slides, currentSlide, 'active');
    });

    slider.addEventListener('mouseenter', e => {
      if (e.target.matches(arrowsSelector) && slideSpeed) {
        stopSlide();
      }
    }, true);

    slider.addEventListener('mouseleave', e => {
      if (e.target.matches(arrowsSelector) && slideSpeed) {
        startSlide(slideSpeed);
      }
    }, true);

    if (slideSpeed) startSlide(slideSpeed);

    addDots();
  }
    
  Slider({
    sliderSelector: '.slider',
    slideSelector: '.slide',
    arrowsSelector: '.arrow',
    arrowLeftSelector: '.arrow_left',
    arrowRightSelector: '.arrow_right',
    slideSpeed: 7000
  });

  Slider({
    sliderSelector: '.site-slider',
    slideSelector: '.site-slider__slide',
    dotsSelector: 'site-slider__pagination-list-item',
    dotsListSelector: '.site-slider__pagination-list'
  });

  Slider({
    sliderSelector: '.site-slider__slide:nth-of-type(1) .examples-slider',
    slideSelector: '.site-slider__slide:nth-of-type(1) .examples-slider__slide',
    arrowsSelector: '.site-slider__slide:nth-of-type(1) .examples-slider .arrow',
    arrowLeftSelector: '.site-slider__slide:nth-of-type(1) .examples-slider .arrow_left',
    arrowRightSelector: '.site-slider__slide:nth-of-type(1) .examples-slider .arrow_right'
  });

  Slider({
    sliderSelector: '.site-slider__slide:nth-of-type(2) .examples-slider',
    slideSelector: '.site-slider__slide:nth-of-type(2) .examples-slider__slide',
    arrowsSelector: '.site-slider__slide:nth-of-type(2) .examples-slider .arrow',
    arrowLeftSelector: '.site-slider__slide:nth-of-type(2) .examples-slider .arrow_left',
    arrowRightSelector: '.site-slider__slide:nth-of-type(2) .examples-slider .arrow_right'
  });

  Slider({
    sliderSelector: '.site-slider__slide:nth-of-type(3) .examples-slider',
    slideSelector: '.site-slider__slide:nth-of-type(3) .examples-slider__slide',
    arrowsSelector: '.site-slider__slide:nth-of-type(3) .examples-slider .arrow',
    arrowLeftSelector: '.site-slider__slide:nth-of-type(3) .examples-slider .arrow_left',
    arrowRightSelector: '.site-slider__slide:nth-of-type(3) .examples-slider .arrow_right'
  });

  Slider({
    sliderSelector: '.our-work__comp-slider',
    slideSelector: '.our-work__comp-slide',
    slideSpeed: 5000
  });

  // Дропдаун в форме
  (() => {
    const dropdownLabel = document.querySelector('.about-us__form-dropdown-label');
    const dropdownInput = dropdownLabel.querySelector('.about-us__form-input.type-of-site');
    const dropdown = dropdownLabel.querySelector('.dropdown-wrapper');

    function hideDropdown() {
      dropdown.style.opacity = '0';
      dropdown.style.visibility = 'hidden';
      dropdown.removeAttribute('data-visible');
      dropdown.removeAttribute('data-visible');

    }

    function showDropdown() {
      dropdown.style.opacity = '1';
      dropdown.style.visibility = 'visible';
      dropdown.setAttribute('data-visible', '');
    }

    document.addEventListener('click', (e) => {
      if (!e.target.matches('.about-us__form-input.type-of-site') && !e.target.closest('.dropdown-wrapper')) {
        hideDropdown()
        return;
      }

      if (e.target.matches('.dropdown-link')) {
        dropdownInput.value = e.target.textContent;
        dropdownLabel.classList.add('filled');
      }

      if (dropdown.hasAttribute('data-visible')) {
        hideDropdown()
      } else {
        showDropdown()
      }
    });
  })();

});