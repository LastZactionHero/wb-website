import "bootstrap-v4-dev";
import iFrameResize from "../node_modules/iframe-resizer/js/iframeResizer.min.js";
import InfoTabs from "./components/info_tabs";
import Appear from "../node_modules/appear/dist/appear.js";

iFrameResize({});

// Start videos shortly after they scroll into view. Stop them when they leave.
window.ap = appear({
  elements: function elements(){
    return document.getElementsByTagName('video');
  },
  appear: function appear(el){
    setTimeout( () => {
      el.play();
    }, 2000);
    
  },
  disappear: function disappear(el){
    el.pause();
  },
  bounds: 200,
  reappear: true
});