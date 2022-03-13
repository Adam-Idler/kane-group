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
      
    // Slider({
    //   sliderSelector: '.slider',
    //   slideSelector: '.slide',
    //   arrowsSelector: '.arrow',
    //   arrowLeftSelector: '.arrow_left',
    //   arrowRightSelector: '.arrow_right',
    //   slideSpeed: 7000
    // });

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
  })();

  // Дропдаун в форме
  (() => {
    const dropdownLabel = document.querySelector('.about-us__form-dropdown-label');
    if (!dropdownLabel) return
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
        hideDropdown();
      }

      if (dropdown.hasAttribute('data-visible')) {
        hideDropdown()
      } else {
        showDropdown()
      }
    });
  })();

  // Валидация форм
  (() => {
    const userName = document.querySelectorAll('.name');
    const email = document.querySelectorAll('.email');
    const phone = document.querySelectorAll('.phone');

    function maskPhone(elem, masked = '+7 (___) ___-__-__') {
        function mask(event) {
          const keyCode = event.keyCode;
          const template = masked,
            def = template.replace(/\D/g, ''),
            val = this.value.replace(/\D/g, '');
          let i = 0,
            newValue = template.replace(/[_\d]/g, a => (i < val.length ? val.charAt(i++) || def.charAt(i) : a));
          i = newValue.indexOf('_');
          if (i !== -1) {
            newValue = newValue.slice(0, i);
          }
          let reg = template.substr(0, this.value.length)
            .replace(/_+/g, a => '\\d{1,' + a.length + '}')
            .replace(/[+()]/g, '\\$&');
          reg = new RegExp('^' + reg + '$');
    
          if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
            this.value = newValue;
          }
    
          if (event.type === 'blur' && this.value.length < 5) {
            this.value = '';
          }
        }
        elem.addEventListener('input', mask);
        elem.addEventListener('focus', mask);
        elem.addEventListener('blur', mask);
    }

    userName.forEach(elem => {
        elem.addEventListener('input', e => {
          e.target.value = e.target.value.replace(/[^А-Яа-яёЁ ]/g, '');
        });
        elem.addEventListener('blur', e => {
          e.target.value = e.target.value.replace(/^-+|^ +|-+$| +$|[^А-Яа-яёЁ -]/g, '');
          e.target.value = e.target.value.replace(/--+/g, '-');
          e.target.value = e.target.value.replace(/ +/g, ' ');
        });
    });

    email.forEach(elem => {
      elem.addEventListener('input', e => {
        e.target.value = e.target.value.replace(/[^\dA-Za-z-_@~.!*']/g, '');
      });
      elem.addEventListener('blur', e => {
        e.target.value = e.target.value.replace(/^-+|-+$|[^\dA-Za-z-_@~.!*']/g, '');
        elem.dispatchEvent(new Event('change'));
      });
    });

    phone.forEach(elem => {
      maskPhone(elem);
    });
  })();

  // Модальные окна для примеров работ
  (() => {
    const images = document.querySelectorAll('.examples-slider__slide img');
    const modalWrapper = document.querySelector('.modal-wrapper');
    if (!modalWrapper) return;
    const exampleModal = modalWrapper.querySelector('.modal_example');

    function openModal(modal, content) {
      modalWrapper.style.opacity = '1';
      modalWrapper.style.visibility = 'visible';
      document.body.style.overflow = 'hidden';
      modalWrapper.style.height = content.style.height;

      if (modal && content) modal.appendChild(content);
    }

    function closeModal() {
      modalWrapper.style.opacity = '0';
      modalWrapper.style.visibility = 'hidden';
      document.body.style.overflow = 'visible';
    }

    modalWrapper.addEventListener('click', (e) => {
      if (e.target !== modalWrapper) return;
      exampleModal.innerHTML = '';
      document.querySelector('.hidden').classList.remove('hidden');
      closeModal();
    }, true);

    images.forEach(img => {
      img.addEventListener('click', () => {
        let clonedImg = img.cloneNode(true);
        img.classList.add('hidden');
        
        openModal(exampleModal, clonedImg);

        exampleModal.style.height = clonedImg.offsetHeight + 80 + 'px';
      })
    })
  })();

  const swiper = new Swiper('.swiper', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
  });
});