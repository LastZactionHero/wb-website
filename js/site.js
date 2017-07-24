import "babel-polyfill";
import "bootstrap-v4-dev";
import "slick-carousel";
import "jquery.simple-text-rotator";
import iFrameResize from "../node_modules/iframe-resizer/js/iframeResizer.min.js";
import Appear from "../node_modules/appear/dist/appear.js";

import Viewports from "./_viewports";

import InfoTabs from "./components/info_tabs";
import Accordion from "./components/accordion";
import Browser from "./util/browser";

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
  // Testimonial Carousel
  $('.testimonial-carousel .slick-carousel').slick({
    autoplay: true,
    dots: true,
    arrows: false
  });

  $('.image-carousel .slick-carousel').slick({
    autoplay: true,
    dots: true,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: Viewports.viewportPxSm,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
});

// Rotating text on the home page
const rotateAnimation = Browser.isInternetExplorer() ? 'fade' : 'flipUp';
$(".rotate").textrotator({
  animation: rotateAnimation, // You can pick the way it animates when rotating through words. Options are dissolve (default), fade, flip, flipUp, flipCube, flipCubeUp and spin. 
  separator: ",", // If you don't want commas to be the separator, you can define a new separator (|, &, * etc.) by yourself using this field. 
  speed: 4000 // How many milliseconds until the next word show. 
});
$(".rotating-title").removeClass("rotating-title-hidden");


// Fixed position navbar, place higher up on screen along with scroll
const adjustNavbar = function() {
  const scrollThreshold = 48;

  // Supports IE - document.documentElement.scrollTop used in IE, document.body.scrollTop used elsewhere
  const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
  
  if(scrollTop > scrollThreshold) { 
    $('.navbar').addClass('navbar-scrolled');
  } else {
    $('.navbar').removeClass('navbar-scrolled');
    $('.navbar').css('margin-top', scrollThreshold - scrollTop);
  }
}
// Run on document load (incase it refreshes halfway down) and on scroll
$(document).ready(function() { adjustNavbar() });
$(window).scroll(function() { adjustNavbar() });  