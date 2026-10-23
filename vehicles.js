document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initVehicleTracker();
  renderVehiclesCatalog();
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
    : Array.isArray(car.photo)
      ? car.photo
      : car.photo
        ? [car.photo]
        : [];

  if (!imageList.length) {
    return `
      <div class="car-image-placeholder" aria-label="${car.title}">
        <span aria-hidden="true">🚗</span>
        <span class="image-badge">1 Photo</span>
      </div>
    `;
  }

  const primaryImage = imageList[0];
  const badgeText = imageList.length > 1 ? `${imageList.length} Photos` : '1 Photo';

  return `
    <div class="car-image-frame" aria-label="${car.title}">
      <img src="${primaryImage}" alt="${car.title}" loading="lazy" class="car-vehicle-image" />
      <span class="image-badge">${badgeText}</span>
    </div>
  `;
}

function renderVehiclesCatalog() {
  const targetGrid = document.getElementById('vehicles-grid-target');
  if (!targetGrid || typeof vehicles === 'undefined') return;

  targetGrid.innerHTML = vehicles.map((car) => {
    const formattedPrice = formatVehiclePrice(car.price, car.currency || 'K');
    const features = Array.isArray(car.features) ? car.features.slice(0, 4) : [];
    const whatsappUrl = car.whatsappLink || 'https://wa.me/260977882762';

    return `
      <article class="car-card">
        ${makeVehicleImageMarkup(car)}
        <div class="car-info">
          <span class="car-location-badge">${car.location || 'Sourced to Order'}</span>
          <h3>${car.title}</h3>
          <p class="car-price-tag">${formattedPrice}</p>
          <ul class="car-features-list">
            ${features.map((feature) => `<li>${feature}</li>`).join('')}
          </ul>
          <a href="${whatsappUrl}" target="_blank" rel="noopener" class="btn btn-whatsapp">
            💬 Ask About This Vehicle
          </a>
        </div>
      </article>
    `;
  }).join('');
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

