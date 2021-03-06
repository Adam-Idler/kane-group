document.addEventListener('DOMContentLoaded', () => {
  // Lasy load
  (() => {
    var lazyLoadInstance = new LazyLoad({
      elements_selector: '.lazy'
    });
  })();

  // Бургер меню
  (() => {
    const burgerBtn = document.querySelector('.burger-menu');
    const burgerMenu = document.querySelector('.burger-menu__nav');

    if (!burgerBtn || !burgerMenu) return;

    window.addEventListener('resize', () => {
      if (document.documentElement.clientWidth <= 770) burgerBtn.style.display = 'block';
      else burgerBtn.style.display = 'none';
    })

    burgerBtn.addEventListener('click', () => {
      burgerMenu.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.burger-menu')) burgerMenu.classList.remove('active');
    })
  })();

  // Кнопка "заказать звонок"
  (() => {
    const phoneBtn = document.querySelector('.header__contact-button');
    const headerPhone = document.querySelector('.header__contact-button-wrapper');

    phoneBtn.addEventListener('click', () => {
      headerPhone.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.header__contact-button-wrapper') && e.target !== phoneBtn) headerPhone.classList.remove('active');
    })
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
    const dropdownLabel = document.querySelector('.section_about-us .about-us__form-dropdown-label');
    if (!dropdownLabel) return
    const dropdownInput = dropdownLabel.querySelector('.section_about-us .about-us__form-input.type-of-site');
    const dropdown = dropdownLabel.querySelector('.section_about-us .dropdown-wrapper');

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
      if (!e.target.matches('.about-us__form-input.type-of-site') && !e.target.closest('.section_about-us .dropdown-wrapper')) {
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
    const images = document.querySelectorAll('.examples-slider__slide img, .landing-slide__img');
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
      console.log();
      if (e.target !== exampleModal && e.target !== modalWrapper) return;
      exampleModal.innerHTML = '';
      document.querySelector('.hidden').classList.remove('hidden');
      closeModal();
    });

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
    }
  });

  const swiperOurWorkMobile = new Swiper('.swiper-our-work-mobile', {
    effect: 'creative',
    loop: true,
    creativeEffect: {
      prev: {
        translate: [0, 0, -500],
        opacity: 0
      },
      next: {
        opacity: 1,
        translate: ['200%', 0, 10]
      }
    }
  });

  const swiperPricingMobile= new Swiper('.swiper-pricing-mobile', {
    effect: 'coverflow',
    slideToClickedSlide: true,
    centeredSlides: true,
		slidesPerView: 1,
    initialSlide: 1,
    spaceBetween: -30,
    coverflow: {
			stretch: 50,
			depth: 500,
			modifier: 1.5,
			slideShadows : true,
		}
  });

  const swiperSeoMobile = new Swiper('.swiper-seo-mobile-slider', {
    effect: 'creative',
    loop: true,
    creativeEffect: {
      prev: {
        translate: [0, 0, -500],
        opacity: 0
      },
      next: {
        opacity: 1,
        translate: ['200%', 0, 10]
      }
    }
  });

  const swiperExamplesLandingsMobile= new Swiper('.swiper-landings', {
    effect: 'coverflow',
    slideToClickedSlide: true,
    centeredSlides: true,
		slidesPerView: 1,
    initialSlide: 1,
    spaceBetween: -50,
    coverflow: {
			stretch: 50,
			depth: 500,
      rotate: 0,
			modifier: 1.5,
			slideShadows : true,
		}
  });

  const swiperExamplesBigMobild = new Swiper('.swiper-examples-big', {
    loop: true,
    spaceBetween: 50,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  // Отправка форм
  (() => {
    let serialize = (form) => {
      let items = form.querySelectorAll('input, select, textarea'),
        str = '';

      items.forEach((item, i) => {
        const { name, value, type } = item;
        let separator = i === 0 ? '' : '&';
        if (type === 'checkbox') {
          if (item.checked) {
            str += separator + name + '=' + 'Да';
          } else {
            str += separator + name + '=' + 'Нет';
          }
        } else if (value) {
          str += separator + name + '=' + value;
        }
      });

      return str;
    };

    const formSend = (form) => {
      let data = serialize(form);
      let xhr = new XMLHttpRequest();
      let url = 'mail/mail.php';

      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      const formSubmitText = form.querySelector('.about-us__form-submit-text');
      const showText = (text) => {
        if (!formSubmitText) return

        formSubmitText.style.display = 'block';
        formSubmitText.textContent = text;
        setTimeout(() => formSubmitText.style.display = 'none', 5000)
      }

      if (formSubmitText) {
        formSubmitText.style.display = 'block';
        formSubmitText.textContent = 'Отправка...';
      }

      xhr.onload = () => {
        if (xhr.response === 'success') {
          showText('Мы скоро свяжемся с Вами!')
        } else {
          showText('Произошла ошибка!')
        }

        form.reset();
      };

      xhr.send(data);
    };

    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        formSend(form);
      });
    });
  })();
});

