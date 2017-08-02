// Load growsumo.js
(function(){var gs=document.createElement('script');gs.src='https://snippet.growsumo.com/growsumo.min.js';gs.type='text/javascript';gs.async ='true';gs.onload=gs.onreadystatechange=function(){var rs=this.readyState;if(rs&&rs!='complete'&&rs!='loaded')return;try{growsumo._initialize('pk_d83595336d74496294853b971de5df8f');}catch(e){}};var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(gs,s);})();

// What is GrowSumo?
// A referral program we use, https://www.growsumo.com
// 
// The Problem:
// We need our Pardot form data to be sent to Pardot AND Growsumo. Currently, our form that we are using GrowSumo with is served via an iFrame from Pardot. Because of that, we can't access the cookie or params (CORS issues) from the parent window (https://workbright.com/?gspid=gstest) inside that form iframe. Likewise, we can't access the Pardot input form data outside of the iframe in the parent window.
// 
// How this solution works:
// 1) User follows referral link, ex. workbright.com/?gspid=[TOKEN]
// 2) We store the token in localStorage on page load on the parent site (workbright.com)
// 3) We set an eventListener on the parent site (workbright.com) to listen for a cross-document message from the iframe Pardot form, https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
// 4) User submits form (iframe)
// 5) data is submitted to Pardot
// 6) data is sent to to parent (workbright.com) via cross-document message and we call growsumo.createSignup() to submit data to growsumo.
var partnerKey = location.search.split('gspid=')[1];

// only set if exists
if (partnerKey){
 localStorage.setItem('growSumo_pk', partnerKey);
}

// Once we are notified the pardot iframe has loaded, we can send it a message with the partner key
// use window.postMessage() for passing cross domain localStorage partnerKey
window.addEventListener('message', function(event) {
    // IMPORTANT: Check the origin of the data!
    if (~event.origin.indexOf('http://www2.workbright.com')) {
        // If the message contains the form data, we are ready to post to growSumo!!
        if (event.data && event.data.hasOwnProperty('firstName')) {

            // email of the user signing-up (required)
            growsumo.data.email = event.data.email;
        
            // name of the user signing up (required)
            growsumo.data.name = event.data.firstName+" "+event.data.lastName;
        
            growsumo.data.publicKey = event.data.publicKey;
            
            // random customer key
            growsumo.data.key = 'cus_'+Math.random().toString(36).substring(7);
            
            growsumo.data.partnerKey = localStorage.getItem('growSumo_pk'); 
            // event.data.partnerKey;
            
            growsumo.data.currency = 'USD';
            
            growsumo.createSignup();
        }

    } else {
        // The data is not from our website, ignore it!
       return;
    }
});
