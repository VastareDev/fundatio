function o(e) {
  const t = String(e), n = t.trim().toLowerCase();
  if (n.length === 0)
    throw new Error('Unsafe attribute "" is not allowed (empty attribute name).');
  if (n.startsWith("on"))
    throw new Error(
      `Unsafe attribute "${t}" is not allowed (event handler attributes are blocked).`
    );
  if (n === "style")
    throw new Error(
      'Unsafe attribute "style" is not allowed. Use the "style" object field instead.'
    );
}
function r(e, t, n) {
  o(t), e.setAttribute(t, String(n));
}
function s(e, t) {
  if (t) {
    if (t.id && (e.id = t.id), t.className && (e.className = t.className), t.title && (e.title = t.title), t.lang && (e.lang = t.lang), t.dir && (e.dir = t.dir), t.role && r(e, "role", t.role), typeof t.hidden == "boolean" && (e.hidden = t.hidden), typeof t.tabIndex == "number" && (e.tabIndex = t.tabIndex), typeof t.draggable == "boolean" && (e.draggable = t.draggable), typeof t.spellCheck == "boolean" && (e.spellcheck = t.spellCheck), t.translate && r(e, "translate", t.translate), t.contentEditable && (e.contentEditable = t.contentEditable), t.style && Object.assign(e.style, t.style), t.dataset)
      for (const [n, i] of Object.entries(t.dataset))
        e.dataset[n] = String(i);
    if (t.aria)
      for (const [n, i] of Object.entries(t.aria))
        r(e, `aria-${n}`, i);
    if (t.attrs)
      for (const [n, i] of Object.entries(t.attrs))
        r(e, n, i);
  }
}
function a(e, t, n) {
  const i = document.createElement(e);
  return s(i, t), typeof n == "string" && (i.textContent = n), i;
}
function f(e, t) {
  return a(e, t);
}
export {
  f as a,
  s as b,
  a as c
};
//# sourceMappingURL=dom.js.map
