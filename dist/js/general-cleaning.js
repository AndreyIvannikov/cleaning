
const modal = document.querySelector(".modal");
const modalBtn = document.querySelector(".modal-btn");
const closeModal = document.querySelector(".close")
const price = document.querySelector(".form-select__price");

const form = document.querySelector(".form");

let data = {
    room3:0,
    room4:0,
    total:0
}

form.addEventListener('change',selectedOnHeandler)
function selectedOnHeandler(evt) {
    let target = evt.target;
    let select = target.options[target.selectedIndex];
    let calcValue = select.dataset.calcValue
    data[target.dataset.name] = parseInt(calcValue) || 0;
    calc()

}
function calc (){
    data.total= data.room3+data.room4;
    price.innerHTML = data.total + " руб." + '<sup>*</sup>'
}

modalBtn.addEventListener('click', () => {
    modal.style.display = "block";
    document.body.classList.add("no-scroll")
})


closeModal.addEventListener("click", function (event) {
    modal.style.display = "none";
    document.body.classList.remove("no-scroll");
});


modal.addEventListener('click',(e)=>{
    if(e.target===modal){
        modal.style.display = "none";
        document.body.classList.remove("no-scroll");
    }

})

let linkNav = document.querySelectorAll('[href^="#"]'),
    V = 0.5;
for (let i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function(e) {
        e.preventDefault();
        let w = window.pageYOffset,  // производим прокрутка прокрутка
            hash = this.href.replace(/[^#]*(.*)/, '$1');
        t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
            start = null;
        requestAnimationFrame(step);
        function step(time) {
            if (start === null) start = time;
            let progress = time - start,
                r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
            window.scrollTo(0,r);
            if (r != w + t) {
                requestAnimationFrame(step)
            } else {
                location.hash = hash  // URL с хэшем
            }
        }
    }, false);
}