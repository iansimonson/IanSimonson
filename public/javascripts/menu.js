$("#menuButton").click(function(){
  $("#oc-nav").toggleClass("off-canvas");
  $('.intro').toggleClass('remove-oc');
  $('main').toggleClass('remove-oc');
});

$(document).mouseup(function (e)
{
    var container = $("#oc-nav");
    var menu = $("#menuButton")

    if (!container.is(e.target) // if the target of the click
        && !menu.is(e.target) //isn't the container or menu button
        && container.has(e.target).length === 0 // ... nor a descendant of the container
        && !container.hasClass('off-canvas')) // and if it's on-screen
    {
        container.addClass("off-canvas"); //Move it off-screen
        $('.intro').removeClass('remove-oc');
        $('main').removeClass('remove-oc');
    }
});