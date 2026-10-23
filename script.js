/* Global Brand Stylesheet for SamKen Motors */
:root {
  --navy-dark: #0b1329;
  --navy-primary: #1c2541;
  --navy-light: #3a506b;
  --gold-primary: #e5a93b;
  --gold-light: #f4d35e;
  --text-dark: #1e293b;
  --text-light: #f8fafc;
  --muted: #64748b;
  --white: #ffffff;
  --bg-soft: #f5f7fb;
  --bg-cream: #f8f4ee;
  --shadow-soft: 0 20px 45px rgba(15, 23, 42, 0.08);
  --shadow-card: 0 20px 40px rgba(15, 23, 42, 0.08);
  --radius-lg: 22px;
  --radius-md: 16px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background: linear-gradient(180deg, #f9f7f3 0%, #f2f6fb 100%);
  color: var(--text-dark);
  line-height: 1.6;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

a {
  color: inherit;
}

img {
  max-width: 100%;
  display: block;
}

.container {
  width: min(1200px, calc(100% - 2rem));
  margin: 0 auto;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(11, 19, 41, 0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 12px 30px rgba(11, 19, 41, 0.12);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 76px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  color: var(--gold-light);
  font-weight: 800;
  letter-spacing: 0.02em;
}

.brand-logo {
  display: inline-flex;
  width: 38px;
  height: 38px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(229, 169, 59, 0.14);
  font-size: 1.4rem;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06);
}

.brand-name {
  font-size: 1.1rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.4rem;
}

.nav-links a {
  color: var(--text-light);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  opacity: 0.9;
  transition: color 0.2s ease, opacity 0.2s ease;
}

.nav-links a:hover,
.nav-links a:focus-visible {
  color: var(--gold-primary);
  opacity: 1;
}

.nav-toggle-btn {
  display: none;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 10px;
  padding: 0.55rem 0.6rem;
  cursor: pointer;
  flex-direction: column;
  gap: 0.28rem;
}

.nav-toggle-btn span {
  width: 22px;
  height: 2.5px;
  background: var(--white);
  border-radius: 999px;
}

.hero-section {
  background:
    linear-gradient(135deg, rgba(11, 19, 41, 0.96), rgba(28, 37, 65, 0.94)),
    radial-gradient(circle at top right, rgba(229, 169, 59, 0.18), transparent 35%);
  color: var(--text-light);
  padding: 5rem 0 4rem;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(229,169,59,0.12), transparent 30%, transparent 70%, rgba(34,197,94,0.08));
  pointer-events: none;
}

.hero-layout {
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  align-items: center;
  gap: 2rem;
  position: relative;
  z-index: 1;
}

.eyebrow {
  display: inline-block;
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 800;
  color: var(--gold-light);
  margin-bottom: 1rem;
}

.eyebrow-dark {
  color: var(--navy-primary);
}

.hero-copy h1 {
  font-size: clamp(2.4rem, 5vw, 4.1rem);
  line-height: 1.05;
  letter-spacing: -0.04em;
  margin-bottom: 1rem;
  max-width: 680px;
}

.hero-text {
  color: rgba(248, 250, 252, 0.82);
  font-size: 1.08rem;
  max-width: 620px;
  margin-bottom: 1.75rem;
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0.8rem 1.25rem;
  border-radius: 12px;
  border: 1px solid transparent;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  cursor: pointer;
}

.btn:hover,
.btn:focus-visible {
  transform: translateY(-1px);
}

.btn-primary {
  background: linear-gradient(135deg, var(--gold-primary), #d69a2d);
  color: #1e293b;
  box-shadow: 0 16px 28px rgba(229, 169, 59, 0.25);
}

.btn-secondary {
  background: transparent;
  border-color: rgba(255, 255, 255, 0.2);
  color: var(--text-light);
}

.hero-points {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.5rem;
  list-style: none;
  color: rgba(248, 250, 252, 0.8);
  font-weight: 600;
}

.hero-points li {
  position: relative;
  padding-left: 1.2rem;
}

.hero-points li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--gold-primary);
}

.hero-panel {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
  padding: 1.5rem;
  backdrop-filter: blur(6px);
}

.panel-badge {
  display: inline-flex;
  margin-bottom: 1rem;
  padding: 0.42rem 0.9rem;
  border-radius: 999px;
  background: rgba(229, 169, 59, 0.12);
  color: var(--gold-light);
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.mini-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.95rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.mini-stat:last-of-type {
  border-bottom: none;
}

.mini-stat strong {
  font-size: 1.4rem;
  color: var(--gold-light);
}

.mini-stat span {
  color: rgba(248, 250, 252, 0.8);
  text-align: right;
}

.panel-cta {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.panel-cta span {
  color: rgba(248, 250, 252, 0.72);
}

.panel-cta a {
  color: var(--gold-light);
  font-weight: 700;
  text-decoration: none;
}

.trust-strip {
  background: rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
  backdrop-filter: blur(4px);
}

.trust-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  padding: 1.2rem 0;
}

.trust-grid > div {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.8rem 0.2rem;
}

.trust-grid strong {
  color: var(--navy-dark);
}

.trust-grid span {
  color: var(--muted);
  font-size: 0.9rem;
}

.inventory-section,
.tracking-section,
.process-section,
.partners-section {
  padding: 5rem 0;
}

.inventory-section {
  background: linear-gradient(180deg, rgba(245,247,251,0.85), rgba(255,255,255,0.7));
}

.section-heading {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 2rem;
}

.section-heading h2 {
  font-size: clamp(2rem, 3vw, 2.8rem);
  line-height: 1.1;
  color: var(--navy-dark);
  margin-bottom: 0.5rem;
}

.section-subtitle {
  color: var(--muted);
  font-size: 1.02rem;
}

.vehicles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.car-card {
  display: flex;
  flex-direction: column;
  background: rgba(255,255,255,0.9);
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-top: 4px solid rgba(229,169,59,0.8);
}

.car-card:hover,
.car-card:focus-within {
  transform: translateY(-5px);
  box-shadow: 0 26px 42px rgba(15, 23, 42, 0.12);
}

.car-image-frame {
  position: relative;
  display: block;
  width: 100%;
  height: 210px;
  background: linear-gradient(135deg, #dfeaf6, #c8d4e7);
  overflow: hidden;
}

.car-vehicle-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: saturate(1.04) contrast(1.04);
  transition: transform 0.25s ease;
}

.car-card:hover .car-vehicle-image {
  transform: scale(1.03);
}

.car-image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 210px;
  background: linear-gradient(135deg, #dfeaf6, #c8d4e7);
  font-size: 3rem;
}

.image-badge {
  position: absolute;
  right: 12px;
  bottom: 12px;
  background: rgba(15, 23, 42, 0.72);
  color: var(--white);
  border-radius: 999px;
  padding: 0.35rem 0.7rem;
  font-size: 0.7rem;
  letter-spacing: 0.04em;
}

.car-info {
  padding: 1.3rem 1.2rem 1.4rem;
  display: flex;
  flex: 1;
  flex-direction: column;
}

.car-location-badge {
  display: inline-flex;
  align-self: flex-start;
  margin-bottom: 0.6rem;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  background: #edf2ff;
  color: var(--navy-primary);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.car-info h3 {
  font-size: 1.2rem;
  color: var(--navy-dark);
  margin-bottom: 0.25rem;
}

.car-price-tag {
  color: var(--navy-primary);
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0.45rem 0 0.9rem;
}

.car-features-list {
  list-style: none;
  margin-bottom: 1.2rem;
  color: var(--muted);
  display: grid;
  gap: 0.35rem;
  font-size: 0.9rem;
}

.car-features-list li::before {
  content: "✓";
  color: #16a34a;
  font-weight: 700;
  margin-right: 0.5rem;
}

.btn-whatsapp {
  margin-top: auto;
  background: linear-gradient(135deg, #25d366, #1bbf5d);
  color: var(--white);
  box-shadow: 0 10px 24px rgba(37, 211, 102, 0.2);
}

.btn-whatsapp:hover,
.btn-whatsapp:focus-visible {
  background: linear-gradient(135deg, #1ebc5b, #1aa84f);
}

.tracking-layout-wrapper {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 1.5rem;
  align-items: stretch;
}

.port-watch-card,
.tracker-card,
.process-card,
.partner-card {
  background: var(--white);
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: var(--radius-md);
  box-shadow: 0 18px 30px rgba(15, 23, 42, 0.04);
}

.port-watch-card,
.tracker-card {
  padding: 1.6rem;
}

.card-header {
  position: relative;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 1rem;
}

.card-header h3,
.tracker-card h3 {
  font-size: 1.4rem;
  color: var(--navy-dark);
  margin-bottom: 0.3rem;
}

.pulse-indicator {
  position: absolute;
  right: 0;
  top: 4px;
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.6);
  animation: pulse 2s infinite;
}

.timestamp {
  color: var(--muted);
  font-size: 0.9rem;
}

.vessel-list {
  display: grid;
  gap: 0.8rem;
}

.vessel-item {
  padding: 0.9rem 0;
  border-bottom: 1px dashed #dfe5ee;
}

.vessel-item:last-child {
  border-bottom: none;
}

.vessel-meta {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: start;
  margin-bottom: 0.5rem;
}

.vessel-meta h4 {
  font-size: 1.05rem;
  color: var(--navy-dark);
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 800;
}

.status-green {
  background: #dcfce7;
  color: #166534;
}

.status-amber {
  background: #fef3c7;
  color: #92400e;
}

.vessel-item p,
.tracker-card p,
.disclaimer,
.service-details,
.process-card p {
  color: var(--muted);
}

.tracker-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.tracker-form {
  margin-top: 1rem;
}

.input-group {
  display: flex;
  gap: 0.75rem;
}

.input-group input {
  flex: 1;
  min-height: 48px;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
  font-size: 1rem;
  color: var(--text-dark);
  background: #fff;
}

.input-group input:focus-visible {
  outline: 3px solid rgba(28, 37, 65, 0.15);
  border-color: var(--navy-primary);
}

.tracking-output-display {
  display: none;
  margin-top: 1.25rem;
  padding: 1rem;
  background: var(--bg-soft);
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  color: var(--text-dark);
}

.tracker-loading {
  color: var(--muted);
}

.tracking-card-result {
  display: grid;
  gap: 0.9rem;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.result-header h4 {
  font-size: 1rem;
  color: var(--navy-dark);
}

.highlight-code {
  background: #0f172a;
  color: #f8fafc;
  border-radius: 8px;
  padding: 0.25rem 0.45rem;
  font-weight: 700;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #e0f2fe;
  color: #075985;
  border-radius: 999px;
  padding: 0.3rem 0.7rem;
  font-size: 0.75rem;
  font-weight: 800;
}

.progress-bar-container {
  position: relative;
  width: 100%;
  height: 16px;
  background: #e2e8f0;
  border-radius: 999px;
  overflow: hidden;
}

.progress-bar-fill {
  position: absolute;
  inset: 0 auto 0 0;
  width: 0;
  background: linear-gradient(90deg, var(--gold-primary), #f3c86a);
  border-radius: inherit;
}

.progress-percentage-label {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 0.7rem;
  font-weight: 800;
  color: #0f172a;
}

.tracking-grid-details {
  display: grid;
  gap: 0.35rem;
  color: var(--muted);
}

.tracking-grid-details strong {
  color: var(--navy-dark);
}

.tracking-notes-block {
  background: #fff;
  padding: 0.9rem 1rem;
  border-left: 4px solid var(--navy-primary);
  border-radius: 8px;
}

.tracking-notes-block h5 {
  font-size: 0.84rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.3rem;
  color: var(--navy-dark);
}

.error-state {
  border-left: 4px solid #ef4444;
  background: #fff1f2;
  padding: 0.9rem 1rem;
  border-radius: 8px;
}

.error-state h4 {
  margin-bottom: 0.5rem;
  color: #9f1239;
}

.text-alert {
  color: #b45309;
  font-weight: 700;
}

.process-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.4rem;
  margin-top: 2rem;
}

.process-card {
  padding: 1.5rem;
}

.step-number {
  display: inline-flex;
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  border-radius: 12px;
  background: rgba(229, 169, 59, 0.12);
  color: var(--navy-primary);
  font-weight: 800;
}

.process-card h3 {
  color: var(--navy-dark);
  margin-bottom: 0.45rem;
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.4rem;
  margin-top: 2rem;
}

.partner-card {
  padding: 1.4rem;
}

.partner-branding {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.fallback-logo {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--navy-primary), var(--navy-light));
  color: var(--white);
  font-weight: 800;
}

.partner-branding h3 {
  font-size: 1.1rem;
  color: var(--navy-dark);
}

.corridor-tag {
  margin-bottom: 0.75rem;
  color: var(--muted);
  font-size: 0.92rem;
}

.service-details {
  margin-bottom: 1rem;
  min-height: 88px;
}

.partner-contact {
  color: var(--navy-primary);
  font-weight: 700;
  text-decoration: none;
}

.main-footer {
  background: var(--navy-dark);
  color: rgba(148, 163, 184, 0.95);
  padding: 2rem 0;
  text-align: center;
  border-top: 2px solid var(--gold-primary);
}

.footer-content {
  display: grid;
  gap: 0.35rem;
}

.footer-content a {
  color: var(--gold-light);
  text-decoration: none;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
}

@media (max-width: 900px) {
  .hero-layout,
  .tracking-layout-wrapper,
  .process-grid,
  .partners-grid,
  .trust-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .nav-toggle-btn {
    display: inline-flex;
  }

  .nav-links {
    position: absolute;
    left: 1rem;
    right: 1rem;
    top: calc(100% + 0.5rem);
    display: none;
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    background: rgba(11, 19, 41, 0.97);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    box-shadow: var(--shadow-soft);
  }

  .nav-links.active {
    display: flex;
  }

  .nav-links a {
    width: 100%;
    padding: 0.35rem 0;
  }

  .hero-section {
    padding-top: 4rem;
  }

  .cta-row,
  .input-group {
    flex-direction: column;
  }

  .btn,
  .input-group input {
    width: 100%;
  }
}

/* End of stylesheet */
