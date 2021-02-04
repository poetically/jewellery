'use strict';
(function () {
  var pageHeader = document.querySelector('.page-header');
  var menuButton = pageHeader.querySelector('.page-header__menu-button');
  var accordionControls = document.querySelectorAll('.accordion__control');
  var accordionPanels = document.querySelectorAll('.accordion__panel');
  var body = document.querySelector('body');

  if (pageHeader !== null && menuButton !== null) {
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
    // grabCursor: true,
    keyboard: {
      enabled: true
    },
    mousewheel: {
      sensitivity: 1
    },
    // slidesPerView: 4,
    watchOverflow: true,
    spaceBetween: 30,
    // slidesPerGroup: 4,
    // loop: true,
    observer: true,
    // loopAdditionalSlides: 4,
    breakpoints: {
      320: {
        slidesPerView: 2,
        slidesPerGroup: 2
      },
      // 768: {
      //   slidesPerView: 3,
      //   slidesPerGroup: 3,
      // },
      1024: {
        slidesPerView: 4,
        slidesPerGroup: 4
      },
    },
  });
})();


// 'use strict';
// (function () {
//   const PANEL_PADDING = 15;
//   const pageHeader = document.querySelector('.page-header');
//   const menuButton = pageHeader.querySelector('.page-header__menu-button');
//   const accordionControls = document.querySelectorAll('.accordion__control');
//   const accordionPanels = document.querySelectorAll('.accordion__panel');
//   const body = document.querySelector('body');
//   // let bodyOverlay = false;

//   if (pageHeader !== null && menuButton !== null) {
//     pageHeader.classList.remove('page-header--no-js');

//     menuButton.addEventListener('click', () => {
//       let expanded = menuButton.getAttribute('aria-expanded') === 'true';
//       menuButton.setAttribute('aria-expanded', !expanded);
//       pageHeader.classList.toggle('page-header--menu-opened');
//       if (!expanded) {
//         body.classList.add('overlay');
//       } else {
//         body.classList.remove('overlay');
//       }
//     });
//   }

//   accordionPanels.forEach((panel) => panel.setAttribute('data-height', panel.offsetHeight + PANEL_PADDING + 'px'));

//   accordionPanels.forEach((panel) => (panel.style.height = '0'));

//   const animatePanel = (control) => {
//     control.addEventListener('click', () => {
//       const parent = control.parentNode;
//       const panel = parent.childNodes[3];
//       let expanded = control.getAttribute('aria-expanded') === 'true';
//       control.setAttribute('aria-expanded', !expanded);
//       if (parent.classList.contains('accordion__item--active')) {
//         panel.style.height = '0';
//         parent.classList.remove('accordion__item--active');
//       } else {
//         panel.style.height = panel.getAttribute('data-height');
//         parent.classList.add('accordion__item--active');
//       }
//     });
//   };

//   accordionControls.forEach((control) => animatePanel(control));

//   // carousel
//   new Swiper('.carousel__container', {
//     navigation: {
//       prevEl: '.carousel__button-prev',
//       nextEl: '.carousel__button-next',
//     },

//     pagination: {
//       el: '.swiper__pagination',
//       clickable: true,
//       renderBullet: function (index, className) {
//         return '<span class="' + className + '">' + (index + 1) + '</span>';
//       },
//     },
//     // grabCursor: true,
//     keyboard: {
//       enabled: true,
//     },
//     mousewheel: {
//       sensitivity: 1,
//     },
//     // slidesPerView: 4,
//     watchOverflow: true,
//     spaceBetween: 30,
//     // slidesPerGroup: 4,
//     // loop: true,
//     observer: true,
//     // loopAdditionalSlides: 4,
//     breakpoints: {
//       320: {
//         slidesPerView: 2,
//         slidesPerGroup: 2,
//       },
//       // 768: {
//       //   slidesPerView: 3,
//       //   slidesPerGroup: 3,
//       // },
//       1024: {
//         slidesPerView: 4,
//         slidesPerGroup: 4,
//       },
//     },
//   });
// })();
