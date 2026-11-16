/* ==========================================================================
   Bistro Noir — interacciones
   Proyecto de demostración · PixelCraft Studio
   ========================================================================== */
(() => {
  'use strict';

  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- 1. Cabecera: estado al hacer scroll ---------- */
  const header = $('#cabecera');
  const onScrollHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ---------- 2. Menú móvil accesible ---------- */
  const toggle = $('.menu-toggle');
  const menu = $('#menu-movil');
  const toggleLabel = $('.menu-toggle__label');
  const outside = [$('main'), $('.site-footer'), $('.skip-link')];
  let lastFocus = null;

  const focusables = () => [toggle, ...$$('a, button', menu)];

  function openMenu() {
    lastFocus = document.activeElement;
    menu.hidden = false;
    void menu.offsetWidth; // fuerza reflow para que la transición se aplique
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Cerrar menú');
    toggleLabel.textContent = 'Cerrar';
    document.body.classList.add('is-locked');
    outside.forEach(el => el && el.setAttribute('inert', ''));
    $('a', menu).focus();
  }

  function closeMenu({ restoreFocus = true } = {}) {
    if (menu.hidden) return;
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.removeAttribute('aria-label');
    toggleLabel.textContent = 'Menú';
    document.body.classList.remove('is-locked');
    outside.forEach(el => el && el.removeAttribute('inert'));
    const hide = () => { if (!menu.classList.contains('is-open')) menu.hidden = true; };
    reduceMotion.matches ? hide() : setTimeout(hide, 450);
    if (restoreFocus && lastFocus) lastFocus.focus();
  }

  toggle.addEventListener('click', () => (menu.hidden ? openMenu() : closeMenu()));

  menu.addEventListener('click', e => {
    if (e.target.closest('a')) closeMenu({ restoreFocus: false });
  });

  document.addEventListener('keydown', e => {
    if (menu.hidden) return;
    if (e.key === 'Escape') { closeMenu(); return; }
    if (e.key === 'Tab') {
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // Si se amplía la ventana con el menú abierto, se cierra.
  window.matchMedia('(min-width: 901px)').addEventListener('change', e => {
    if (e.matches) closeMenu({ restoreFocus: false });
  });

  /* ---------- 3. Enlace activo en la navegación ---------- */
  const navLinks = $$('.main-nav__link');
  // Se observan todas las secciones de primer nivel; si la visible no está
  // en la navegación (p. ej. «Experiencia»), no se marca ningún enlace.
  const sections = $$('main > section[id]');

  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          const current = link.hash === '#' + entry.target.id;
          link.classList.toggle('is-current', current);
          current ? link.setAttribute('aria-current', 'location') : link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => navObserver.observe(s));
  }

  /* ---------- 4. Revelado al hacer scroll ---------- */
  const revealEls = $$('[data-reveal]');
  // Escalonado sutil entre hermanos
  revealEls.forEach(el => {
    const siblings = Array.from(el.parentElement.children).filter(c => c.hasAttribute('data-reveal'));
    const i = siblings.indexOf(el);
    if (i > 0) el.style.setProperty('--delay', `${Math.min(i, 5) * 0.08}s`);
  });

  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- 5. Carta: vista previa del plato ---------- */
  const dishes = $$('.dish');
  const previews = $$('.menu__preview img');

  function activateDish(dish) {
    const key = dish.dataset.dish;
    dishes.forEach(d => d.classList.toggle('is-active', d === dish));
    previews.forEach(img => img.classList.toggle('is-active', img.dataset.dish === key));
  }
  dishes.forEach(dish => {
    dish.addEventListener('mouseenter', () => activateDish(dish));
    dish.addEventListener('focus', () => activateDish(dish));
  });

  /* ---------- 6. Parallax suave en la sección Experiencia ---------- */
  const banner = $('.experience__banner');
  const bannerImg = banner && $('img', banner);
  if (bannerImg && !reduceMotion.matches) {
    let ticking = false;
    const update = () => {
      const rect = banner.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom > 0 && rect.top < vh) {
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh; // -1 … 1
        bannerImg.style.transform = `translate3d(0, ${progress * -6}%, 0)`;
      }
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------- 7. Formulario de reserva (demostración) ---------- */
  const form = $('#reservar');
  const status = $('.booking__status', form);
  const dateInput = $('#f-fecha');

  const toISODate = d => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  dateInput.min = toISODate(new Date());

  const rules = {
    nombre: v => v.trim().length >= 2 || 'Indica tu nombre.',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Introduce un correo electrónico válido.',
    fecha: v => {
      if (!v) return 'Elige una fecha.';
      if (v < dateInput.min) return 'La fecha no puede ser anterior a hoy.';
      if (new Date(v + 'T12:00').getDay() === 1) return 'Los lunes estamos cerrados.';
      return true;
    },
    hora: v => !!v || 'Elige una hora.'
  };

  function validateField(name) {
    const field = form.elements[name];
    const result = rules[name](field.value);
    const error = $('#e-' + name);
    const ok = result === true;
    field.closest('.field').classList.toggle('has-error', !ok);
    field.setAttribute('aria-invalid', String(!ok));
    if (!ok) field.setAttribute('aria-describedby', 'e-' + name); else field.removeAttribute('aria-describedby');
    error.textContent = ok ? '' : result;
    return ok;
  }

  Object.keys(rules).forEach(name => {
    const field = form.elements[name];
    field.addEventListener('blur', () => { if (field.value) validateField(name); });
    field.addEventListener('change', () => {
      if (field.closest('.field').classList.contains('has-error')) validateField(name);
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const invalid = Object.keys(rules).filter(name => !validateField(name));
    if (invalid.length) {
      form.elements[invalid[0]].focus();
      return;
    }
    const data = new FormData(form);
    const fecha = new Date(data.get('fecha') + 'T12:00').toLocaleDateString('es-ES', {
      weekday: 'long', day: 'numeric', month: 'long'
    });
    const personas = data.get('personas');
    status.innerHTML = '';
    const title = document.createElement('strong');
    title.textContent = 'Solicitud registrada (demostración)';
    const text = document.createElement('span');
    text.textContent = `Mesa para ${personas} ${personas === '1' ? 'persona' : 'personas'} el ${fecha} a las ${data.get('hora')}. ` +
      'En un proyecto real, aquí se conectaría el sistema de reservas del restaurante. No se ha enviado ningún dato.';
    status.append(title, text);
    status.focus();
    form.reset();
    $$('.field', form).forEach(f => f.classList.remove('has-error'));
  });

  /* ---------- 8. Marca que JS está listo (por si falla la carga) ---------- */
  root.classList.add('js-ready');
})();
