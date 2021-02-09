'use strict';
(function () {
  var pageHeader = document.querySelector('.page-header');
  var menuButton = document.querySelector('.page-header__menu-button');
  var accordionControls = document.querySelectorAll('.accordion__control');
  var accordionPanels = document.querySelectorAll('.accordion__panel');
  var body = document.querySelector('body');

  var filterModal = document.querySelector('.filter__wrapper');
  var filterClose = document.querySelector('.filter__close');
  var filterOpen = document.querySelector('.filter__open');
  var filterForm = document.querySelector('.filter__form');

  var loginModal = document.querySelector('.login--modal');
  var loginPage = document.querySelector('.login--page');
  var loginClose = document.querySelector('.login__close');
  var loginOpenLinks = document.querySelectorAll('.page-header__login');
  var loginForm = document.querySelector('.login__form');
  var loginEmail = document.querySelector('input[name=email]');
  var loginPswd = document.querySelector('input[name=pswd]');

  var addedModal = document.querySelector('.added--modal');
  var addedClose = document.querySelector('.added__close');
  var addedOpenLink = document.querySelector('.article__addlink');


  var modal;
  var modalCloseBtn;


  var verifyAndAddEmail = function () {
    var memorized = localStorage.getItem(loginEmail.getAttribute('name'));
    if (memorized !== null) {
      loginEmail.value = memorized;
    }
  };

  var OnSubmitStoreEmail = function () {
    if (loginEmail.value) {
      localStorage.setItem(loginEmail.getAttribute('name'), loginEmail.value);
    }
  };

  var onSubmitStoreEmailCloseModal = function () {
    if (loginEmail.value) {
      localStorage.setItem(loginEmail.getAttribute('name'), loginEmail.value);
    }
    closeModal();
  };

  // set focus

  var setFocus = function () {
    if (loginEmail.value !== '') {
      loginPswd.focus();
    } else {
      loginEmail.focus();
    }
  };

  // mobile header

  var toggleMenu = function () {
    var expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !expanded);
    pageHeader.classList.toggle('page-header--menu-opened');
    if (!expanded) {
      body.classList.add('overlay');
    } else {
      body.classList.remove('overlay');
    }
  };

  if (pageHeader && menuButton) {
    pageHeader.classList.remove('page-header--no-js');
    menuButton.addEventListener('click', function () {
      toggleMenu();
    });
  }

  // modal

  /* close modal */

  var closeModal = function () {
    body.classList.remove('overlay');
    modal.classList.add('modal--closed');
    modalCloseBtn.removeEventListener('click', onClickCloseModal);
    window.removeEventListener('keydown', onEscPressCloseModal);
  };

  var onClickCloseModal = function () {
    closeModal();
  };

  /* close modal on esc */

  var onEscPressCloseModal = function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      closeModal();
    }
  };

  var onClickOutsideClose = function (evt) {
    if (evt.target === evt.currentTarget) {
      closeModal();
    }
  };

  /* on submit close modal*/

  var onSubmitCloseModal = function () {
    closeModal();
  };

  /* show modal */

  var openModal = function () {
    body.classList.add('overlay');
    modal.classList.remove('modal--closed');
    modalCloseBtn.addEventListener('click', onClickCloseModal);
    window.addEventListener('keydown', onEscPressCloseModal);
    modal.addEventListener('mouseup', onClickOutsideClose);
  };

  // show filter modal

  if (filterOpen && filterModal && filterClose && filterForm) {
    filterOpen.addEventListener('click', function () {
      modal = filterModal;
      modalCloseBtn = filterClose;
      openModal();
      filterForm.addEventListener('submit', onSubmitCloseModal);
    });
  }

  var closeMenuIfOpened = function () {
    if (pageHeader && pageHeader.classList.contains('page-header--menu-opened')) {
      pageHeader.classList.remove('page-header--menu-opened');
      menuButton.setAttribute('aria-expanded', 'false');
    }
  };

  // show login modal

  if (loginOpenLinks && loginModal && loginClose && loginForm && loginEmail) {
    loginOpenLinks.forEach(function (link) {
      link.addEventListener('click', function (evt) {
        closeMenuIfOpened();
        evt.preventDefault();
        modal = loginModal;
        modalCloseBtn = loginClose;
        openModal();
        verifyAndAddEmail();
        setFocus();
        loginForm.addEventListener('submit', onSubmitStoreEmailCloseModal);
      });
    });
  }

  // localStorage on login page

  if (loginPage) {
    window.addEventListener('load', function () {
      verifyAndAddEmail();
      setFocus();
      loginForm.addEventListener('submit', OnSubmitStoreEmail);
    });
  }

  // show 'add to cart' modal

  if (addedOpenLink && addedModal && addedClose) {
    addedOpenLink.addEventListener('click', function (evt) {
      evt.preventDefault();
      modal = addedModal;
      modalCloseBtn = addedClose;
      openModal();
    });
  }

  // accordion

  accordionPanels.forEach(function (panel) {
    return panel.setAttribute('data-height', panel.offsetHeight + 'px');
  });

  accordionPanels.forEach(function (panel) {
    var padding = window.getComputedStyle(panel).getPropertyValue('padding-top');
    return panel.setAttribute('data-padding-top', padding);
  });

  var zeroPadding = function (panel) {
    panel.style.paddingTop = '0';
  };

  var zeroHeight = function (panel) {
    panel.style.height = '0';
  };


  accordionPanels.forEach(function (panel) {
    zeroPadding(panel);
    zeroHeight(panel);
  });


  var animatePanel = function animatePanel(control) {
    control.addEventListener('click', function () {
      var parent = control.parentNode;
      var panel = parent.childNodes[3];
      var expanded = control.getAttribute('aria-expanded') === 'true';
      control.setAttribute('aria-expanded', !expanded);
      if (parent.classList.contains('accordion__item--active')) {
        panel.style.height = '0';
        panel.style.paddingTop = '0';
        parent.classList.remove('accordion__item--active');
      } else {
        panel.style.height = panel.getAttribute('data-height');
        panel.style.paddingTop = panel.getAttribute('data-padding-top');
        parent.classList.add('accordion__item--active');
      }
    });
  };

  accordionControls.forEach(function (control) {
    animatePanel(control);
  });


  // carousel
  if (document.querySelector('.carousel__container') !== null) {
    var swiper = new Swiper('.carousel__container', {
      navigation: {
        prevEl: '.carousel__button-prev',
        nextEl: '.carousel__button-next'
      },
      keyboard: {
        enabled: true
      },
      mousewheel: {
        sensitivity: 1
      },
      watchOverflow: true,
      spaceBetween: 30,
      observer: true,
      breakpoints: {
        320: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          pagination: {
            el: '.swiper__pagination',
            clicable: true,
            type: 'fraction',
            renderFraction: function (currentClass, totalClass) {
              return '<span class="' + currentClass + '"></span>' + ' of ' + '<span class="' + totalClass + '"></span>';
            },
          },
        },
        768: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          pagination: {
            el: '.swiper__pagination',
            clickable: true,
            type: 'bullets',
            renderBullet: function renderBullet(index, className) {
              return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
          },
        },
        // 990: {
        //   slidesPerView: 3,
        //   slidesPerGroup: 3,
        //   pagination: {
        //     el: '.swiper__pagination',
        //     clickable: true,
        //     type: 'bullets',
        //     renderBullet: function renderBullet(index, className) {
        //       return '<span class="' + className + '">' + (index + 1) + '</span>';
        //     },
        //   },
        // },
        1024: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          pagination: {
            el: '.swiper__pagination',
            clickable: true,
            type: 'bullets',
            renderBullet: function renderBullet(index, className) {
              return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
          },
        },
      },
    });
  }

})();
