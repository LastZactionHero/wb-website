// Apply Bootstrap class 'form-control' to all inputs
// This is not configurable in Pardot
var formInputs = document.querySelectorAll('select, input');
for (var i = 0; i < formInputs.length; i++) {
  if (formInputs[i].type != 'submit') {
    formInputs[i].classList.add('form-control');
  }
}

import iFrameResize from "../node_modules/iframe-resizer/js/iframeResizer.contentWindow.js";

// GrowSumo Start
window.onload = function () {
  parent.window.postMessage(true, '*');

  form = document.getElementById("pardot-form");
  
  if (form) {
    form.setAttribute("onsubmit", "return pushGrowSumo()");
  }
};

function pushGrowSumo() {
  var fName = document.getElementById("81162_111591pi_81162_111591").value;
  var lName = document.getElementById("81162_111593pi_81162_111593").value;
  var email = document.getElementById('81162_111597pi_81162_111597').value;
  var apiPublicKey = 'pk_d83595336d74496294853b971de5df8f';

  if (email.length && fName.length && lName.length) {
      var formDetails = {
  		firstName: fName,
  		lastName: lName,
  		email: email,
  		publicKey: apiPublicKey,
  	}
      // send the main website the form details we can avoid CORS issues from POSTing to growsumo from this pardot view
  	parent.window.postMessage(formDetails, '*');
  }
};
// Growsumo End