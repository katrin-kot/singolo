document.addEventListener('scroll', onScroll);
function onScroll(event) {
  const curPos = window.scrollY;
  const sections = document.querySelectorAll('section');
  const links = document.querySelectorAll('.navlink');
  sections.forEach(el => {
    if (curPos >= el.offsetTop && curPos < el.offsetTop + el.offsetHeight) {
      links.forEach(a => {
        a.classList.remove('navlink-active');
        if (el.dataset.name === a.getAttribute('href').substring(1)) {
          a.classList.add('navlink-active');
        }
      });
    }
  });
}
document.querySelectorAll('.navlink').forEach(elem =>
  elem.addEventListener('click', () => {
    document.getElementById('nav').checked = false;
  })
);
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
  let isAnimationEnd = true;

  elements.wrap.appendChild(elements.children[0].cloneNode(true));

  this.prev_slide = () => {
    if (!isAnimationEnd) {
      return;
    }
    isAnimationEnd = false;
    position -= 1;

    if (position < 0) {
      position = MAX_POSITION - 1;
      elements.wrap.classList.add('notransition');
      elements.wrap.style.transform = `translateX(-${MAX_POSITION}00%)`;
    }
    setTimeout(() => {
      elements.wrap.classList.remove('notransition');
      elements.wrap.style.transform = `translateX(-${position}00%)`;
    }, 10);
    elements.wrap.addEventListener('transitionend', () => {
      isAnimationEnd = true;
    });
  };

  this.next_slide = () => {
    if (!isAnimationEnd) {
      return;
    }
    isAnimationEnd = false;

    if (position < MAX_POSITION) {
      position += 1;
    }

    elements.wrap.classList.remove('notransition');
    elements.wrap.style.transform = `translateX(-${position}00%)`;

    elements.wrap.addEventListener('transitionend', () => {
      if (position >= MAX_POSITION) {
        position = 0;
        elements.wrap.classList.add('notransition');
        elements.wrap.style.transform = `translateX(-${position}00%)`;
      }
      isAnimationEnd = true;
    });
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
  .querySelector('.slider')
  .addEventListener('click', (e) => {
    if (e.target.matches('.vertical_phone_button')) {
      onPhoneClick()
    }
  });


const blackscreen2 = function() {
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
  .querySelector('.slider')
  .addEventListener('click', (e) => {
    if (e.target.matches('.horizontal_phone_button')) {
      blackscreen2()
    }
  });

const items = Array.from(document.querySelectorAll('.portfolio-photo__item'));
const parent = document.querySelector('.portfolio-photo');

document
  .querySelector('.portfolio-filter')
  .addEventListener('click', function(event) {
    document
      .querySelectorAll('.portfolio-filter__item')
      .forEach(item => item.classList.remove('portfolio-filter__item--active'));
    event.target
      .closest('.portfolio-filter__item')
      .classList.add('portfolio-filter__item--active');
    if (event.target.dataset.tag === 'graphic') {
      const arr = Array.from(items).reverse();
      parent.innerHTML = '';
      arr.forEach(item => parent.appendChild(item));
    }

    if (event.target.dataset.tag === 'art') {
      parent.innerHTML = '';
      items.forEach((elem, idx) => {
        if (idx % 2 === 0) {
          parent.prepend(elem);
        } else {
          parent.append(elem);
        }
      });
    }
    if (event.target.dataset.tag === 'all') {
      parent.innerHTML = '';
      items.forEach(item => parent.appendChild(item));
    }
    if (event.target.dataset.tag === 'web') {
      parent.innerHTML = '';
      items.forEach((elem, idx) => {
        if (idx % 2 === 0) {
          parent.append(elem);
        } else {
          parent.prepend(elem);
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

const modal = document.getElementById('modal-window');
const btn = document.querySelector('.contacts__submit');
const close = document.querySelector('.close');
const form = document.querySelector('.contacts__form');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  modal.style.display = 'block';
  const content = document.querySelector('.modal-body');
  const subject =
    document.querySelector('input[name="subject"]').value || 'Без темы';
  const describe =
    document.querySelector('textarea[name="textarea"]').value || 'Без описания';
  content.innerHTML = `
  <h4>Письмо отправлено</h4> 
  <p>Тема: ${subject}</p>
  <p>Описание: ${describe}</p>
  `;
  form.reset();
});

close.onclick = function() {
  modal.style.display = 'none';
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
