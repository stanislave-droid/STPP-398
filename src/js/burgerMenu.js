const burgerBtnEl = document.querySelector('[data-action]');
const burgerMenuEl = document.querySelector('[data-visible]');

burgerBtnEl.addEventListener('click', e => {
  const burgerBtnDataset = e.currentTarget.dataset.action;
  const isModalOpen = burgerBtnDataset != 'open';

  burgerBtnEl.dataset.action = isModalOpen ? 'open' : 'close';
  //   burgerMenuEl.dataset.visible = isModalOpen;
});
