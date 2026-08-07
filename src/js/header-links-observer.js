import AOS from 'aos';
import 'aos/dist/aos.css';
const sections = document.querySelectorAll('[data-observer="section"]');
const links = document.querySelectorAll('[data-link]');

const observerProperties = {
  root: null,
  rootMargin: '-50% 0px -50% 0px',
  threshold: 0,
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      links.forEach(link => {
        link.dataset.link = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.dataset.link = 'active';
        }
      });
    }
  });
}, observerProperties);

sections.forEach(section => observer.observe(section));

AOS.init({
  duration: 1000,
});
