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
