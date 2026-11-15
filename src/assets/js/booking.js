(function(){
  var grid = document.getElementById('cal-grid');
  var title = document.getElementById('cal-title');
  var prev = document.getElementById('cal-prev');
  var next = document.getElementById('cal-next');
  var slotsBox = document.getElementById('slots');
  var slotsGrid = document.getElementById('slots-grid');
  var slotsDate = document.getElementById('slots-date');
  var summary = document.getElementById('booking-summary');
  var dateInput = document.getElementById('booking-date');
  var timeInput = document.getElementById('booking-time');
  var form = document.getElementById('booking-form');
  var status = document.getElementById('booking-status');
  if(!grid || !form) return;

  var TIMES = ['9:00 AM','10:00 AM','11:00 AM','1:00 PM','2:00 PM','3:00 PM','4:00 PM'];
  var today = new Date(); today.setHours(0,0,0,0);
  var maxDate = new Date(today); maxDate.setDate(maxDate.getDate() + 60);
  var view = new Date(today.getFullYear(), today.getMonth(), 1);
  var selectedDate = null;
  var selectedTime = null;

  function fmt(d){ return d.toLocaleDateString('en-US', {weekday:'long', year:'numeric', month:'long', day:'numeric'}); }
  function iso(d){ return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); }
  function isWeekday(d){ var g = d.getDay(); return g !== 0 && g !== 6; }

  function render(){
    title.textContent = view.toLocaleDateString('en-US', {month:'long', year:'numeric'});
    prev.disabled = view.getFullYear() === today.getFullYear() && view.getMonth() === today.getMonth();
    var lastView = new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
    next.disabled = view.getFullYear() === lastView.getFullYear() && view.getMonth() === lastView.getMonth();
    grid.innerHTML = '';
    var first = new Date(view.getFullYear(), view.getMonth(), 1);
    var startDay = first.getDay();
    var daysInMonth = new Date(view.getFullYear(), view.getMonth()+1, 0).getDate();
    for(var i=0;i<startDay;i++){ var s=document.createElement('span'); s.className='book-cal__blank'; grid.appendChild(s); }
    for(var d=1; d<=daysInMonth; d++){
      var date = new Date(view.getFullYear(), view.getMonth(), d);
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'book-cal__day';
      b.textContent = d;
      var ok = date >= today && date <= maxDate && isWeekday(date);
      b.disabled = !ok;
      if(selectedDate && date.getTime() === selectedDate.getTime()){ b.classList.add('is-selected'); b.setAttribute('aria-pressed','true'); }
      if(!ok){ b.setAttribute('aria-disabled','true'); }
      b.setAttribute('aria-label', fmt(date) + (ok ? '' : ' (not available)'));
      (function(dt){ b.addEventListener('click', function(){ selectDate(dt); }); })(date);
      grid.appendChild(b);
    }
  }

  function selectDate(dt){
    selectedDate = dt;
    selectedTime = null;
    timeInput.value = '';
    dateInput.value = iso(dt);
    slotsDate.textContent = fmt(dt);
    slotsBox.hidden = false;
    slotsGrid.innerHTML = '';
    TIMES.forEach(function(t){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'slot';
      b.textContent = t;
      b.setAttribute('aria-pressed','false');
      b.addEventListener('click', function(){ selectTime(t, b); });
      slotsGrid.appendChild(b);
    });
    summary.textContent = 'You picked ' + fmt(dt) + '. Now pick a time.';
    render();
    slotsBox.scrollIntoView({behavior:'smooth', block:'nearest'});
  }

  function selectTime(t, btn){
    selectedTime = t;
    timeInput.value = t;
    slotsGrid.querySelectorAll('.slot').forEach(function(s){ s.classList.remove('is-selected'); s.setAttribute('aria-pressed','false'); });
    btn.classList.add('is-selected');
    btn.setAttribute('aria-pressed','true');
    summary.textContent = 'Your estimate visit: ' + fmt(selectedDate) + ' at ' + t + '. Fill in your details below to book it.';
  }

  prev.addEventListener('click', function(){ view = new Date(view.getFullYear(), view.getMonth()-1, 1); render(); });
  next.addEventListener('click', function(){ view = new Date(view.getFullYear(), view.getMonth()+1, 1); render(); });

  form.addEventListener('submit', function(e){
    var f = form.elements;
    if(!selectedDate || !selectedTime){
      e.preventDefault();
      status.hidden = false;
      status.textContent = 'Pick a day on the calendar and a time before you book.';
      return;
    }
    if(!f.name.value.trim() || !f.phone.value.trim()){
      e.preventDefault();
      status.hidden = false;
      status.textContent = 'Add your name and phone number so we can reach you.';
      (f.name.value.trim() ? f.phone : f.name).focus();
      return;
    }
  });

  render();
})();
