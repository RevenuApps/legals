(function () {
  var params = new URLSearchParams(window.location.search);
  var requested = params.get('lang');
  var preferred = (navigator.language || '').toLowerCase().indexOf('ar') === 0 ? 'ar' : 'en';
  var lang = requested === 'ar' || requested === 'en' ? requested : preferred;

  function apply(l) {
    document.body.classList.toggle('show-en', l === 'en');
    document.documentElement.lang = l;
    document.documentElement.dir = l === 'en' ? 'ltr' : 'rtl';
    var ar = document.getElementById('btn-ar');
    var en = document.getElementById('btn-en');
    if (ar) ar.classList.toggle('active', l === 'ar');
    if (en) en.classList.toggle('active', l === 'en');
    document.querySelectorAll('a[data-page]').forEach(function (a) {
      a.setAttribute('href', a.getAttribute('data-page') + '?lang=' + l);
    });
  }

  window.setLang = apply;
  apply(lang);
})();
