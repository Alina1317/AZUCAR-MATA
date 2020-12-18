const burg = document.querySelector('.header-burger'),
	burgMenu = document.querySelector('.header-menu'),
	header = document.querySelector('.header');
const minus = document.getElementById('minus'),
	plus = document.getElementById('plus');
let	num = document.getElementById('num'),
	subtotal = document.getElementById('subtotal'),
	total = document.getElementById('total'),
	count = 1;

	let totalPrice = null;

const continueBtn = document.getElementById('continue'),
	deliveryBlock = document.getElementById('delivery'),
	pickupBtn = document.getElementById('pickup-btn'),
	pickupAddress = document.getElementById('pickup-address'),
	spainBtn = document.getElementById('spain-btn'),
	modalBlock = document.getElementById('modal'),
	europeBtn = document.getElementById('europe-btn'),
	modalForm = document.getElementById('modal-form'),
	proceedBtn = document.querySelectorAll('.proceed'),
	paymentBlock = document.getElementById('payment');

//бургер-меню
burg.onclick = () => {
	burg.classList.toggle('toggle');
	burgMenu.classList.toggle('toggle');
	header.classList.toggle('toggle');
};



//расчет стоимости товара
//const sumTotal = e => {
//	let sumPrice;
//	sumPrice = count * +subtotal;
//	subtotal.textContent = sumPrice;
//	total.textContent = sumPrice;
//};

//subtotal.addEventListener('mouseover', e => {
//	console.log(e);
//	console.log(e.target.textContent);
//	console.log(typeof(e.target.textContent));
//})
function setTotalPrice (totalPrice) {
	document.querySelector(".wrapper-price__total-price").innerHTML = totalPrice.toFixed(2);
}

const deleteCard = (e) => {
	const value = e.currentTarget.getAttribute("data-id");
	totalPrice-= e.currentTarget.parentElement.getAttribute("data-price") * localStorage.getItem(value)
	setTotalPrice(totalPrice)
	document.getElementById(value).remove()
	localStorage.setItem("count-total", localStorage.getItem("count-total") - localStorage.getItem(value))
	localStorage.removeItem(value)
}	

const createCard = (coffe) => {
	console.log(coffe)
	totalPrice+= +coffe.price * +localStorage.getItem(`coffe-id-${coffe.id}`);
	const card = document.createElement("div");
	card.id = `coffe-id-${coffe.id}`
	card.className = "wrapper-shop";
	card.innerHTML = `
		<div class="wrapper-shop__coffee">
			<img class="wrapper-shop__coffee-img" src="../assets/img/${coffe.name.replace(/ /g,"_")}/${coffe.images[0]}" alt="coffee">
		</div>
		<div class="wrapper-shop__product">
			<p class="wrapper-shop__product-text">${coffe.name}</p>
			<div class="wrapper-shop__product-count"> 
				<button class="wrapper-shop__product-minus" id="minus">-</button>
				<span class="wrapper-shop__product-quantity" id="num">
					${localStorage.getItem(`coffe-id-${coffe.id}`)}
				</span>
				<button class="wrapper-shop__product-plus" id="plus">+</button>
			</div>
			<div class="wrapper-shop__sort">
				<span class="wrapper-shop__sort-list">
					<input class="wrapper-shop__sort-ground sort" id="ground" type="checkbox">
					<label for="ground">Ground</label> 
				</span>
				<span class="wrapper-shop__sort-li">
					<input class="wrapper-shop__sort-beans sort" id="beans" type="checkbox">
					<label for="beans">Beans</label>
				</span>
			</div>
		</div>
		<div class="wrapper-shop__total" data-price=${coffe.price}>
			<div data-id= coffe-id-${coffe.id} class="wrapper-shop__total-delete">
				<svg class="svg-delete" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}</style></defs><g id="cross"><path class="cls-1" d="M7 7l18 18M7 25L25 7"/></g></svg> 
			</div>
			<p class="wrapper-shop__total-total" id="total">${coffe.price}&euro;</p>
		</div>
	`;

	document.querySelector(".wrapper-container").prepend(card);
	setTotalPrice(totalPrice)
	document.querySelector(".wrapper-shop__total-delete").addEventListener("click", deleteCard.bind(coffe))
	
}
 // получаем айдишники кофе из локалстор
const coffeeItems = [];
Object.keys(localStorage).forEach(item => {
	
	if (item.includes("coffe-id-")) {
		coffeeItems.push(+item.slice(9));
	}
})
console.log(coffeeItems)
//call
// createCard()

fetch('../db.json')
	.then(data => data.json())
	.then(res => coffeeItems.forEach(item => createCard(res.product[item])))
