// Apply Bootstrap class 'form-control' to all inputs
// This is not configurable in Pardot
var formInputs = document.querySelectorAll('select, input');
for (var i = 0; i < formInputs.length; i++) {
  if (formInputs[i].type != 'submit') {
    formInputs[i].classList.add('form-control');
  }
}

import iFrameResize from "../node_modules/iframe-resizer/js/iframeResizer.contentWindow.js";