var setLocale = function(locale) {
  if (locale) {
    $.i18n().locale = locale;
    $('body').i18n();

    localStorage.setItem('locale', locale);
  }
};

$(function() {
  $.i18n()
    .load({
      en: '/i18n/en.json',
      jp: '/i18n/jp.json'
    })
    .done(function() {
      var locale = localStorage.getItem('locale') || 'en';
      setLocale(locale);

      $('.switch-locale').on('click', function(e) {
        e.preventDefault();

        var locale = $(this).data('locale');
        setLocale(locale);
      });
    });
});
