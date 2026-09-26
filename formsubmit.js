/* Makes the Elementor forms post straight to FormSubmit instead of WordPress. */
(function () {
  var siteRoot = document.currentScript.src.replace(/formsubmit\.js(\?.*)?$/, '');

  // Elementor's own script would grab the submit and send it to WordPress (which isn't here),
  // so stop it before it runs and let the browser post the form to FormSubmit normally.
  window.addEventListener('submit', function (e) {
    var form = e.target;
    if (form && form.action && form.action.indexOf('formsubmit.co') !== -1) {
      e.stopImmediatePropagation();
    }
  }, true);

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('input[data-thankyou="true"]').forEach(function (el) {
      if (location.protocol === 'file:') {
        // FormSubmit can't redirect back to a file on your computer; use its own thank-you page instead
        el.parentNode.removeChild(el);
      } else {
        el.value = siteRoot + 'thank-you/';
      }
    });
  });
})();
