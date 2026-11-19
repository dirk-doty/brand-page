/* Edit mode for the sales page preview. Loads only when this browser has asked for it
   (localStorage dotyEdit = 1, or the address ends in #edit). Edits stay in this browser
   (localStorage dotySalesEdits and dotySalesNotes) until they are put into the page source. */
(function () {
  if (window.__dotyEdit) return;
  window.__dotyEdit = true;
  var KEY = 'dotySalesEdits', NKEY = 'dotySalesNotes';
  try { localStorage.setItem('dotyEdit', '1'); } catch (e) {}
  function load(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  function store(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }
  var edits = load(KEY, {}), notes = load(NKEY, '');
  function norm(s) { return String(s || '').replace(/\s+/g, ' ').trim(); }
  function ownText(el) {
    for (var n = el.firstChild; n; n = n.nextSibling) {
      if (n.nodeType === 3 && n.nodeValue.replace(/\s+/g, '') !== '') return true;
    }
    return false;
  }

  var css = document.createElement('style');
  css.setAttribute('data-doty-ui', '');
  css.textContent =
    '[data-eid]{outline:2px dashed transparent;outline-offset:3px;cursor:text;transition:outline-color .12s}' +
    '[data-eid]:hover{outline-color:rgba(255,107,1,.6)}' +
    '[data-eid]:focus{outline:2px solid #FF6B01}' +
    '[data-eid].doty-edited{outline:2px dotted #FF6B01}' +
    '#doty-bar{position:fixed;left:0;right:0;bottom:0;z-index:2147483647;background:#022822;color:#F5F6E1;border-top:4px solid #FFB413;' +
    'font:500 14px/1.3 Inter,system-ui,sans-serif;display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px;padding:10px 16px}' +
    '#doty-bar b{font-weight:600;color:#FFB413}' +
    '#doty-bar button{font:600 13px Inter,system-ui,sans-serif;color:#022822;background:#FFB413;border:0;padding:8px 14px;cursor:pointer}' +
    '#doty-bar button.ghost{background:transparent;color:#F5F6E1;border:1px solid rgba(245,246,225,.45)}' +
    '#doty-bar button[disabled]{opacity:.4;cursor:default}' +
    '#doty-bar .sp{flex:1}' +
    '#doty-notes{display:none;flex-basis:100%;width:100%;min-height:92px;box-sizing:border-box;font:400 15px/1.5 Inter,system-ui,sans-serif;' +
    'color:#022822;background:#F5F6E1;border:0;padding:10px 12px;resize:vertical}' +
    '#doty-bar.open #doty-notes{display:block}';
  document.head.appendChild(css);

  var list = [];
  var all = document.body.querySelectorAll('*');
  for (var k = 0; k < all.length; k++) {
    var el = all[k], tag = el.tagName.toUpperCase();
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || tag === 'TEXTAREA' || tag === 'INPUT') continue;
    if (el.closest('svg,[data-doty-ui],[data-eid]')) continue;
    if (!ownText(el)) continue;
    el.setAttribute('data-eid', String(list.length));
    el.__orig = norm(el.textContent);
    el.__origHTML = el.innerHTML;
    el.setAttribute('contenteditable', 'plaintext-only');
    if (el.contentEditable !== 'plaintext-only') el.setAttribute('contenteditable', 'true');
    el.setAttribute('spellcheck', 'true');
    list.push(el);
  }
  Object.keys(edits).forEach(function (id) {
    var el = list[+id], e = edits[id];
    if (el && e && e.o === el.__orig && typeof e.h === 'string') { el.innerHTML = e.h; el.classList.add('doty-edited'); }
  });

  var bar = document.createElement('div');
  bar.id = 'doty-bar';
  bar.setAttribute('data-doty-ui', '');
  bar.innerHTML = '<b>Edit mode</b><span>Click any words and type.</span><span id="doty-count"></span><span id="doty-saved"></span>' +
    '<span class="sp"></span><button type="button" class="ghost" id="doty-undo" disabled>Put this line back</button>' +
    '<button type="button" id="doty-note-btn">Add a note</button>' +
    '<textarea id="doty-notes" placeholder="Notes for anything you can\'t type on the page"></textarea>';
  document.body.appendChild(bar);
  document.body.style.paddingBottom = '64px';
  var countEl = bar.querySelector('#doty-count'), savedEl = bar.querySelector('#doty-saved'),
      undoBtn = bar.querySelector('#doty-undo'), noteBtn = bar.querySelector('#doty-note-btn'), notesEl = bar.querySelector('#doty-notes');
  notesEl.value = notes;
  var last = null, timer = null;

  function count() {
    var n = Object.keys(edits).length;
    countEl.textContent = n + (n === 1 ? ' edit' : ' edits') + (norm(notesEl.value) ? ' and a note' : '');
    noteBtn.textContent = bar.classList.contains('open') ? 'Hide the note' : (norm(notesEl.value) ? 'Open the note' : 'Add a note');
  }
  function flash(ok) { savedEl.textContent = ok ? 'Saved' : 'Not saved. Tell me in chat.'; }
  function saveEl(el) {
    var id = el.getAttribute('data-eid'), now = norm(el.textContent);
    if (now === el.__orig) { delete edits[id]; el.classList.remove('doty-edited'); }
    else { edits[id] = { o: el.__orig, t: now, h: el.innerHTML }; el.classList.add('doty-edited'); }
    flash(store(KEY, edits)); count();
    undoBtn.disabled = !(last && edits[last.getAttribute('data-eid')]);
  }
  document.addEventListener('input', function (ev) {
    var t = ev.target;
    if (t === notesEl) { clearTimeout(timer); savedEl.textContent = ''; timer = setTimeout(function () { flash(store(NKEY, notesEl.value)); count(); }, 400); return; }
    var el = t.closest && t.closest('[data-eid]');
    if (el) saveEl(el);
  }, true);
  document.addEventListener('focusin', function (ev) {
    var el = ev.target.closest && ev.target.closest('[data-eid]');
    if (el) { last = el; undoBtn.disabled = !edits[el.getAttribute('data-eid')]; }
  }, true);
  document.addEventListener('keydown', function (ev) {
    var el = ev.target.closest && ev.target.closest('[data-eid]');
    if (el && ev.key === 'Enter') { ev.preventDefault(); el.blur(); }
  }, true);
  document.addEventListener('click', function (ev) {
    if (ev.target.closest && ev.target.closest('[data-doty-ui]')) return;
    var a = ev.target.closest && ev.target.closest('a[href]');
    if (a) ev.preventDefault();
  }, true);
  undoBtn.addEventListener('mousedown', function (ev) { ev.preventDefault(); });
  undoBtn.addEventListener('click', function () {
    if (!last) return;
    last.innerHTML = last.__origHTML; saveEl(last);
  });
  noteBtn.addEventListener('click', function () { bar.classList.toggle('open'); count(); if (bar.classList.contains('open')) notesEl.focus(); });
  window.__dotyEdits = function () { return { edits: edits, notes: notesEl.value, blocks: list.length }; };
  count();
})();
