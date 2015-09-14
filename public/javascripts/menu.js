
$("#menuButton").click(function(){
  $("#oc-nav").toggleClass("off-canvas");
  $('.intro').toggleClass('remove-oc');
  $('main').toggleClass('remove-oc');
});