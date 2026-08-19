// Reveal on scroll
(function () {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });

  // Mobile nav
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open'); burger.classList.remove('open');
      });
    });
  }

  // Quote form -> mailto handoff (no backend required)
  var form = document.getElementById('quoteform');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = Object.fromEntries(new FormData(form).entries());
      if (d.rcs_website) return; // honeypot
      var to = form.getAttribute('data-to') || '';
      var subject = 'Estimate request — ' + (d.service || 'General') + ' — ' + (d.name || '');
      var body =
        'Name: ' + (d.name || '') + '\n' +
        'Phone: ' + (d.phone || '') + '\n' +
        'Email: ' + (d.email || '') + '\n' +
        'Project location: ' + (d.location || '') + '\n' +
        'Service needed: ' + (d.service || '') + '\n\n' +
        'Details:\n' + (d.message || '');
      window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      form.innerHTML = '<div class="formok">Thanks — your email app should open with the request ready to send.<br>If it did not, call us directly and we will take the details over the phone.</div>';
    });
  }

  // Footer year
  var y = document.getElementById('yr');
  if (y) y.textContent = new Date().getFullYear();
})();
