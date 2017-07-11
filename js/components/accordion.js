// Accordion scroll to the active card
$(".accordion .card-header a").click( function(event) {
  setTimeout(function() {    
    const scrollOffset = 64;
    const scrollTo = $(event.target).offset().top - scrollOffset;
    $('html,body').animate({scrollTop: scrollTo}, 250);
  }, 200);
});