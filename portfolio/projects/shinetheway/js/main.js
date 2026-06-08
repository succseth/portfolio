// Shared nav + reveal animations
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const btn = document.querySelector('.menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  if (btn && mobileNav) {
    btn.addEventListener('click', () => mobileNav.classList.toggle('open'));
  }
  // Highlight active link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });
  // Scroll reveal
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }});
  }, { rootMargin: '-60px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  // Footer year
  const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
});
