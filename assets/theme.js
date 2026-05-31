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
