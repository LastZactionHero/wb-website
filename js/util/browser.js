export default {
  isInternetExplorer: function() {
    var ua = window.navigator.userAgent;
    return ua.indexOf("MSIE ") != -1;
  }
}