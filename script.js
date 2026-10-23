document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initVehicleTracker();
  renderVehiclesCatalog();
});

function initMobileNav() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('toggle-open');
    });
  }
}

function initVehicleTracker() {
  const trackerForm = document.getElementById('vessel-tracker-form');
  const inputField = document.getElementById('tracking-ref-code');
  const outputDisplay = document.getElementById('tracking-results-output');

  if (!trackerForm || !inputField || !outputDisplay) return;

  const mockTrackingDatabase = {
    "DEMO-001": {
      client: "Mr. Valentine (Kawambwa)",
      status: "In Transit - Border Clearance",
      currentLocation: "Nakonde Border Post",
      lastUpdate: "23 Oct 2026 15:42 CAT",
      progress: 75,
      route: "Dar es Salaam Port → Nakonde → Kawambwa",
      notes: "Customs duty paid via Gwaliz Logistics. Vehicle clearing steps are completing. Driver assignment underway for the remaining 700km highway transit segment."
    }
  };

  trackerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const codeKey = inputField.value.trim().toUpperCase();
    
    outputDisplay.innerHTML = `<div class="tracker-loading">Searching tracking index registries...</div>`;
    outputDisplay.style.display = "block";

    setTimeout(() => {
      if (mockTrackingDatabase[codeKey]) {
        const data = mockTrackingDatabase[codeKey];
        outputDisplay.innerHTML = `
          <div class="tracking-card-result success-state">
            <div class="result-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
              <h4 style="margin:0;">Reference: <span class="highlight-code" style="color:var(--gold-primary); background:#1e293b; padding:0.2rem 0.5rem; border-radius:4px;">${codeKey}</span></h4>
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
              <h5>Official Transit Dispatch Logs:</h5>
              <p>${data.notes}</p>
            </div>
          </div>
        `;
      } else {
        outputDisplay.innerHTML = `
          <div class="tracking-card-result error-state">
            <h4>⚠️ Reference Code Not Found</h4>
            <p>The code <strong>"${codeKey}"</strong> does not match active vehicle manifests.</p>
            <p style="font-size:0.85rem; margin-top:0.5rem; color:#666;">Coordinate with dispatch teams via WhatsApp (+260 977 882 762) to activate your tracker profile.</p>
          </div>
        `;
      }
    }, 650);
  });
}

function renderVehiclesCatalog() {
  const targetGrid = document.getElementById('vehicles-grid-target');
  if (!targetGrid || typeof vehicles === 'undefined') return;

  targetGrid.innerHTML = vehicles.map(car => {
    const formattedPrice = typeof car.price === 'number' 
      ? `${car.currency}${car.price.toLocaleString()}` 
      : car.price;

    return `
      <article class="car-card">
        <div class="car-image-placeholder">
          <span class="car-icon">🚗</span>
          <span class="image-badge">${car.imagesCount} Photos</span>
        </div>
        <div class="car-info">
          <span class="car-location-badge">${car.location}</span>
          <h3>${car.title}</h3>
          <p class="car-price-tag">${formattedPrice}</p>
          <ul class="car-features-list">
            ${car.features.slice(0, 4).map(f => `<li>✓ ${f}</li>`).join('')}
          </ul>
          <a href="${car.whatsappLink}" target="_blank" class="btn btn-whatsapp">
            💬 Ask About This Vehicle
          </a>
        </div>
      </article>
    `;
  }).join('');
}
