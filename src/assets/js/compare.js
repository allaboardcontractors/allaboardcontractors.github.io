(function(){
  /* Before and after compare sliders: the range input moves the divider
     and clips the before photo. Without JavaScript the frame stays at
     50 percent and both photos show. */
  document.querySelectorAll('[data-compare]').forEach(function(box){
    var range = box.querySelector('.compare__range');
    if(!range) return;
    function update(){
      box.style.setProperty('--pos', range.value + '%');
    }
    range.addEventListener('input', update);
    update();
  });
})();
