let formSelect = document.querySelectorAll('.form');
let price = document.querySelectorAll('.form-select__price')
const modal = document.querySelectorAll(".modal");
const selectBtn = document.querySelectorAll('.work__btn-toggle')
const accordionListAll = document.querySelector('.faq__list-all')
let button = document.querySelectorAll('button');


const KEYCODE = {
    ESC: 27,
}

document.addEventListener('keydown', checkCloseDialog)

button.forEach((elem) => {

    elem.addEventListener('click', () => {
        let par = elem.parentNode.parentNode.parentNode;
        if (elem.classList.contains('close')) {
            closeDialog(par)
        } else if (elem.classList.contains('modal-btn')) {
            openDialog(elem.nextElementSibling)
        } else if (elem.classList.contains('faq-item__title')) {
            openAccordion(elem, elem.nextElementSibling)
        } else if (elem.classList.contains('button__faq')) {
            openFaqButtonHandler(elem)
        } else if (elem.classList.contains('work__btn-toggle')) {
            openToggleImgButtonHandler(elem)
        }
    })
})

function checkCloseDialog(e) {
    if (e.keyCode === KEYCODE.ESC) {
        closePopup()
    }
}

function closePopup() {
    for (let i = 0; i < modal.length; i++) {
        modal[i].style.display = 'none'
        document.body.classList.remove("no-scroll");
    }
}

function openAccordion(elem, panel) {
    elem.parentNode.classList.toggle('open')
    if (panel.style.maxHeight) {
        elem.setAttribute('aria-expanded', false)
        panel.style.maxHeight = null;
        panel.style.visibility = 'hidden';
    } else {
        elem.setAttribute('aria-expanded', true)
        panel.style.maxHeight = panel.scrollHeight + "px";
        panel.style.visibility = 'visible';
    }
}

function closeDialog(close) {
    close.style.display = 'none'
    close.setAttribute('aria-expanded', 'false')
    document.body.classList.remove("no-scroll");
}

function openDialog(open) {
    open.style.display = 'block'
    open.setAttribute('aria-expanded', 'true')
    document.body.classList.add("no-scroll");
    open.addEventListener('click', (e) => {
        if (e.target === open) {
            open.style.display = 'none';
        }
    })
}

let closeAndOpenFaqButton = false;

function openFaqButtonHandler(elem) {
    if (closeAndOpenFaqButton) {
        accordionListAll.style.display = 'none';
        closeAndOpenFaqButton = false;
        elem.textContent = 'Еще вопросы'
    } else {
        accordionListAll.style.display = 'block'
        closeAndOpenFaqButton = true;
        elem.textContent = 'Скрыть вопросы'
    }
}

function openToggleImgButtonHandler(btn) {
    for (let i = 0; i < selectBtn.length; i++) {
        selectBtn[i].classList.remove('active__btn')
    }
    btn.classList.toggle('active__btn')
    let attr = btn.getAttribute('data-src');
    document.querySelector('.work-img__item img').src = attr
}

let select = document.querySelectorAll('select')
for (let j = 0; j < select.length; j++) {
    select[j].addEventListener('change', (event) => {
        if (select[j].classList.contains('work__select')) {
            btnToggleImgSelectHandler(event)
        }
    })
}

function btnToggleImgSelectHandler(element) {
    let tar = element.target
    const data = tar.options[tar.selectedIndex]
    const srcValue = data.dataset.src
    document.querySelector('.work-img__item img').src = srcValue;
}

const data = {
    'room1': 0,
    'room2': 0,
    'room3': 0,
    'room4': 0,
    'total': 0,
    'total2': 0,
}
for (let index = 0; index < formSelect.length; index++) {
    formSelect[index].addEventListener('change', (evt) => {
        calcValueSelected(evt, index)
    })
}

function calcValueSelected(elem, index) {
    const evt = elem.target;
    if (evt.matches('select')) {
        const selectedOption = evt.options[evt.selectedIndex];
        const calcValue = selectedOption.dataset.calcValue;
        data[evt.dataset.name] = parseInt(calcValue) || 0;
        if (evt.classList.contains('form-select-two')) {
            data.total2 = data.room3 + data.room4;
            price[index].innerHTML = data.total2 + " руб." + '<sup>*</sup>'
        } else {
            data.total = data.room1 + data.room2;
            price[index].innerHTML = data.total + " руб." + '<sup>*</sup>'
        }
    }
}


window.addEventListener('scroll', function (event) {
    let scr = pageYOffset;
    if (scr > 400 && scr < 3500) {
        document.querySelector('.modal-window').style.display = 'block'
    } else {
        document.querySelector('.modal-window').style.display = 'none'
    }

});


let linkNav = document.querySelectorAll('[href^="#"]'),
    V = 0.5;
for (let i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function (e) {
        e.preventDefault();
        let w = window.pageYOffset,  // производим прокрутка прокрутка
            hash = this.href.replace(/[^#]*(.*)/, '$1');
        t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
            start = null;
        requestAnimationFrame(step);

        function step(time) {
            if (start === null) start = time;
            let progress = time - start,
                r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
            window.scrollTo(0, r);
            if (r != w + t) {
                requestAnimationFrame(step)
            } else {
                location.hash = hash  // URL с хэшем
            }
        }
    }, false);
}
