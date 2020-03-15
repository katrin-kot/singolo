const select = event => {
  document
    .querySelectorAll('.navlink')
    .forEach(item => item.classList.remove('navlink-active'));
  event.target.closest('.navlink').classList.add('navlink-active');
};
document.querySelector('.navbar').addEventListener('click', select);

function Carousel(setting) {
  const elements = {
    main: document.querySelector(setting.main),
    wrap: document.querySelector(setting.wrap),
    children: document.querySelector(setting.wrap).children,
    prev: document.querySelector(setting.prev),
    next: document.querySelector(setting.next)
  };

  const MAX_POSITION = elements.children.length;
  let position = 0;
  this.prev_slide = () => {
    position -= 1;

    if (position < 0) {
      position = MAX_POSITION - 1;
    }

    elements.wrap.style.transform = `translateX(-${position}00%)`;
    document.querySelector('.current').classList.remove('current');
  };

  this.next_slide = () => {
    position += 1;

    if (position >= MAX_POSITION) {
      position = 0;
    }

    elements.wrap.style.transform = `translateX(-${position}00%)`;
    document.querySelector('.current').classList.remove('current');
  };

  if (elements.prev !== null) {
    elements.prev.addEventListener('click', this.prev_slide);
  }

  if (elements.next !== null) {
    elements.next.addEventListener('click', this.next_slide);
  }
}

let a = new Carousel({
  main: '.slider',
  wrap: '.slider-wrapper',
  prev: '.prev',
  next: '.next'
});

function onPhoneClick() {
  const blackScreen = document.querySelector('.black-screen');
  if (blackScreen) {
    blackScreen.remove();
  } else {
    document
      .querySelector('.vertical_phone')
      .insertAdjacentHTML('afterend', '<div class="black-screen"></div>');
  }
}

document
  .querySelector('.vertical_phone_button')
  .addEventListener('click', onPhoneClick);
const blackscreen2 = function () {
  const elem = document.querySelector('.black-horizont');
  if (elem) {
    elem.parentNode.removeChild(elem);
  } else {
    document
      .querySelector('.horizontal_phone')
      .insertAdjacentHTML('afterend', '<div class="black-horizont"></div>');
  }
};

document
  .querySelector('.horizontal_phone_button')
  .addEventListener('click', blackscreen2);

document
  .querySelector('.portfolio-filter')
  .addEventListener('click', function (event) {
    document
      .querySelectorAll('.portfolio-filter__item')
      .forEach(item => item.classList.remove('portfolio-filter__item--active'));
    event.target
      .closest('.portfolio-filter__item')
      .classList.add('portfolio-filter__item--active');
    if (event.target.dataset.tag === 'graphic') {
      document
        .querySelectorAll('.portfolio-photo__item')
        .forEach((item, idx) => {
          item.dataset.order = 0;
          if (idx % 2 === 0) {
            item.dataset.order = 2;
          }
        });
    }
    if (event.target.dataset.tag === 'art') {
      document
        .querySelectorAll('.portfolio-photo__item')
        .forEach((item, idx) => {
          item.dataset.order = 0;
          if (idx % 2 != 0) {
            item.dataset.order = 1;
          }
        });
    }
    if (event.target.dataset.tag === 'all') {
      document
        .querySelectorAll('.portfolio-photo__item')
        .forEach((item, idx) => {
          item.dataset.order = 0;
        });
    }
    if (event.target.dataset.tag === 'web') {
      document
        .querySelectorAll('.portfolio-photo__item')
        .forEach((item, idx) => {
          item.dataset.order = 0;
          if (idx % 3 != 0) {
            item.dataset.order = 1;
          }
        });
    }
   });

const active = event => {
  document
    .querySelectorAll('img')
    .forEach(item => item.classList.remove('active-image'));
  event.target.closest('img').classList.add('active-image');
};
document.querySelector('.portfolio-photo').addEventListener('click', active);

const modal = document.getElementById("modal-window");
const btn = document.querySelector(".contacts__submit");
const close = document.querySelector(".close");
const form = document.querySelector('.contacts__form');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  modal.style.display = "block";
  const content = document.querySelector(".modal-body");
  const subject = document.querySelector('input[name="subject"]').value || 'Без темы';
  const describe = document.querySelector('textarea[name="textarea"]').value || 'Без описания';
  content.innerHTML = `
  <h4>Письмо отправлено</h4> 
  <p>Тема: ${subject}</p>
  <p>Описание: ${describe}</p>
  `
})

close.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}