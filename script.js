const burg = document.querySelector('.header-burger'),
	burgMenu = document.querySelector('.header-menu'),
	header = document.querySelector('.header');

//header
burg.onclick = () => {
	burg.classList.toggle('toggle');
	burgMenu.classList.toggle('toggle');
	header.classList.toggle('toggle');
};

// Найти все ссылки начинающиеся на #
const anchors = document.querySelectorAll('a[href^="#"]')

// Цикл по всем ссылкам
for(let anchor of anchors) {
  anchor.addEventListener("click", function(e) {
    e.preventDefault() // Предотвратить стандартное поведение ссылок
    // Атрибут href у ссылки, если его нет то перейти к body (наверх не плавно)
    const goto = anchor.hasAttribute('href') ? anchor.getAttribute('href') : 'body'
    // Плавная прокрутка до элемента с id = href у ссылки
    document.querySelector(goto).scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  })
};

//Добавляем клик на кнопку купить сейчас и тележку
const btnBuy = document.querySelector('.coffe-shop__bye'),
 	btnBasket = document.querySelector('.coffe-shop__add-basket'),
	total = document.querySelector('.total');
let count = 0;

btnBuy.addEventListener('click', (e) => {
	//console.log(e.target);
	if(e.target) {
		count++;
		btnBasket.classList.add('top');
		total.className = 'num';
		total.textContent = count;
	}
});
