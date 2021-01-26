'use strict';
(function() {
  const pageHeader = document.querySelector('.page-header');
  const menuButton = pageHeader.querySelector('.page-header__menu-button');

  if (pageHeader !== null && menuButton !== null) {
    pageHeader.classList.remove('page-header--no-js');

    menuButton.addEventListener('click', () => {
      let expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', !expanded);
      pageHeader.classList.toggle('page-header--menu-opened');
    });
  }
})();
