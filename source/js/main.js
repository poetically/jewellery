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
})();
