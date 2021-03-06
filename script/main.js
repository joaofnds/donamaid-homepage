const navToggleBtn = document.querySelector('button#nav-toggle');
const navEl = document.querySelector(navToggleBtn.dataset.toggle);
const obfuscator = document.querySelector('#obfuscator');
const slider = document.querySelector('.slider');

class NavController {
  constructor(navEl, toggleBtn, obfuscator) {
    this._el = navEl;
    this._toggleBtn = toggleBtn;
    this._obfuscator = obfuscator;
    this._toggleBtn.addEventListener('click', this.toggle.bind(this));
    this._obfuscator.addEventListener('click', this.hide.bind(this));
  }

  hide() {
    this._el.classList.remove('visible');
    this._obfuscator.classList.remove('visible');
    this._el.classList.add('hidden');
    this._obfuscator.classList.add('hidden');
  }

  show() {
    this._el.classList.add('visible');
    this._obfuscator.classList.add('visible');
    this._el.classList.remove('hidden');
    this._obfuscator.classList.remove('hidden');
  }

  toggle() {
    if (this._el.classList.contains('visible')) {
      this.hide();
    } else {
      this.show();
    }
  }
}

const navCtrl = new NavController(navEl, navToggleBtn, obfuscator);

const navCloseEls = document.querySelectorAll('[data-should-close]');
if (navCloseEls) {
  Array.from(navCloseEls)
    .map(e => e.addEventListener('click', navCtrl.hide.bind(navCtrl)));
}

// Hide menu when resize over 810px
document.body.onresize = () => (document.body.clientWidth >= 810 && navCtrl.hide())

// slider
function makeSliderMover(s) {
  return function(i) {
    const move = s.children[i].offsetLeft
    s.style.transform = `translateX(-${move}px)`
  }
}

const moveToChildren = makeSliderMover(slider);

const lis = document.querySelectorAll('.help li')
Array.from(lis).forEach(li => li.addEventListener('click', () => toggleAnswerVisibility(li)))

function toggleAnswerVisibility(listItem) {

  for (li of document.querySelectorAll('.help li.show-answer')) {
    if (li != listItem) {
      li.classList.remove('show-answer');
    }
  }

  if (listItem.classList.contains('show-answer')) {
    listItem.classList.remove('show-answer');
  } else {
    listItem.classList.add('show-answer');
  }
}
