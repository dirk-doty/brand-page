/* DOTY: the Meta Pixel for doty.media (dataset "Dad of the Year", 3008122299534568).
   PageView on every page that loads this file. ViewContent on the sales page. One Purchase per order on the thank-you page.
   The scorecard on ScoreApp carries the same Pixel and sends Lead and CompleteRegistration from there. */
(function () {
  if (window.fbq) return;
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
    t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '3008122299534568');
  fbq('track', 'PageView');
  var path = location.pathname.replace(/\/$/, '').replace(/\.html$/, '');
  if (path === '/deck' || path === '/deck-preview') fbq('track', 'ViewContent', { content_name: 'Dad Shift sales page' });
  if (path === '/thanks') {
    var p = new URLSearchParams(location.search).get('p');
    var order = p === 'phone-talk' ? { value: 19, content_name: 'The Phone Talk' }
      : p === 'both' ? { value: 39, content_name: 'Dad Shift and The Phone Talk' }
      : { value: 29, content_name: 'Dad Shift' };
    order.currency = 'USD';
    /* A reload of the thank-you page must not count as a second order. */
    /* Links we open to check the page carry review=1 and are not orders. */
    if (/[?&]review=1(&|$)/.test(location.search)) return;
    var key = 'doty_fb_purchase_' + (p || 'deck');
    try { if (sessionStorage.getItem(key)) return; sessionStorage.setItem(key, '1'); } catch (e) {}
    fbq('track', 'Purchase', order);
  }
})();
