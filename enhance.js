document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('vehicles-grid-target');
  if (!grid || typeof vehicles === 'undefined') return;
  const cards = [...grid.querySelectorAll('.car-card')];
  cards.forEach((card, i) => {
    const car = vehicles[i];
    if (!car) return;
    card.id = car.id || 'car-' + i;
    card.dataset.kind = typeof car.price === 'number' ? (car.price < 150000 ? 'under' : 'over') : 'order';
    if (car.tag) {
      card.classList.toggle('is-sold', /sold/i.test(car.tag));
      const ribbon = document.createElement('span');
      ribbon.className = 'car-ribbon';
      ribbon.textContent = car.tag;
      const frame = card.querySelector('.car-image-frame, .car-image-placeholder');
      if (frame) frame.appendChild(ribbon);
    }
    const info = card.querySelector('.car-info');
    if (!info) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-share';
    btn.textContent = '🔗 Share this car';
    btn.addEventListener('click', async () => {
      const url = location.origin + location.pathname + '#' + card.id;
      try {
        if (navigator.share) { await navigator.share({ title: car.title, text: car.title + ' - SamKen Motors', url }); return; }
        await navigator.clipboard.writeText(url);
        btn.textContent = '✅ Link copied';
        setTimeout(() => { btn.textContent = '🔗 Share this car'; }, 2000);
      } catch (e) { /* cancelled */ }
    });
    info.appendChild(btn);
  });

  const chips = [['all', 'All'], ['under', 'Under K150,000'], ['over', 'K150,000 and above'], ['order', 'Made to order']];
  const bar = document.createElement('div');
  bar.className = 'filter-bar';
  bar.innerHTML = chips.map(([k, l], i) => `<button type="button" class="chip${i ? '' : ' active'}" data-f="${k}">${l}</button>`).join('');
  grid.before(bar);
  bar.addEventListener('click', (e) => {
    const b = e.target.closest('.chip');
    if (!b) return;
    bar.querySelectorAll('.chip').forEach((c) => c.classList.toggle('active', c === b));
    cards.forEach((c) => { c.hidden = b.dataset.f !== 'all' && c.dataset.kind !== b.dataset.f; });
  });

  if (location.hash.length > 1) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
  }
});
