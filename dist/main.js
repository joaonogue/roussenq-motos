const WHATSAPP_NUMBER = '5548988121232';

function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function buildSpecList(moto) {
  const labels = [moto.year, moto.km, moto.cc].filter(Boolean);
  if (!labels.length) return '';

  return `<ul class="moto-specs">${labels.map((label) => `<li>${label}</li>`).join('')}</ul>`;
}

function buildMotoCard(moto) {
  const title = [moto.brand, moto.model].filter(Boolean).join(' ').trim();
  if (!title || !moto.image) return '';

  const version = moto.version ? `<p class="moto-card-version">${moto.version}</p>` : '';
  const price = moto.price ? `<p class="price">${moto.price}</p>` : '';
  const interestMessage = `Olá! Vi a ${title} no site da Roussenq Motos e gostaria de mais informações.`;

  return `
    <article class="moto-card" data-reveal>
      <div class="moto-card-media">
        <img src="/${moto.image.replace(/^\/+/, '')}" alt="${moto.imageAlt || title}" loading="lazy" decoding="async" />
      </div>
      <div class="moto-card-body">
        <div class="moto-card-title">
          <h3>${title}</h3>
          ${price}
        </div>
        ${version}
        ${buildSpecList(moto)}
        <a class="text-link" href="${whatsappLink(interestMessage)}" target="_blank" rel="noreferrer">Tenho interesse <span aria-hidden="true">↗</span></a>
      </div>
    </article>`;
}

async function loadMotoCatalog() {
  const grid = document.querySelector('#moto-grid');
  const emptyState = document.querySelector('#inventory-empty');
  if (!grid || !emptyState) return;

  try {
    const response = await fetch('/assets/data/motos.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Catálogo indisponível');
    const catalog = await response.json();
    const motos = Array.isArray(catalog.motos) ? catalog.motos : [];
    const cards = motos.map(buildMotoCard).filter(Boolean).join('');

    if (cards) {
      emptyState.remove();
      grid.innerHTML = cards;
      grid.classList.add('has-items');
      observeReveals(grid.querySelectorAll('[data-reveal]'));
    }
  } catch (error) {
    // O estado estático já orienta a pessoa a consultar pelo WhatsApp.
  }
}

function observeReveals(elements = document.querySelectorAll('[data-reveal]')) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  elements.forEach((element) => observer.observe(element));
}

function setupMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  const backdrop = document.querySelector('[data-menu-backdrop]');
  if (!toggle || !menu || !backdrop) return;

  const closeMenu = () => {
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
  };

  toggle.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  backdrop.addEventListener('click', closeMenu);
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

function setupHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 14);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

document.querySelector('[data-year]').textContent = new Date().getFullYear();
setupHeader();
setupMenu();
observeReveals();
loadMotoCatalog();
