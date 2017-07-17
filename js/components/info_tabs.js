import Viewports from "../_viewports";

// Basic horizontal tab scrolling for Info Tabs component
// Scroll the Info Tabs container horizontally to the selected link
var nodeList = document.querySelectorAll('.info-tabs .tab-container .nav-link');
for(var i = 0; i < nodeList.length; i++) {
  var navLink = nodeList[i];
  navLink.addEventListener('click', (event) => {
    if(document.body.clientWidth <= Viewports.viewportPxMd) {
      const scrollOffset = 72;
      const scrollTo = $(".tab-content").offset().top - scrollOffset;
      $('html,body').animate({scrollTop: scrollTo}, 250);
    }
  });
}
