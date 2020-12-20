let countTotal;

// создание карточки

const createCard = (coffe) => {
	const card = document.createElement("div");
	card.className = "coffe__card";
	card.innerHTML = `
		<a class="coffe__card__link" href="./product/?id=${coffe.id}">
			<img class="coffe__card__img" src="assets/img/${coffe.name.replace(/ /g,"_")}/${coffe.images[0]}" alt="coffe">
		</a>
		<div class="price">
			<p class="coffe__card__text">${coffe.name}</p>
			<p class="coffe__card__price">${coffe.price}&euro;</p>
		</div>
		<div class="coffe__card-add">
			<button id="buy_${coffe.id}" class="coffe__card__bye" data-id=${coffe.id}>Buy now</button>
			<a class="coffe__card__link-bye" href="./basket/index.html">
			<button id="basket_${coffe.id}" class="coffe__card__add-basket">
				<svg class="svg-add" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g data-name="${coffe.id}"><path d="M397.78 316H192.65A15 15 0 01178 304.33l-34.54-150.48a15 15 0 0114.62-18.36h274.27A15 15 0 01447 153.85l-34.6 150.48A15 15 0 01397.78 316zm-193.19-30h181.25l27.67-120.48h-236.6zM222 450a57.48 57.48 0 1157.48-57.48A57.54 57.54 0 01222 450zm0-84.95a27.48 27.48 0 1027.48 27.47A27.5 27.5 0 00222 365.05zM368.42 450a57.48 57.48 0 1157.48-57.48A57.54 57.54 0 01368.42 450zm0-84.95a27.48 27.48 0 1027.48 27.47 27.5 27.5 0 00-27.48-27.47z"/><path d="M158.08 165.49a15 15 0 01-14.23-10.26L118.14 78H70.7a15 15 0 110-30H129a15 15 0 0114.23 10.26l29.13 87.49a15 15 0 01-14.23 19.74z"/></g></svg> 
			</button>
			<span id="total_${coffe.id}" class="total">0</span>
			</a>
		</div>
	`;
	cardWrap.append(card);

	//Добавление счетчика на кнопку с тележкой
	const btnBuy = document.querySelector(`#buy_${coffe.id}`),
 		btnBasket = document.querySelector(`#basket_${coffe.id}`),
		total = document.querySelector(`#total_${coffe.id}`);
	let count = 0 || +localStorage.getItem(`coffe-id-${coffe.id}`);
	countTotal = 0 || +localStorage.getItem(`count-total`);
	total.className = 'num';
	total.textContent = +count > 0 ? +count : "";
	total.style.display = +count > 0 ? "flex" : "none";
	countTotal > 0 ? document.querySelector(".header-menu__link_basket").setAttribute("data-count", countTotal) : "";

	btnBuy.addEventListener('click', (e) => {
	//console.log(e.target);
	if(e.target) {
		console.log('done')
		console.log(countTotal)
		count++;
		countTotal+=1;
		localStorage.setItem(`coffe-id-${coffe.id}`, `${count}`)
		localStorage.setItem(`count-total`, `${countTotal}`)
		document.querySelector(".header-menu__link_basket").setAttribute("data-count", countTotal)
		btnBasket.classList.add('top');
		total.style.display = "flex";
		total.textContent = +count;
		
	}
	
});

};
const cardWrap = document.querySelector('.coffe__wrap');

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

//Бургер
const burg = document.querySelector('.header-burger'),
	burgMenu = document.querySelector('.header-menu'),
	header = document.querySelector('.header');

burg.onclick = () => {
	burg.classList.toggle('toggle');
	burgMenu.classList.toggle('toggle');
	header.classList.toggle('toggle');
};

//call
fetch('db.json')
	.then(data => data.json())
	.then(res => res.product.forEach(item => createCard(item)));


	
