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

  /* Client reviews: read the published review sheet and show them, newest first */
  var reviewList = document.getElementById('client-reviews');
  var reviewNote = document.getElementById('review-note');
  if (reviewList && reviewList.getAttribute('data-csv')) {
    fetch(reviewList.getAttribute('data-csv')).then(function(r){
      if (!r.ok) { throw new Error('reviews feed not ready'); }
      return r.text();
    }).then(function(text){
      var rows = parseCsv(text);
      if (rows.length < 2) { throw new Error('no reviews yet'); }
      var head = rows[0];
      var iName = head.indexOf('Your name');
      var iWork = head.indexOf('What work did we do for you?');
      var iStars = head.indexOf('How many stars?');
      var iText = head.indexOf('Your review');
      var iCity = head.indexOf('City');
      var shown = 0;
      for (var r = rows.length - 1; r >= 1; r--) {
        var row = rows[r];
        var name = (row[iName] || '').trim();
        var text = (row[iText] || '').trim();
        if (!name || !text) { continue; }
        var stars = parseInt(row[iStars], 10) || 0;
        var work = (row[iWork] || '').trim();
        var city = (row[iCity] || '').trim();
        var li = document.createElement('li');
        li.className = 'quote';
        var starLine = document.createElement('p');
        starLine.className = 'quote__stars';
        starLine.setAttribute('aria-label', stars + ' out of 5 stars');
        starLine.textContent = '★★★★★'.slice(0, stars) + '☆☆☆☆☆'.slice(0, 5 - stars);
        var quote = document.createElement('blockquote');
        quote.textContent = text;
        var who = document.createElement('p');
        who.className = 'quote__name';
        who.textContent = name;
        var job = document.createElement('p');
        job.className = 'quote__job';
        job.textContent = [work, city].filter(Boolean).join(' · ');
        li.appendChild(starLine);
        li.appendChild(quote);
        li.appendChild(who);
        if (job.textContent) { li.appendChild(job); }
        reviewList.appendChild(li);
        shown++;
      }
      if (!shown) { throw new Error('no reviews yet'); }
      if (reviewNote) { reviewNote.hidden = true; }
    }).catch(function(){
      if (reviewNote) { reviewNote.textContent = 'Be the first to leave a review.'; }
    });
    function parseCsv(text){
      var rows = [];
      var row = [], cur = '', inQ = false;
      for (var i = 0; i < text.length; i++) {
        var c = text[i];
        if (inQ) {
          if (c === '"') {
            if (text[i + 1] === '"') { cur += '"'; i++; } else { inQ = false; }
          } else { cur += c; }
        } else if (c === '"') { inQ = true; }
        else if (c === ',') { row.push(cur); cur = ''; }
        else if (c === '\n' || c === '\r') {
          if (c === '\r' && text[i + 1] === '\n') { i++; }
          row.push(cur); cur = ''; rows.push(row); row = [];
        } else { cur += c; }
      }
      if (cur !== '' || row.length) { row.push(cur); rows.push(row); }
      return rows;
    }
  }

  /* Review form: send a new review to Shante, like the Find a Home form */
  var reviewForm = document.getElementById('review-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', function(e){
      e.preventDefault();
      var sent = document.getElementById('review-sent');
      var err = document.getElementById('review-error');
      if (sent) { sent.hidden = true; }
      if (err) { err.hidden = true; }
      var fd = new FormData(reviewForm);
      fd.set('_subject', 'New All Aboard Contractors review');
      fd.set('_template', 'table');
      fd.set('_captcha', 'false');
      fetch('https://formsubmit.co/ajax/info@shantekelleyrealty.com', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(Object.fromEntries(fd)) })
        .then(function(r){
          if (!r.ok) { throw new Error('send failed'); }
          if (sent) { sent.hidden = false; sent.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
          reviewForm.reset();
        })
        .catch(function(){
          if (err) { err.hidden = false; err.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
        });
    });
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
