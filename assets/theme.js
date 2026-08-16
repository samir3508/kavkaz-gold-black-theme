// Header shadow on scroll
const header = document.getElementById('site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 5);
  }, { passive: true });
}

// Accordions — un seul ouvert à la fois
document.querySelectorAll('.acc').forEach(acc => {
  acc.addEventListener('toggle', function() {
    if (this.open) {
      document.querySelectorAll('.acc').forEach(other => {
        if (other !== this) other.removeAttribute('open');
      });
    }
  }, true);
});

// Scroll reveal animations
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.review, .ritual__item, .ben-band__item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity .55s ease, transform .55s ease';
  revealObs.observe(el);
});

// Newsletter popup — -10% contre inscription email
const nlPopup = document.getElementById('newsletter-popup');
if (nlPopup) {
  const NL_DISMISSED_KEY = 'kavkazNlDismissed';
  const NL_DELAY_MS = 8000;

  const openNlPopup = (step) => {
    if (step) {
      nlPopup.querySelectorAll('[data-nl-step]').forEach(el => {
        el.hidden = el.getAttribute('data-nl-step') !== step;
      });
    }
    nlPopup.hidden = false;
    requestAnimationFrame(() => nlPopup.classList.add('is-open'));
    document.body.style.overflow = 'hidden';
  };

  const closeNlPopup = () => {
    nlPopup.classList.remove('is-open');
    document.body.style.overflow = '';
    window.setTimeout(() => { nlPopup.hidden = true; }, 300);
    window.localStorage.setItem(NL_DISMISSED_KEY, '1');
  };

  nlPopup.querySelectorAll('[data-nl-close]').forEach(el => {
    el.addEventListener('click', closeNlPopup);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !nlPopup.hidden) closeNlPopup();
  });

  if (window.__nlPopupPostedSuccess) {
    // Retour après soumission réussie du formulaire
    openNlPopup('success');
    window.localStorage.setItem(NL_DISMISSED_KEY, '1');
  } else if (!window.localStorage.getItem(NL_DISMISSED_KEY)) {
    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      openNlPopup('form');
    };

    window.setTimeout(show, NL_DELAY_MS);

    document.addEventListener('mouseout', (e) => {
      if (!e.relatedTarget && e.clientY <= 0) show();
    });
  }
}
