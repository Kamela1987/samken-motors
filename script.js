/* SamKen Motors - site scripts
   WHATSAPP NUMBERS: change them ONLY here (point 11).
   Every WhatsApp link on the page is rebuilt from these constants on load,
   so a number change is a one-line edit.
*/
const WHATSAPP = {
  primary: "260977882762",
  secondary: "260977863898",
};

document.getElementById("year").textContent = new Date().getFullYear();

/* Rebuild all WhatsApp links from the constants above */
document.querySelectorAll('a[href^="https://wa.me/"]').forEach(function (a) {
  var isSecondary = a.getAttribute("href").indexOf(WHATSAPP.secondary) !== -1;
  var text = "";
  var q = a.getAttribute("href").split("?text=")[1];
  if (q) text = "?text=" + q;
  a.href = "https://wa.me/" + (isSecondary ? WHATSAPP.secondary : WHATSAPP.primary) + text;
});

/* Mobile navigation */
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");
navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* Vehicle photo sliders (moved here from the retired vehicles.js) */
document.querySelectorAll(".veh-slider").forEach(function (box) {
  var pics = [];
  try { pics = JSON.parse(box.dataset.photos || "[]"); } catch (e) {}
  var img = box.querySelector("img");
  var count = box.querySelector(".veh-count");
  var i = 0;
  function show(n) {
    if (!pics.length || !img) return;
    i = (n + pics.length) % pics.length;
    img.src = pics[i];
    if (count) count.textContent = (i + 1) + " / " + pics.length;
  }
  show(0);
  var prev = box.querySelector(".veh-prev");
  var next = box.querySelector(".veh-next");
  if (prev) prev.addEventListener("click", function () { show(i - 1); });
  if (next) next.addEventListener("click", function () { show(i + 1); });
  var x0 = null;
  box.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  box.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) show(dx < 0 ? i + 1 : i - 1);
    x0 = null;
  });
});

/* Ships & shipments in transit */
(function () {
  var grid = document.getElementById("shipmentsGrid");
  if (!grid) return;

  function fmtDate(iso) {
    if (!iso) return "To be confirmed";
    var d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return iso;
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  }

  var originClass = { "south-africa": "ship-origin-sa", "namibia": "ship-origin-na", "tanzania": "ship-origin-tz" };

  fetch("data/shipments.json")
    .then(function (r) { return r.json(); })
    .then(function (shipments) {
      if (!shipments.length) {
        grid.innerHTML = '<p class="shipments-loading">No active shipments right now &mdash; check back soon.</p>';
        return;
      }
      grid.innerHTML = shipments.map(function (s) {
        return (
          '<article class="ship-card">' +
            '<div class="ship-card-top">' +
              '<span class="ship-icon ' + (originClass[s.origin] || "") + '" aria-hidden="true"><svg width="22" height="22"><use href="#icon-ship"/></svg></span>' +
              '<span class="ship-status ship-status-' + s.status + '">' + s.statusLabel + '</span>' +
            '</div>' +
            '<h3 class="ship-route">' + (s.vessel ? s.vessel + ' &mdash; ' : '') + s.route + '</h3>' +
            '<div class="ship-dates">' +
              '<span><strong>Departed</strong>' + fmtDate(s.departed) + '</span>' +
              '<span><strong>' + (s.status === "delivered" ? "Arrived" : "Est. Arrival") + '</strong>' + fmtDate(s.eta) + '</span>' +
            '</div>' +
            (s.vehicles ? '<span class="ship-vehicles">' + s.vehicles + ' vehicle' + (s.vehicles === 1 ? "" : "s") + ' aboard</span>' : '') +
          '</article>'
        );
      }).join("");
    })
    .catch(function () {
      grid.innerHTML = '<p class="shipments-loading">Couldn\'t load shipment status right now &mdash; please refresh.</p>';
    });
})();

/* Vehicle tracker */
(function () {
  var form = document.getElementById("trackForm");
  if (!form) return;
  var input = document.getElementById("trackInput");
  var result = document.getElementById("trackResult");
  var dataPromise = null;

  function loadData() {
    if (!dataPromise) {
      dataPromise = fetch("data/tracking.json").then(function (r) { return r.json(); });
    }
    return dataPromise;
  }

  function fmtDate(iso) {
    if (!iso) return "";
    var d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return iso;
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function render(order) {
    var firstPendingIndex = order.stages.findIndex(function (s) { return !s.date; });
    var rows = order.stages.map(function (stage, i) {
      var status = stage.date ? "done" : (i === firstPendingIndex ? "current" : "upcoming");
      var when = stage.date
        ? fmtDate(stage.date)
        : (status === "current" && stage.estimate ? "Estimated " + fmtDate(stage.estimate) : (status === "current" ? "In progress" : "Pending"));
      return (
        '<li class="track-step track-step-' + status + '">' +
          '<span class="track-step-dot" aria-hidden="true"></span>' +
          '<span class="track-step-body"><strong>' + escapeHtml(stage.label) + '</strong><span>' + escapeHtml(when) + '</span></span>' +
        '</li>'
      );
    }).join("");

    result.innerHTML =
      '<div class="track-card">' +
        '<p class="track-card-vehicle"><strong>' + escapeHtml(order.vehicle) + '</strong>' +
        (order.origin ? ' &middot; from ' + escapeHtml(order.origin) : '') + '</p>' +
        '<ul class="track-steps">' + rows + '</ul>' +
      '</div>';
    result.hidden = false;
  }

  function renderNotFound(ref) {
    result.innerHTML =
      '<div class="track-card track-card-empty">' +
        '<p>We couldn\'t find an order for code <strong>' + escapeHtml(ref) + '</strong>. Double-check the code we sent you, or ' +
        '<a href="https://wa.me/260977882762" target="_blank" rel="noopener">WhatsApp us</a> and we\'ll look it up.</p>' +
      '</div>';
    result.hidden = false;
  }

  function search(ref) {
    ref = (ref || "").trim().toUpperCase();
    if (!ref) return;
    loadData().then(function (orders) {
      var order = orders.find(function (o) { return o.ref.toUpperCase() === ref; });
      if (order) render(order); else renderNotFound(ref);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    search(input.value);
  });

  document.querySelectorAll(".track-demo-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      input.value = btn.dataset.demo;
      search(btn.dataset.demo);
    });
  });
})();
