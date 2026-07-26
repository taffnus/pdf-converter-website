// Theme-Schalter: legt "light" oder "dark" in localStorage ab und
// ueberschreibt damit die Systemeinstellung. Ohne Eintrag folgt die
// Seite weiter prefers-color-scheme (siehe FOUC-Snippet im <head>).
(function () {
  var STORAGE_KEY = "pixelpdf-theme";
  var btn = document.getElementById("theme-toggle");
  if (!btn) return;

  var media = window.matchMedia("(prefers-color-scheme: dark)");

  function storedTheme() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      return v === "light" || v === "dark" ? v : null;
    } catch (e) {
      return null;
    }
  }

  function effectiveTheme() {
    return storedTheme() || (media.matches ? "dark" : "light");
  }

  function updateButton() {
    var isDark = effectiveTheme() === "dark";
    btn.setAttribute("aria-pressed", String(isDark));
    btn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  }

  btn.addEventListener("click", function () {
    var next = effectiveTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {}
    updateButton();
  });

  media.addEventListener("change", function () {
    if (!storedTheme()) updateButton();
  });

  updateButton();
})();
