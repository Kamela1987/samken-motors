document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initVehicleTracker();
  renderVehiclesCatalog();
  renderDeliveredVehicles();
  renderPortWatch();
});

function initMobileNav() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
  });
}

function formatVehiclePrice(price, currency = '') {
  if (typeof price === 'number') {
    const formatted = price.toLocaleString('en-ZM');
    return `${currency}${formatted}`;
  }

  if (typeof price === 'string' && price.trim()) {
    return price.trim();
  }

  return 'Price on request';
}

function makeVehicleImageMarkup(car) {
  const imageList = Array.isArray(car.photos) && car.photos.length
    ? car.photos
    : car.photo
      ? [car.photo]
      : [];

  if (!imageList.length) {
    return `
      <div class="car-image-placeholder" aria-label="${car.title}">
        <span aria-hidden="true">🚗</span>
      </div>
    `;
  }

  const slides = imageList.map((src, i) => `
      <img src="${src}" alt="${car.title} - photo ${i + 1}" loading="${i === 0 ? 'eager' : 'lazy'}"
           class="car-vehicle-image car-slide${i === 0 ? ' active' : ''}"
           onload="this.classList.toggle('is-portrait', this.naturalHeight > this.naturalWidth * 0.95)"
           onerror="this.classList.add('img-broken')" />`).join('');

  const controls = imageList.length > 1 ? `
      <button type="button" class="slide-btn slide-prev" aria-label="Previous photo">&#8249;</button>
      <button type="button" class="slide-btn slide-next" aria-label="Next photo">&#8250;</button>` : '';

  return `
    <div class="car-image-frame car-slider" data-index="0" aria-label="${car.title}">
      ${slides}
      ${controls}
      <span class="image-badge"><span class="slide-count">1</span> / ${imageList.length}</span>
    </div>
  `;
}

function initVehicleSliders() {
  if (window.__slidersReady) return;
  window.__slidersReady = true;
  const grid = document;

  const move = (slider, step) => {
    const slides = slider.querySelectorAll('.car-slide');
    if (slides.length < 2) return;
    let index = parseInt(slider.dataset.index, 10) || 0;
    slides[index].classList.remove('active');
    index = (index + step + slides.length) % slides.length;
    slides[index].classList.add('active');
    slider.dataset.index = index;
    const counter = slider.querySelector('.slide-count');
    if (counter) counter.textContent = index + 1;
  };

  grid.addEventListener('click', (event) => {
    const btn = event.target.closest('.slide-btn');
    if (!btn) return;
    move(btn.closest('.car-slider'), btn.classList.contains('slide-next') ? 1 : -1);
  });

  let startX = null;
  grid.addEventListener('touchstart', (event) => {
    if (event.target.closest('.car-slider')) startX = event.touches[0].clientX;
  }, { passive: true });
  grid.addEventListener('touchend', (event) => {
    const slider = event.target.closest('.car-slider');
    if (!slider || startX === null) return;
    const diff = event.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 40) move(slider, diff < 0 ? 1 : -1);
    startX = null;
  });
}

function renderVehiclesCatalog() {
  const targetGrid = document.getElementById('vehicles-grid-target');
  if (!targetGrid || typeof vehicles === 'undefined') return;

  targetGrid.innerHTML = vehicles.map((car) => {
    const formattedPrice = formatVehiclePrice(car.price, car.currency || 'K');
    const features = Array.isArray(car.features) ? car.features : [];
    const whatsappUrl = car.whatsappLink || 'https://wa.me/260977882762';

    const specs = [
      car.status ? ['Status', car.status] : null,
      car.location ? ['Location', car.location] : null,
      car.fuel ? ['Fuel', car.fuel] : null,
      car.color ? ['Colour', car.color] : null
    ].filter(Boolean);

    const priceNote = car.basePriceWithoutAndroid
      ? `<p class="car-price-note">K${car.basePriceWithoutAndroid.toLocaleString('en-ZM')} without the Android music system</p>`
      : (typeof car.price === 'string'
          ? '<p class="car-price-note">Full landed price in one written quote (vehicle + transport + ZRA duty + clearing)</p>'
          : '');

    return `
      <article class="car-card">
        ${makeVehicleImageMarkup(car)}
        <div class="car-info">
          <span class="car-location-badge">${car.status || car.location || 'Sourced to Order'}</span>
          <h3>${car.title}</h3>
          <p class="car-price-tag">${formattedPrice}</p>
          ${priceNote}
          <ul class="car-specs">
            ${specs.map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`).join('')}
          </ul>
          <details class="car-details" open>
            <summary>Full details</summary>
            <ul class="car-features-list">
              ${features.map((feature) => `<li>${feature}</li>`).join('')}
            </ul>
          </details>
          <a href="${whatsappUrl}" target="_blank" rel="noopener" class="btn btn-whatsapp">
            💬 Ask About This Vehicle
          </a>
        </div>
      </article>
    `;
  }).join('');

  initVehicleSliders();
}

const deliveredVehicles = [
  {
    title: 'Honda Vezel',
    folder: 'delivered-honda-vezel-ndola',
    count: 4,
    note: 'Madam Mary&rsquo;s Honda Vezel, delivered safely to Ndola &mdash; about 1,750 km by road from Dar es Salaam. Want the same smooth handover? We can also register your car for you: <strong>white book and number plates included</strong>.'
  },
  {
    title: 'Toyota Mark X',
    folder: 'delivered-toyota-mark-x-valentine',
    count: 3,
    note: 'Delivered to a happy customer, Mr. Valentine, in Kawambwa &mdash; about 1,600 km by road from Dar es Salaam.'
  },
  { title: 'Mazda Demio', folder: 'delivered-mazda-demio-choma', count: 5, note: 'Delivered to a customer in Choma.' },
  { title: 'Toyota Wish', folder: 'delivered-toyota-wish-mongu', count: 3, note: 'Delivered to a customer in Mongu.' }
];

function renderDeliveredVehicles() {
  const target = document.getElementById('delivered-grid-target');
  if (!target) return;

  target.innerHTML = deliveredVehicles.map((item) => {
    const photos = Array.from({ length: item.count }, (_, i) => `images/${item.folder}-${i + 1}.jpg`);
    return `
      <article class="car-card card-tall">
        ${makeVehicleImageMarkup({ title: `${item.title} delivered to a customer`, photos })}
        <div class="car-info">
          <span class="car-location-badge">Delivered</span>
          <h3>${item.title}</h3>
          <p class="car-price-note">${item.note}</p>
        </div>
      </article>
    `;
  }).join('');

  initVehicleSliders();
}

function escapeHtml(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

function formatShortDate(value) {
  if (!value) return '';
  const d = new Date(value + 'T00:00:00');
  return isNaN(d) ? value : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

async function renderPortWatch() {
  const target = document.getElementById('vessel-list-target');
  if (!target) return;
  try {
    const res = await fetch('data/shipments.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error('bad response');
    const ships = await res.json();
    if (!Array.isArray(ships) || !ships.length) throw new Error('empty');
    target.innerHTML = ships.map((ship) => {
      const tone = ['offloading', 'offloaded'].includes(ship.status) ? 'status-green' : (ship.status === 'waiting' ? 'status-amber' : 'status-blue');
      const extras = [
        ship.arrived ? `Arrived: ${formatShortDate(ship.arrived)}` : '',
        ship.eta ? `ETA: ${formatShortDate(ship.eta)}` : '',
        ship.vehicles ? `${escapeHtml(ship.vehicles)} vehicles` : ''
      ].filter(Boolean).join(' &middot; ');
      return `
        <div class="vessel-item ${escapeHtml(ship.status)}">
          <div class="vessel-meta">
            <h4>${escapeHtml(ship.vessel)}</h4>
            <span class="badge ${tone}">${escapeHtml(ship.statusLabel)}</span>
          </div>
          <p>${escapeHtml(ship.route)}${extras ? '<br>' + extras : ''}</p>
        </div>`;
    }).join('');
  } catch (err) {
    target.innerHTML = '<p>Shipment status is not available right now. Message us on WhatsApp for the latest on your vehicle.</p>';
  }
}

function initVehicleTracker() {
  const trackerForm = document.getElementById('vessel-tracker-form');
  const inputField = document.getElementById('tracking-ref-code');
  const outputDisplay = document.getElementById('tracking-results-output');
  if (!trackerForm || !inputField || !outputDisplay) return;

  const show = (html) => { outputDisplay.style.display = 'block'; outputDisplay.innerHTML = html; };
  const notFound = (code) => `
    <div class="tracking-card-result error-state">
      <h4>Reference code not found</h4>
      <p>We could not find <strong>${escapeHtml(code)}</strong>. Check the code, or message us on WhatsApp (+260 977 882 762) to get your tracking reference.</p>
    </div>`;

  trackerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const code = inputField.value.trim().toUpperCase();
    if (!code) {
      show('<div class="tracking-card-result error-state"><h4>Reference required</h4><p>Please enter your reference code.</p></div>');
      return;
    }
    show('<div class="tracker-loading">Looking up your reference&hellip;</div>');

    try {
      const res = await fetch('data/tracking.json', { cache: 'no-cache' });
      if (!res.ok) throw new Error('bad response');
      const orders = await res.json();
      const order = orders.find((o) => String(o.ref).toUpperCase() === code);
      if (!order) { show(notFound(code)); return; }

      const done = order.stages.filter((st) => st.date).length;
      const percent = Math.round((done / order.stages.length) * 100);
      const stages = order.stages.map((st) => {
        const when = st.date ? formatShortDate(st.date) : (st.estimate ? 'Est. ' + formatShortDate(st.estimate) : 'Pending');
        return `<li class="${st.date ? 'stage-done' : 'stage-pending'}"><span>${escapeHtml(st.label)}</span><em>${escapeHtml(when)}</em></li>`;
      }).join('');

      show(`
        <div class="tracking-card-result success-state">
          <div class="result-header">
            <h4>Reference: <span class="highlight-code">${escapeHtml(order.ref)}</span></h4>
            <span class="status-pill">${percent}% complete</span>
          </div>
          <div class="progress-bar-container"><div class="progress-bar-fill" style="width:${percent}%"></div></div>
          <p><strong>Vehicle:</strong> ${escapeHtml(order.vehicle)}</p>
          <p><strong>Origin:</strong> ${escapeHtml(order.origin)}</p>
          <ul class="stage-list">${stages}</ul>
        </div>`);
    } catch (err) {
      show('<div class="tracking-card-result error-state"><h4>Tracking unavailable</h4><p>We could not load tracking data just now. Message us on WhatsApp (+260 977 882 762) for your update.</p></div>');
    }
  });
}
