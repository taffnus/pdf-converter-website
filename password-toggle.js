// Auge im Passwortfeld: schaltet zwischen type="password" und type="text".
// Greift automatisch jedes .pw-wrap auf der Seite ab, damit die Seiten
// selbst nichts verdrahten muessen und ein neues Feld nur Markup braucht.
(function () {
  var wraps = document.querySelectorAll(".pw-wrap");

  Array.prototype.forEach.call(wraps, function (wrap) {
    var input = wrap.querySelector("input");
    var btn = wrap.querySelector(".pw-toggle");
    if (!input || !btn) return;

    function apply(shown) {
      input.type = shown ? "text" : "password";
      btn.setAttribute("aria-pressed", shown ? "true" : "false");
      btn.setAttribute("aria-label", shown ? "Hide password" : "Show password");
    }

    // Immer verdeckt starten, egal was im Markup steht.
    apply(false);

    btn.addEventListener("click", function () {
      var shown = btn.getAttribute("aria-pressed") === "true";

      // Cursorposition merken: der Typwechsel setzt sie in einigen
      // Browsern ans Ende des Feldes.
      var start = input.selectionStart;
      var end = input.selectionEnd;

      apply(!shown);

      input.focus();
      try {
        input.setSelectionRange(start, end);
      } catch (e) {}
    });
  });
})();
