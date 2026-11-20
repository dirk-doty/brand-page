/* DOTY: PostHog funnel tracking for doty.media (project 729651, US cloud).
   The token below is PostHog's public, write-only project key. It is meant to sit in page code.
   What it records: page views, how far a dad scrolls, clicks, heatmaps, and these funnel steps:
     scorecard finished   (results page, fresh arrival from ScoreApp)
     offer seen           (the order box scrolls into view)
     bundle box ticked    (Add The Phone Talk)
     checkout started     (card form opened or Stripe button pressed)
     order placed         (thank you page, once per order)
     share seen / share sent (the share card)
     buddy landed         (doty.media/from-a-dad)
   It mirrors the Meta Pixel steps from px.js, so the two tell the same story.
   Our own checks stay out: a link with review=1 or internal=1 marks this browser as ours and stops tracking in it.
   Recordings hide everything typed into a field (emails, card details). */
(function () {
  if (window.__dotyPH) return; window.__dotyPH = 1;
  var q = location.search;
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  if (/[?&](review|internal)=1(&|$)/.test(q)) set('doty-internal', '1');
  if (/[?&]internal=0(&|$)/.test(q)) set('doty-internal', '0');
  if (get('doty-internal') === '1') return;

  !function (t, e) { var o, n, p, r; e.__SV || (window.posthog = e, e._i = [], e.init = function (i, s, a) { function g(t, e) { var o = e.split("."); 2 == o.length && (t = t[o[0]], e = o[1]), t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } } (p = t.createElement("script")).type = "text/javascript", p.crossOrigin = "anonymous", p.async = !0, p.src = s.api_host.replace(".i.posthog.com", "-assets.i.posthog.com") + "/static/array.js", (r = t.getElementsByTagName("script")[0]).parentNode.insertBefore(p, r); var u = e; for (void 0 !== a ? u = e[a] = [] : a = "posthog", u.people = u.people || [], u.toString = function (t) { var e = "posthog"; return "posthog" !== a && (e += "." + a), t || (e += " (stub)"), e }, u.people.toString = function () { return u.toString(1) + ".people (stub)" }, o = "init capture register register_once unregister identify alias set_config opt_out_capturing opt_in_capturing reset get_distinct_id getFeatureFlag isFeatureEnabled onFeatureFlags startSessionRecording stopSessionRecording".split(" "), n = 0; n < o.length; n++)g(u, o[n]); e._i.push([i, s, a]) }, e.__SV = 1) }(document, window.posthog || []);

  posthog.init('phc_qeC7PYss9kHbCMykk3vGt2mqAx3MoRFgrh6iHhyVCQjC', {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: true,
    capture_pageleave: true,
    enable_heatmaps: true,
    session_recording: { maskAllInputs: true }
  });

  var path = location.pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/';
  function cap(name, props) { try { posthog.capture(name, props || {}); } catch (e) {} }

  /* The dad's score rides along on every event from the results page (no name or email). */
  if (path === '/your-score') {
    try {
      var sc = JSON.parse(sessionStorage.getItem('doty-score') || 'null');
      if (sc && sc.t != null) posthog.register({ dad_score: sc.t, score_band: sc.t >= 85 ? 'top' : sc.t >= 61 ? 'mid' : 'low', fuse: sc.f, time: sc.m, corner: sc.c });
    } catch (e) {}
  }
  if (path === '/from-a-dad') cap('buddy landed');

  /* Mirror the Pixel's funnel steps. px.js already skips reloads and review links for Purchase. */
  var NAMES = { CompleteRegistration: 'scorecard finished', InitiateCheckout: 'checkout started', Purchase: 'order placed' };
  function mirror(t) {
    if (!t || t.__ph || typeof Proxy !== 'function') return t;
    var p = new Proxy(t, { apply: function (fn, self, args) {
      try { if (args[0] === 'track' && NAMES[args[1]]) cap(NAMES[args[1]], args[2] || {}); } catch (e) {}
      return Reflect.apply(fn, self, args);
    } });
    try { t.__ph = 1; } catch (e) {}
    return p;
  }
  /* ph.js loads before px.js, so catch fbq the moment px.js creates it. */
  if (window.fbq) window.fbq = mirror(window.fbq);
  else {
    try {
      var cur;
      Object.defineProperty(window, 'fbq', { configurable: true, enumerable: true,
        get: function () { return cur; }, set: function (v) { cur = mirror(v); } });
    } catch (e) {}
  }

  /* Sections seen, the bundle box and the share button. */
  function seen(id, name) {
    var el = document.getElementById(id); if (!el || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { cap(name); io.disconnect(); } }); }, { threshold: 0.35 });
    io.observe(el);
  }
  function ready() {
    seen('buy', 'offer seen');
    seen('share', 'share seen');
    var b = document.getElementById('bump');
    if (b) b.addEventListener('change', function () { cap(b.checked ? 'bundle box ticked' : 'bundle box unticked'); });
    var f = document.getElementById('shareform');
    if (f) f.addEventListener('submit', function () {
      var n = 0; f.querySelectorAll('input[type=email]').forEach(function (i) { if (/@/.test(i.value)) n++; });
      cap('share sent', { emails_filled: n });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready); else ready();
})();
