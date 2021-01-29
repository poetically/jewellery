
'use strict';
(function() {
  const pageHeader = document.querySelector('.page-header');
  const menuButton = pageHeader.querySelector('.page-header__menu-button');
  const accordionControls = document.querySelectorAll('.accordion__control');
  const accordionPanels = document.querySelectorAll('.accordion__panel');
  const PADDING = 15;


  if (pageHeader !== null && menuButton !== null) {
    pageHeader.classList.remove('page-header--no-js');

    menuButton.addEventListener('click', () => {
      let expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', !expanded);
      pageHeader.classList.toggle('page-header--menu-opened');
    });
  }

  accordionPanels.forEach((panel) =>
    panel.setAttribute('data-height', panel.offsetHeight + PADDING + 'px')
  )

  accordionPanels.forEach((panel) =>
    panel.style.height = '0'
  )

  accordionControls.forEach((control) =>
    control.addEventListener('click', () => {
      const parent = control.parentNode;
      const panel = parent.childNodes[3];
      let expanded = control.getAttribute('aria-expanded') === 'true';
      control.setAttribute('aria-expanded', !expanded);
      if (parent.classList.contains('accordion__item--active')) {
        panel.style.height = '0';
        parent.classList.remove('accordion__item--active');
      } else {
        panel.style.height =  panel.getAttribute('data-height');
        parent.classList.add('accordion__item--active');
      }
    })
  )

  new Swiper('.carousel__container', {
    // navigation: {
      // prevEl: '.carousel__prev',
      // nextEl: '.carousel__next'
    // }

    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    grabCursor: true,
    keyboard: {
      enabled: true,
    },
    mousewheel: {
      sensitivity: 1,
      // eventsTarget: '.carousel__container'
    },
    slidesPerView: 4,
    watchOverflow: true,
    spaceBetween: 30,
    slidesPerGroup: 4,
    breakpoints: {
      320: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      768: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      1024: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      }
    }



  });
})();

// 'use strict';
// (function() {
//   const pageHeader = document.querySelector('.page-header');
//   const menuButton = pageHeader.querySelector('.page-header__menu-button');
//   const accordionControls = document.querySelectorAll('.accordion__control');
//   const accordionPanels = document.querySelectorAll('.accordion__panel');
//   const PADDING = 15;


//   if (pageHeader !== null && menuButton !== null) {
//     pageHeader.classList.remove('page-header--no-js');

//     menuButton.addEventListener('click', () => {
//       let expanded = menuButton.getAttribute('aria-expanded') === 'true';
//       menuButton.setAttribute('aria-expanded', !expanded);
//       pageHeader.classList.toggle('page-header--menu-opened');
//     });
//   }

//   // accordionPanels.forEach((panel) =>
//   //   panel.setAttribute('data-height', panel.offsetHeight + PADDING + 'px')
//   // )

//   // accordionPanels.forEach((panel) =>
//   //   panel.setAttribute('data-height', panel.offsetHeight)
//   // )

//   const setPanelAttributes = (elem) => {
//     elem.setAttribute('data-height', elem.offsetHeight);
//     const paddingTop = window.getComputedStyle(elem, null).getPropertyValue('padding-top').slice(0, -2);
//     elem.setAttribute('data-padding-top', paddingTop);
//   };

//   accordionPanels.forEach((panel) =>
//     setPanelAttributes(panel)
//   )

//   const hidePanel = (elem) => {
//     elem.style.height = '0';
//   };

//   accordionPanels.forEach((panel) =>
//     hidePanel(panel)
//   )

//   // accordionPanels.forEach((panel) =>
//   //   panel.setAttribute('data-padding-top', window.getComputedStyle(panel, null).getPropertyValue('padding-top').slice(0, -2))
//   // )



//   accordionControls.forEach((control) =>
//     control.addEventListener('click', () => {
//       const parent = control.parentNode;
//       const panel = parent.childNodes[3];
//       let expanded = control.getAttribute('aria-expanded') === 'true';
//       control.setAttribute('aria-expanded', !expanded);
//       if (parent.classList.contains('accordion__item--active')) {
//         panel.style.height = '0';
//         parent.classList.remove('accordion__item--active');
//       } else {
//           parent.classList.add('accordion__item--active');
//           const padding = parseInt(panel.getAttribute('data-padding-top'));
//           const height = parseInt(panel.getAttribute('data-height'));
//           panel.style.height =  height + padding + 'px';
//       }
//     })
//   )
// })();
