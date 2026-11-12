(function () {
  var NAMES = {
    ar: 'العربية', en: 'English', de: 'Deutsch', es: 'Español',
    fr: 'Français', it: 'Italiano', pt: 'Português', ru: 'Русский'
  };
  var ORDER = ['ar', 'en', 'de', 'es', 'fr', 'it', 'pt', 'ru'];
  var available = ORDER.filter(function (l) {
    return document.querySelector('[lang-block="' + l + '"]');
  });
  var params = new URLSearchParams(window.location.search);
  var requested = (params.get('lang') || '').toLowerCase();
  var browser = (navigator.language || '').toLowerCase().slice(0, 2);

  function has(l) { return available.indexOf(l) >= 0; }

  var lang = requested ? (has(requested) ? requested : 'en') : (has(browser) ? browser : 'en');

  function buildToggle(current) {
    var holder = document.querySelector('.toggle');
    if (!holder) return;
    holder.innerHTML = '';
    if (available.length > 2) {
      holder.classList.add('pick');
      var select = document.createElement('select');
      select.setAttribute('aria-label', 'Language');
      available.forEach(function (l) {
        var option = document.createElement('option');
        option.value = l;
        option.textContent = NAMES[l];
        option.selected = l === current;
        select.appendChild(option);
      });
      select.onchange = function () { apply(select.value); };
      holder.appendChild(select);
      return;
    }
    available.forEach(function (l) {
      var button = document.createElement('button');
      button.id = 'btn-' + l;
      button.textContent = NAMES[l];
      button.classList.toggle('active', l === current);
      button.onclick = function () { apply(l); };
      holder.appendChild(button);
    });
  }

  function apply(l) {
    document.querySelectorAll('[lang-block]').forEach(function (block) {
      block.style.display = block.getAttribute('lang-block') === l ? 'block' : 'none';
    });
    document.documentElement.lang = l;
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    buildToggle(l);
    document.querySelectorAll('a[data-page]').forEach(function (a) {
      a.setAttribute('href', a.getAttribute('data-page') + '?lang=' + l);
    });
  }

  window.setLang = apply;
  apply(lang);
})();
