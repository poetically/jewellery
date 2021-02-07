'use strict';
(function () {
  var pageHeader = document.querySelector('.page-header');
  var menuButton = pageHeader.querySelector('.page-header__menu-button');
  var accordionControls = document.querySelectorAll('.accordion__control');
  var accordionPanels = document.querySelectorAll('.accordion__panel');
  var body = document.querySelector('body');
  var mQueryTablet = window.matchMedia('(max-width: 1023px)');

  var modal = document.querySelector('.modal');
  var modalCloseBtn = document.querySelector('.modal__close');
  var modalOpenBtn = document.querySelector('.modal__open');
  var filterForm = document.querySelector('.filter__form');

  // mobile header

  if (pageHeader && menuButton) {
    pageHeader.classList.remove('page-header--no-js');

    menuButton.addEventListener('click', function () {
      var expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', !expanded);
      pageHeader.classList.toggle('page-header--menu-opened');
      if (!expanded) {
        body.classList.add('overlay');
      } else {
        body.classList.remove('overlay');
      }
    });
  }

  // modal



  /* close the modal */
  var closeModal = function () {
    body.classList.remove('overlay');
    modal.classList.add('modal--closed');
    modalCloseBtn.removeEventListener('click', onClickCloseModal);
    window.removeEventListener('keydown', onEscPressCloseModal);
  };

  var onClickCloseModal = function () {
    closeModal();
  };

  /* close the modal on esc */

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
      modal.setAttribute('role', 'dialog');
      filterForm.addEventListener('submit', onSubmitCloseModal);
      modalCloseBtn.addEventListener('click', onClickCloseModal);
      window.addEventListener('keydown', onEscPressCloseModal);
      modal.addEventListener('mouseup', onClickOutsideClose);
    };

  if (modalOpenBtn && modal && modalCloseBtn) {
    modalOpenBtn.addEventListener('click', function (evt) {
      evt.preventDefault();
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

      pagination: {
        el: '.swiper__pagination',
        clickable: true,
        renderBullet: function renderBullet(index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        }
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
          slidesPerGroup: 2
        },
        1024: {
          slidesPerView: 4,
          slidesPerGroup: 4
        },
      },
    });
  }

})();
