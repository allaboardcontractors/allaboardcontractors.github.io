(function(){
  var root = document.documentElement;
  root.classList.add('js');
  document.getElementById('year').textContent = new Date().getFullYear();

  /* Hero statement lights up word by word, once, on load */
  var manifesto = document.querySelector('.manifesto');
  if (manifesto) {
    var full = manifesto.textContent.replace(/\s+/g, ' ').trim();
    var i = 0;
    function wrapWords(node, extraClass){
      var frag = document.createDocumentFragment();
      node.textContent.split(/\s+/).filter(Boolean).forEach(function(word){
        var s = document.createElement('span');
        s.className = 'w' + (extraClass ? ' ' + extraClass : '');
        s.style.setProperty('--i', i++);
        s.textContent = word;
        frag.appendChild(s);
        frag.appendChild(document.createTextNode(' '));
      });
      return frag;
    }
    var built = document.createDocumentFragment();
    Array.prototype.slice.call(manifesto.childNodes).forEach(function(n){
      built.appendChild(wrapWords(n, n.nodeType === 1 ? n.className : ''));
    });
    manifesto.textContent = '';
    manifesto.appendChild(built);
    manifesto.setAttribute('aria-label', full);
  }

  /* Mobile menu */
  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  menuBtn.addEventListener('click', function(){
    var open = nav.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.textContent = open ? 'Close' : 'Menu';
    var drop = document.querySelector('.nav-drop');
    if (drop) {
      drop.classList.remove('is-open');
      drop.querySelector('.nav-drop__btn').setAttribute('aria-expanded', 'false');
    }
  });
  nav.addEventListener('click', function(e){
    if (e.target.tagName === 'A'){
      nav.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.textContent = 'Menu';
    }
  });

  /* "More" dropdown in the main nav */
  var drop = document.querySelector('.nav-drop');
  if (drop) {
    var dropBtn = drop.querySelector('.nav-drop__btn');
    dropBtn.addEventListener('click', function(e){
      e.stopPropagation();
      var open = drop.classList.toggle('is-open');
      dropBtn.setAttribute('aria-expanded', open);
    });
    drop.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        drop.classList.remove('is-open');
        dropBtn.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('click', function(e){
      if (!drop.contains(e.target)) {
        drop.classList.remove('is-open');
        dropBtn.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape') {
        drop.classList.remove('is-open');
        dropBtn.setAttribute('aria-expanded', 'false');
        dropBtn.focus();
      }
    });
  }

  /* Featured projects: swipe, or use the arrows */
  var track = document.getElementById('work-track');
  var prev = document.getElementById('work-prev');
  var next = document.getElementById('work-next');
  if (track && prev && next) {
    function step(){
      var slide = track.querySelector('.slide');
      return slide ? slide.getBoundingClientRect().width + 20 : track.clientWidth;
    }
    function syncArrows(){
      prev.disabled = track.scrollLeft < 8;
      next.disabled = track.scrollLeft + track.clientWidth > track.scrollWidth - 8;
    }
    prev.addEventListener('click', function(){ track.scrollBy({left: -step(), behavior: 'smooth'}); });
    next.addEventListener('click', function(){ track.scrollBy({left: step(), behavior: 'smooth'}); });
    track.addEventListener('scroll', syncArrows, {passive: true});
    window.addEventListener('resize', syncArrows);
    syncArrows();
  }

  /* "Get an estimate" links preselect the service in the form */
  var serviceSelect = document.getElementById('f-service');
  if (serviceSelect) {
    document.querySelectorAll('[data-service]').forEach(function(a){
      a.addEventListener('click', function(){ serviceSelect.value = a.getAttribute('data-service'); });
    });
  }

  /* Estimate form: checks name and phone, then sends through the site form */
  var form = document.getElementById('estimate-form');
  var status = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', function(e){
      var f = form.elements;
      if (!f.name.value.trim() || !f.phone.value.trim()){
        e.preventDefault();
        status.hidden = false;
        status.textContent = 'Add your name and phone number so we can reach you.';
        (f.name.value.trim() ? f.phone : f.name).focus();
      }
    });
  }
})();
