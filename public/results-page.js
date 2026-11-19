/* DOTY: the Dad Score results page (ScoreApp) as one sales page.
   Loaded by a one line script in ScoreApp > results page > Page Settings.
   Dirk, 19 Nov 2026: the results page IS the sales page for dads who take the scorecard.
   Order: the result and the recommendation (ScoreApp's own sections), three referral spots, the row of options.
   If this file fails to load, ScoreApp's own page still works (one button to doty.media/deck, one to doty.media/share).
   Copy is approved copy, word for word: voice/copy16/v3/share.txt, the sales page tiles, the refund line of 19 Nov. */
(function () {
  if (window.__dotyResults) return;
  window.__dotyResults = true;

  var MSG = 'I took this dad scorecard. Tell me what you get. doty.media/whatsyourdadscore';
  var SMS = 'sms:?&body=' + encodeURIComponent(MSG);
  var LINKS = {
    ds: 'https://buy.stripe.com/00w3cxdBAbWN4BlbIles00a',
    pt: 'https://buy.stripe.com/28E9AV7dcaSJ8RB6o1es001',
    both: 'https://buy.stripe.com/dRm7sNcxwf8Z4BlcMpes00b'
  };
  var L = { spot: ['Text dad 1', 'Text dad 2', 'Text dad 3'], sent: 'Sent', more: 'See what’s inside' };

  var CSS = '' +
    '.doty-hide{display:none !important}' +
    '.doty-spots{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;max-width:640px;margin:22px auto 0}' +
    '.doty-spot{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;min-height:96px;padding:14px 10px;background:#fff;border:2px solid #022822;color:#022822 !important;text-decoration:none !important;font:600 16px/1.2 Inter,system-ui,sans-serif;cursor:pointer;text-align:center}' +
    '.doty-spot b{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;background:#FFB413;color:#022822;font:700 16px/1 "Libre Baskerville",Georgia,serif}' +
    '.doty-spot.is-sent{background:#BFF3D3;border-color:#006C4C}' +
    '.doty-spot.is-sent b{background:#006C4C;color:#fff}' +
    '.doty-copied{min-height:20px;margin:10px auto 0;text-align:center;font:500 14px/1.4 Inter,system-ui,sans-serif;color:#022822}' +
    '.doty-gift{margin:18px auto 0;text-align:center}' +
    '.doty-gift p{margin:0 0 12px;font:700 20px/1.3 "Libre Baskerville",Georgia,serif;color:#022822}' +
    '.doty-btn{display:inline-block;background:#FF6B01;color:#fff !important;text-decoration:none !important;font:600 16px/1 Inter,system-ui,sans-serif;padding:16px 22px}' +
    '.doty-buy{background:#022822;color:#F5F6E1;padding:64px 20px 56px;font-family:Inter,system-ui,sans-serif}' +
    '.doty-buy-in{max-width:1056px;margin:0 auto;display:flex;flex-direction:column;gap:26px}' +
    '.doty-badge{width:112px;height:112px;border-radius:50%;border:2px solid #FFB413;color:#FFB413;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;align-self:center}' +
    '.doty-badge b{font:700 30px/1 "Libre Baskerville",Georgia,serif}' +
    '.doty-badge span{font:500 9px/1.5 Inter,system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;text-align:center}' +
    '.doty-buy h2{margin:0;text-align:center;color:#F5F6E1;font:700 clamp(30px,5vw,50px)/1.12 "Libre Baskerville",Georgia,serif}' +
    '.doty-buy h2 em{color:#FFB413;font-style:italic}' +
    '.doty-tiles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}' +
    '.doty-tile{display:flex;flex-direction:column;gap:10px;padding:26px;background:#F5F6E1;color:#022822 !important;text-decoration:none !important}' +
    '.doty-tile.is-feature{background:#BFF3D3}' +
    '.doty-tile.is-best{background:#FFB413}' +
    '.doty-tag{font:500 11px/1 Inter,system-ui,sans-serif;letter-spacing:.2em;text-transform:uppercase}' +
    '.doty-name{font:700 24px/1.2 "Libre Baskerville",Georgia,serif}' +
    '.doty-price{font:400 30px/1.1 "Libre Baskerville",Georgia,serif}' +
    '.doty-price s{opacity:.55;font-size:22px}' +
    '.doty-line{font-size:15px;line-height:1.5;flex:1}' +
    '.doty-go{background:#FF6B01;color:#fff;font-weight:600;font-size:16px;padding:14px 18px;text-align:center}' +
    '.doty-refund{margin:0;text-align:center;font-size:13px;line-height:1.5;color:rgba(245,246,225,.72)}' +
    '.doty-more{margin:0;text-align:center;font-size:15px}' +
    '.doty-more a{color:#FFB413 !important;font-weight:600}' +
    '@media (max-width:820px){.doty-tiles{grid-template-columns:1fr}.doty-buy{padding:48px 16px 44px}}' +
    '@media (max-width:480px){.doty-spots{gap:8px}.doty-spot{min-height:88px;font-size:14px;padding:12px 6px}}';

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function track(name, data) { try { if (window.fbq) window.fbq('track', name, data || {}); } catch (e) {} }

  function tile(cls, href, tag, name, price, line, go) {
    return '<a class="doty-tile ' + cls + '" href="' + href + '">' + (tag ? '<div class="doty-tag">' + tag + '</div>' : '') +
      '<div class="doty-name">' + name + '</div><div class="doty-price">' + price + '</div><div class="doty-line">' + line + '</div><div class="doty-go">' + go + '</div></a>';
  }

  function build(share, cta) {
    var style = el('style'); style.setAttribute('data-doty', ''); style.textContent = CSS; document.head.appendChild(style);

    /* 1. The recommendation stays. Its button and refund line move down to the tiles. */
    if (cta) {
      var hide = cta.querySelectorAll('.cta-button-wrapper, .cta-text-block-additional');
      for (var i = 0; i < hide.length; i++) hide[i].classList.add('doty-hide');
    }

    /* 2. Three referral spots, in place of the one button to the share page. */
    var block = share.querySelector('.content7-text-block') || share;
    var old = block.querySelectorAll('a[href*="doty.media/share"]');
    for (var j = 0; j < old.length; j++) (old[j].closest('p') || old[j]).classList.add('doty-hide');
    var isPhone = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    var sent = [];
    try { sent = JSON.parse(get('doty-spots') || '[]') || []; } catch (e) { sent = []; }
    var spots = el('div', 'doty-spots'), copied = el('div', 'doty-copied'),
        gift = el('div', 'doty-gift', '<p>Thank you! Here’s your gift.</p><a class="doty-btn" href="https://doty.media/downloads/DOTY_52-Saturday-Mornings_Playbook.pdf" target="_blank" rel="noopener">Open 52 Saturday Mornings</a>');
    copied.setAttribute('aria-live', 'polite');
    function count() { var n = 0; for (var k = 0; k < 3; k++) if (sent[k]) n++; return n; }
    function paint() {
      var kids = spots.children;
      for (var k = 0; k < kids.length; k++) {
        kids[k].classList.toggle('is-sent', !!sent[k]);
        kids[k].querySelector('span').textContent = sent[k] ? L.sent : L.spot[k];
        kids[k].querySelector('b').textContent = sent[k] ? '✓' : String(k + 1);
      }
      gift.hidden = !(count() >= 3 || get('doty-shared') === '1');
    }
    for (var s = 0; s < 3; s++) (function (n) {
      var a = el('a', 'doty-spot', '<b></b><span></span>'); a.href = SMS;
      a.addEventListener('click', function (ev) {
        if (!isPhone) {
          ev.preventDefault();
          var done = function () { copied.textContent = 'Copied. Paste it into a text to three dads.'; };
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(MSG).then(done, function () { copied.textContent = MSG; });
          else copied.textContent = MSG;
        }
        setTimeout(function () {
          sent[n] = 1; set('doty-spots', JSON.stringify(sent));
          if (count() >= 3) { set('doty-shared', '1'); track('Share3'); }
          paint();
        }, isPhone ? 1200 : 300);
      });
      spots.appendChild(a);
    })(s);
    block.appendChild(spots); block.appendChild(copied); block.appendChild(gift);
    paint();

    /* 3. The row of options: the three tiles from the sales page, straight to checkout. */
    var buy = el('div', 'doty-buy',
      '<div class="doty-buy-in">' +
      '<div class="doty-badge"><b>30</b><span>day<br>guarantee</span></div>' +
      '<h2>Your kids are watching. <em>Be the one they count on.</em></h2>' +
      '<div class="doty-tiles">' +
      tile('is-feature', LINKS.ds, '', 'Dad Shift', '$29', 'The twelve toughest moments with your kids, and how to handle each one.', 'Get Dad Shift') +
      tile('', LINKS.pt, '', 'The Phone Talk', '$19', 'What to say when your kid gets a phone, and the rules that keep the peace.', 'Get The Phone Talk') +
      tile('is-best', LINKS.both, 'Best value', 'Dad Shift + The Phone Talk', '<s>$48</s> $39', 'For the hardest moments at home, and the day before they get their first phone.', 'Get both') +
      '</div>' +
      '<p class="doty-refund">If you want your money back within 30 days, for any reason, we’ll refund you. We only want to keep your money if you’re happy.</p>' +
      '<p class="doty-more"><a href="https://doty.media/deck">' + L.more + '</a></p>' +
      '</div>');
    buy.addEventListener('click', function (ev) {
      var t = ev.target.closest && ev.target.closest('a.doty-tile');
      if (t) track('InitiateCheckout', { content_name: t.querySelector('.doty-name').textContent });
    });
    var host = share.closest('.section') || share.closest('[class*="section-content"]') || share;
    host.parentNode.insertBefore(buy, host.nextSibling);
  }

  var tries = 0;
  (function wait() {
    var share = document.querySelector('.content7'), cta = document.querySelector('.cta1');
    if (share) { try { build(share, cta); } catch (e) { window.__dotyResultsError = String(e); } return; }
    if (++tries < 100) setTimeout(wait, 150);
  })();
})();
