(function(){
  /* Review backend base URL. Set this to the live Netlify site URL after deploy. */
  var REVIEWS_API = "https://glittering-druid-e3a70e.netlify.app";
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

  /* Client reviews: read them from the review backend, newest first */
  var reviewList = document.getElementById('client-reviews');
  var reviewNote = document.getElementById('review-note');
  function showReviewNote(){
    if (reviewNote) { reviewNote.textContent = 'Be the first to leave a review.'; reviewNote.hidden = false; }
  }
  function renderReview(item){
    var stars = parseInt(item.stars, 10) || 0;
    if (stars < 0) { stars = 0; }
    if (stars > 5) { stars = 5; }
    var li = document.createElement('li');
    li.className = 'quote';
    var starLine = document.createElement('p');
    starLine.className = 'quote__stars';
    starLine.setAttribute('aria-label', stars + ' out of 5 stars');
    starLine.textContent = '★★★★★'.slice(0, stars) + '☆☆☆☆☆'.slice(0, 5 - stars);
    var quote = document.createElement('blockquote');
    quote.textContent = item.text || '';
    var who = document.createElement('p');
    who.className = 'quote__name';
    who.textContent = item.name || '';
    var job = document.createElement('p');
    job.className = 'quote__job';
    job.textContent = [item.work, item.city].filter(Boolean).join(' · ');
    li.appendChild(starLine);
    li.appendChild(quote);
    li.appendChild(who);
    if (job.textContent) { li.appendChild(job); }
    return li;
  }
  function loadReviews(){
    if (!reviewList) { return; }
    reviewList.innerHTML = '';
    // cache: 'no-store' so the browser never serves a stale list. A cached
    // empty list made a just submitted review look missing for a minute or two.
    fetch(REVIEWS_API + '/.netlify/functions/list-reviews', { cache: 'no-store' }).then(function(r){
      if (!r.ok) { throw new Error('reviews feed not ready'); }
      return r.json();
    }).then(function(data){
      var reviews = (data && data.reviews) || [];
      if (!reviews.length) { showReviewNote(); return; }
      reviews.forEach(function(item){
        if (!item.name || !item.text) { return; }
        reviewList.appendChild(renderReview(item));
      });
      if (reviewNote) { reviewNote.hidden = true; }
    }).catch(function(){
      showReviewNote();
    });
  }
  loadReviews();

  /* Review form: save the review to the backend and email Shante, like the Find a Home form */
  var reviewForm = document.getElementById('review-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', function(e){
      e.preventDefault();
      var sent = document.getElementById('review-sent');
      var err = document.getElementById('review-error');
      if (sent) { sent.hidden = true; }
      if (err) { err.hidden = true; }
      var fd = new FormData(reviewForm);
      var data = Object.fromEntries(fd);
      var review = {
        name: String(data['Your name'] || '').trim(),
        city: String(data['City'] || '').trim(),
        work: String(data['What work did we do for you?'] || '').trim(),
        stars: parseInt(data['How many stars?'], 10),
        text: String(data['Your review'] || '').trim()
      };
      fd.set('_subject', 'New All Aboard Contractors review');
      fd.set('_template', 'table');
      fd.set('_captcha', 'false');
      // Notification only. The backend is the source of truth for display.
      fetch('https://formsubmit.co/ajax/shantekelley@allaboardcontractors.com', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(Object.fromEntries(fd)) }).catch(function(){});
      fetch(REVIEWS_API + '/.netlify/functions/submit-review', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(review) })
        .then(function(r){
          if (!r.ok) { throw new Error('send failed'); }
          if (sent) { sent.hidden = false; sent.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
          reviewForm.reset();
          loadReviews();
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
