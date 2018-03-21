'use strict';
var nav = document.getElementById('top-nav');

window.addEventListener('scroll', changeClass);

function changeClass() {
  if (window.scrollY > 30) {
    nav.className = 'nav-scrolled';
  } else if (window.scrollY < 30) {
    nav.className = 'empty';
  }
}