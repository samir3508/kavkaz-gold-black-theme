// Sticky bottom bar — hide when add-to-cart is visible
const bottomBar = document.getElementById('bottom-bar');
const productForm = document.getElementById('product-form');

if (bottomBar && productForm) {
  const obs = new IntersectionObserver(entries => {
    bottomBar.style.display = entries[0].isIntersecting ? 'none' : 'flex';
  }, { threshold: 0 });
  obs.observe(productForm);
}

// Sync bottom bar price with variant selection
document.querySelectorAll('.variant-card input[type="radio"]').forEach(radio => {
  radio.addEventListener('change', function() {
    const price = this.closest('.variant-card').querySelector('.variant-card__price').textContent;
    const bbPrice = document.getElementById('bb-price');
    if (bbPrice) bbPrice.textContent = price;
  });
});

// Header shadow on scroll
const header = document.getElementById('site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 5 ? '0 2px 20px rgba(0,0,0,.5)' : 'none';
  }, { passive: true });
}

// Scroll animations
const animObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.review-card, .ritual__step, .benefits-band__item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  animObs.observe(el);
});
