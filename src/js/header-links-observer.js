import AOS from 'aos';
import 'aos/dist/aos.css';
const sections = document.querySelectorAll('[data-observer="section"]');
const links = document.querySelectorAll('[data-link]');
const firstReviewCard = document.querySelector(
  '[data-review-animation="first"]'
);
const secondReviewCard = document.querySelector(
  '[data-review-animation="second"]'
);

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

window.innerWidth >= 1440
  ? setReviewCardsAnimation(1440)
  : setReviewCardsAnimation(375);

function setReviewCardsAnimation(width) {
  if (width >= 1440) {
    firstReviewCard.dataset.aos = 'fade-up';
    secondReviewCard.dataset.aos = 'fade-left';
  } else {
    firstReviewCard.dataset.aos = 'fade-left';
    secondReviewCard.dataset.aos = 'fade-right';
  }
}

window.addEventListener('resize', event => {
  const width = event.currentTarget.innerWidth;
  setReviewCardsAnimation(width);
  AOS.refresh();
});

AOS.init({
  duration: 1000,
  once: true,
});
