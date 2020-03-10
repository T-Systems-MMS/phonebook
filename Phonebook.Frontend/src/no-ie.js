function msieversion() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf('MSIE ');

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    // stone age browser IE
    console.log('not supported');
    var html =
      '<p><strong>Please notice: This app does not support Internet Explorer!</strong></p><p><strong>To run the Phonebook, please use one of the following modern browsers:</strong></p><ul><li><strong><a href="microsoft-edge:#">Edge</a></strong></li><li><strong>Chrome</strong></li><li><strong>Firefox</strong></li><li><strong>Opera</strong></li></ul>';
    document.getElementsByTagName('body')[0].innerHTML = html;
  }
}
