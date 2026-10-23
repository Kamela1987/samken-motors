document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initVehicleTracker();
  renderVehiclesCatalog();
  renderDeliveredVehicles();
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
  { title: 'Mazda Demio', place: 'Choma', folder: 'delivered-mazda-demio-choma', count: 5 },
  { title: 'Toyota Wish', place: 'Mongu', folder: 'delivered-toyota-wish-mongu', count: 3 }
];

function renderDeliveredVehicles() {
  const target = document.getElementById('delivered-grid-target');
  if (!target) return;

  target.innerHTML = deliveredVehicles.map((item) => {
    const photos = Array.from({ length: item.count }, (_, i) => `images/${item.folder}-${i + 1}.jpg`);
    return `
      <article class="car-card">
        ${makeVehicleImageMarkup({ title: `${item.title} delivered to a customer in ${item.place}`, photos })}
        <div class="car-info">
          <span class="car-location-badge">Delivered</span>
          <h3>${item.title}</h3>
          <p class="car-price-note">Delivered to a customer in ${item.place}</p>
        </div>
      </article>
    `;
  }).join('');

  initVehicleSliders();
}

function initVehicleTracker() {
  const trackerForm = document.getElementById('vessel-tracker-form');
  const inputField = document.getElementById('tracking-ref-code');
  const outputDisplay = document.getElementById('tracking-results-output');

  if (!trackerForm || !inputField || !outputDisplay) return;

  const mockTrackingDatabase = {
    'DEMO-001': {
      client: 'Mr. Valentine (Kawambwa)',
      status: 'In Transit - Border Clearance',
      currentLocation: 'Nakonde Border Post',
      lastUpdate: '23 Oct 2026 15:42 CAT',
      progress: 75,
      route: 'Dar es Salaam Port → Nakonde → Kawambwa',
      notes: 'Customs duty paid via Gwaliz Logistics. Vehicle clearing steps are completing. Driver assignment underway for the remaining 700km highway transit segment.'
    },
    'DEMO-002': {
      client: 'Mrs. Mwewa (Lusaka)',
      status: 'Port Release & Documentation',
      currentLocation: 'Dar es Salaam Port',
      lastUpdate: '24 Oct 2026 09:15 CAT',
      progress: 55,
      route: 'Dar es Salaam Port → Nakonde → Lusaka',
      notes: 'Documentation verification in progress. Release approval is being processed before the final road transfer leg.'
    }
  };

  trackerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const codeKey = inputField.value.trim().toUpperCase();

    if (!codeKey) {
      outputDisplay.style.display = 'block';
      outputDisplay.innerHTML = `
        <div class="tracking-card-result error-state">
          <h4>⚠️ Reference required</h4>
          <p>Please enter a valid reference code before searching the shipment registry.</p>
        </div>
      `;
      return;
    }

    outputDisplay.innerHTML = '<div class="tracker-loading">Searching tracking index registries...</div>';
    outputDisplay.style.display = 'block';

    setTimeout(() => {
      const data = mockTrackingDatabase[codeKey];

      if (data) {
        outputDisplay.innerHTML = `
          <div class="tracking-card-result success-state">
            <div class="result-header">
              <h4>Reference: <span class="highlight-code">${codeKey}</span></h4>
              <span class="status-pill">${data.status}</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill" style="width: ${data.progress}%"></div>
              <span class="progress-percentage-label">${data.progress}% Complete</span>
            </div>
            <div class="tracking-grid-details">
              <p><strong>Destination:</strong> ${data.client}</p>
              <p><strong>Current Site:</strong> <span class="text-alert">${data.currentLocation}</span></p>
              <p><strong>Route Grid:</strong> ${data.route}</p>
              <p><strong>Updated:</strong> ${data.lastUpdate}</p>
            </div>
            <div class="tracking-notes-block">
              <h5>Official Transit Dispatch Logs</h5>
              <p>${data.notes}</p>
            </div>
          </div>
        `;
      } else {
        outputDisplay.innerHTML = `
          <div class="tracking-card-result error-state">
            <h4>⚠️ Reference Code Not Found</h4>
            <p>The code <strong>"${codeKey}"</strong> does not match active vehicle manifests.</p>
            <p style="margin-top:0.5rem; color:#666;">Coordinate with dispatch teams via WhatsApp (+260 977 882 762) to activate your tracker profile.</p>
          </div>
        `;
      }
    }, 650);
  });
}
