/* Search box on the listing pages: filters the listings on this page as you type. */
(function () {
  function normalize(s) { return (s || '').toLowerCase().replace(/\s+/g, ' ').trim(); }

  document.addEventListener('DOMContentLoaded', function () {
    var cards = Array.prototype.slice.call(document.querySelectorAll('article.elementor-post'));

    document.querySelectorAll('form.elementor-search-form').forEach(function (form) {
      var input = form.querySelector('input[type="search"]');
      if (!input) return;

      var empty = document.createElement('p');
      empty.textContent = 'No listings found.';
      empty.style.cssText = 'display:none;text-align:center;padding:24px 0;margin:0;';
      var grid = cards.length ? cards[0].parentNode : null;
      if (grid) grid.parentNode.insertBefore(empty, grid.nextSibling);

      function filter() {
        var q = normalize(input.value);
        var shown = 0;
        cards.forEach(function (card) {
          var match = !q || normalize(card.textContent).indexOf(q) !== -1;
          card.style.display = match ? '' : 'none';
          if (match) shown++;
        });
        empty.style.display = shown ? 'none' : 'block';
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        filter();
        if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      input.addEventListener('input', filter);
      input.addEventListener('search', filter); // the little "x" clear button
    });
  });
})();
