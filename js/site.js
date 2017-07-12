import "bootstrap-v4-dev";
import "slick-carousel";
import "jquery.simple-text-rotator";
import iFrameResize from "../node_modules/iframe-resizer/js/iframeResizer.min.js";
import Appear from "../node_modules/appear/dist/appear.js";

import InfoTabs from "./components/info_tabs";
import Accordion from "./components/accordion";

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
    dots: true,
    arrows: false
  });
});

// Rotating text on the home page
$(".rotate").textrotator({
  animation: "flipUp", // You can pick the way it animates when rotating through words. Options are dissolve (default), fade, flip, flipUp, flipCube, flipCubeUp and spin. 
  separator: ",", // If you don't want commas to be the separator, you can define a new separator (|, &, * etc.) by yourself using this field. 
  speed: 4000 // How many milliseconds until the next word show. 
});

// Fixed position navbar, place higher up on screen along with scroll
 $(window).scroll(function() {
   const scrollThreshold = 48;

   if(document.body.scrollTop > scrollThreshold) { 
      $('.navbar').addClass('navbar-scrolled');
   } else {
     $('.navbar').removeClass('navbar-scrolled');
     $('.navbar').css('margin-top', scrollThreshold - document.body.scrollTop);
   }
 });