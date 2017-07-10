import "bootstrap-v4-dev";
import "slick-carousel";
import iFrameResize from "../node_modules/iframe-resizer/js/iframeResizer.min.js";
import Appear from "../node_modules/appear/dist/appear.js";
import InfoTabs from "./components/info_tabs";

iFrameResize({});

// Start videos shortly after they scroll into view. Stop them when they leave.
window.ap = appear({
  elements: function elements(){
    return document.getElementsByTagName('video');
  },
  appear: function appear(el){
    setTimeout( () => {
      el.play();
    }, 500);
    
  },
  disappear: function disappear(el){
    el.pause();
  },
  bounds: 0,
  reappear: true
});

// Start any Slick Carousels
$(document).ready(function(){
  $('.slick-carousel').slick({
    autoplay: true,
    dots: true
  });
});
