feather.replace();

const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
});

const header = document.getElementById('header');
window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
              header.classList.add('scrolled');
      } else {
              header.classList.remove('scrolled');
      }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
              e.preventDefault();
              const targetId = this.getAttribute('href');
              if (targetId === '#') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        return;
              }
              const targetElement = document.querySelector(targetId);
              if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
              }
              if (!mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
              }
      });
});
