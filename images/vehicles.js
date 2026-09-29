/* SamKen Motors - vehicles gallery
   HOW TO ADD A VEHICLE
   1. Upload the photos into the "images" folder in your repository.
   2. Add one block to the list below, ending with a comma.
   3. Commit the change. The site updates in a minute or two.
   Use photos:[...] for several pictures (a slider appears), or photo:"..." for a single picture.
*/
var VEHICLES = [
  { name:"Toyota Hilux 2.8 GD-6 Legend Double Cab", price:"K950,000", details:"Diesel, white. Chrome nudge bar and roll bar, tonneau cover, tow bar, side steps, all-terrain tyres.", photos:["images/hilux-1.jpg","images/hilux-2.jpg","images/hilux-7.jpg","images/hilux-5.jpg","images/hilux-4.jpg","images/hilux-6.jpg","images/hilux-3.jpg"] },

];

(function () {
  var WA = "260977882762";
  var css =
    "#vehicles{padding:4rem 0}" +
    ".veh-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.5rem;margin-top:2rem}" +
    ".veh-card{background:#fff;border:1px solid rgba(0,0,0,.1);border-radius:14px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 2px 10px rgba(0,0,0,.05)}" +
    ".veh-slider{position:relative;background:#e8e8e8;touch-action:pan-y}" +
    ".veh-slider img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block}" +
    ".veh-nav{position:absolute;top:50%;transform:translateY(-50%);width:38px;height:38px;border:0;border-radius:50%;background:rgba(0,0,0,.55);color:#fff;font-size:1.3rem;line-height:1;cursor:pointer}" +
    ".veh-nav:hover{background:rgba(0,0,0,.8)}" +
    ".veh-nav:focus-visible{outline:3px solid #fff;outline-offset:2px}" +
    ".veh-prev{left:8px}.veh-next{right:8px}" +
    ".veh-count{position:absolute;right:8px;bottom:8px;background:rgba(0,0,0,.6);color:#fff;font-size:.8rem;padding:.15rem .55rem;border-radius:99px}" +
    ".veh-body{padding:1rem 1.15rem 1.25rem;display:flex;flex-direction:column;gap:.4rem;flex:1}" +
    ".veh-body h3{margin:0;font-size:1.15rem}" +
    ".veh-price{font-weight:700;font-size:1.2rem}" +
    ".veh-body p{margin:0;color:var(--muted,#5b6472);font-size:.95rem}" +
    ".veh-body .btn{margin-top:auto;text-align:center;justify-content:center}" +
    ".veh-empty{color:var(--muted,#5b6472);max-width:36rem;margin-top:1.5rem}";
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  function slider(v) {
    var pics = v.photos || (v.photo ? [v.photo] : []);
    var box = el("div", "veh-slider");
    var img = el("img");
    img.alt = v.name;
    img.loading = "lazy";
    box.appendChild(img);
    var i = 0, count = el("span", "veh-count");
    function show(n) {
      i = (n + pics.length) % pics.length;
      img.src = pics[i];
      count.textContent = (i + 1) + " / " + pics.length;
    }
    if (pics.length) show(0);
    if (pics.length > 1) {
      var prev = el("button", "veh-nav veh-prev", "\u2039");
      var next = el("button", "veh-nav veh-next", "\u203A");
      prev.type = next.type = "button";
      prev.setAttribute("aria-label", "Previous photo");
      next.setAttribute("aria-label", "Next photo");
      prev.onclick = function () { show(i - 1); };
      next.onclick = function () { show(i + 1); };
      var x0 = null;
      box.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      box.addEventListener("touchend", function (e) {
        if (x0 === null) return;
        var dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 40) show(dx < 0 ? i + 1 : i - 1);
        x0 = null;
      });
      box.appendChild(prev); box.appendChild(next); box.appendChild(count);
    }
    return box;
  }

  var sec = el("section");
  sec.id = "vehicles";
  var wrap = el("div", "container");
  wrap.appendChild(el("h2", "section-title", "Vehicles Available"));
  wrap.appendChild(el("p", "section-sub", "A selection of vehicles we can supply. Message us for a written quote."));

  if (!VEHICLES.length) {
    wrap.appendChild(el("p", "veh-empty", "New stock is posted on our Facebook page. Message us on WhatsApp to ask what is available right now."));
  } else {
    var grid = el("div", "veh-grid");
    VEHICLES.forEach(function (v) {
      var card = el("article", "veh-card");
      var body = el("div", "veh-body");
      body.appendChild(el("h3", "", v.name));
      if (v.price) body.appendChild(el("span", "veh-price", v.price));
      if (v.details) body.appendChild(el("p", "", v.details));
      var a = el("a", "btn btn-primary btn-sm", "Ask about this vehicle");
      a.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent("Hello SamKen Motors, I am interested in the " + v.name + ".");
      a.target = "_blank";
      a.rel = "noopener";
      body.appendChild(a);
      card.appendChild(slider(v));
      card.appendChild(body);
      grid.appendChild(card);
    });
    wrap.appendChild(grid);
  }
  sec.appendChild(wrap);

  var about = document.getElementById("about");
  if (about && about.parentNode) about.parentNode.insertBefore(sec, about);

  var cta = document.querySelector("#nav .nav-cta");
  if (cta) {
    var link = document.createElement("a");
    link.href = "#vehicles";
    link.textContent = "Vehicles";
    cta.parentNode.insertBefore(link, cta);
  }
})();
