const burg = document.querySelector('.header-burger'),
	burgMenu = document.querySelector('.header-menu'),
	header = document.querySelector('.header');
const minus = document.getElementById('minus'),
	plus = document.getElementById('plus');
let	num = document.getElementById('num'),
	subtotal = document.getElementById('subtotal'),
	total = document.getElementById('total'),
	count = 1;
let storage = [];
	let totalPrice = null;

const continueBtn = document.getElementById('continue'),
	deliveryBlock = document.getElementById('delivery'),
	deliveryBtn = document.querySelectorAll('.transfer'),
	pickupBtn = document.getElementById('pickup-btn'),
	pickupAddress = document.getElementById('pickup-address'),
	spainBtn = document.getElementById('spain-btn'),
	modalBlock = document.querySelectorAll('.modal'),
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

function error () {
	alert("error")
	localStorage.clear()
	window.location.reload()
}

function changeQuant (e) {
	const storageItem = e.currentTarget.parentElement.parentElement.id;
	let elementPrice = e.currentTarget.parentElement.nextElementSibling.getAttribute("data-price");
	let countTotalValue = +localStorage.getItem("count-total");
	let itemValue = +localStorage.getItem(storageItem);
	const price = +e.currentTarget.parentElement.nextElementSibling.getAttribute("data-price");
	price.toFixed(2)
	const setValue = (storageItem, value) => {
		localStorage.setItem(`${storageItem}`, value)
		e.target.parentElement.children[1].innerHTML = value
	};

	if (e.target.id === "plus") {
		itemValue+= 1
		setValue(storageItem, itemValue)
		totalPrice += price
		setTotalPrice(totalPrice, storageItem, elementPrice)
		changeCountTotal(++countTotalValue)
	}

	if (e.target.id === "minus" && itemValue !== 0) {
		itemValue-= 1
		setValue(storageItem, itemValue)
		totalPrice -= price
		setTotalPrice(totalPrice, storageItem, elementPrice)
		changeCountTotal(--countTotalValue)
	}
}

function changeCountTotal (value) {
	localStorage.setItem("count-total", value)
}

function setTotalPrice (totalPrice, elementId, elementPrice) {
	// проверка изменения цены через devtools
	if (elementId && elementPrice) {
		let itemInStorage = storage.filter(item => item.id == elementId);
		itemInStorage.length > 1 ?
			error() :
			itemInStorage[0].price !== +elementPrice ?
				window.location.reload() : "";
	}
	document.querySelector(".wrapper-price__total-price").innerHTML = totalPrice.toFixed(2)
}

const deleteCard = (e) => {
	const value = e.currentTarget.getAttribute("data-id");
	totalPrice-= e.currentTarget.parentElement.getAttribute("data-price") * localStorage.getItem(value)
	// totalPrice-= storage[0].price * localStorage.getItem(value)
	setTotalPrice(totalPrice)
	document.getElementById(value).remove()
	changeCountTotal(localStorage.getItem("count-total") - localStorage.getItem(value))
	localStorage.removeItem(value)
}	

const createCard = (coffe) => {
	let obj = {
		id: `coffe-id-${coffe.id}`,
		name: coffe.name,
		count: localStorage.getItem(`coffe-id-${coffe.id}`),
		price: coffe.price,
	}
	storage.push(obj)

	totalPrice+= +coffe.price * +localStorage.getItem(`coffe-id-${coffe.id}`);
	const card = document.createElement("div");
	card.id = `coffe-id-${coffe.id}`
	card.className = "wrapper-shop";
	card.innerHTML = `
		<div class="wrapper-shop__coffee">
			<a href="../product/?id=${coffe.id}">
				<img class="wrapper-shop__coffee-img" src="../assets/img/${coffe.name.replace(/ /g,"_")}/${coffe.images[0]}" alt="coffee">
			</a>
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
	document.querySelector(".wrapper-shop__total-delete").addEventListener("click", deleteCard)
	document.querySelector(".wrapper-shop__product-count").addEventListener("click", changeQuant)
	
}

//нажатие на кнопку и появление блока доставка
continueBtn.onclick = e => {
	deliveryBlock.className = 'wrapper-delivery';
	setTimeout(() => deliveryBlock.style.opacity = 1, 200)
}

deliveryBtnOnClick = (e) => {
let modal = e.currentTarget.nextElementSibling;
modalBlock.forEach(modal => {
	modal.classList.add('none')
	modal.classList.remove('opacity')
})
modal.classList.remove('none')
setTimeout(() => modal.classList.add('opacity'), 00)
}
deliveryBtn.forEach(button => button.addEventListener("click", deliveryBtnOnClick))

//нажатие на кнопку Proceed to payment и появление блока Payment
proceedBtn.forEach(item => {
	item.addEventListener('click', e => {
		paymentBlock.classList.toggle('none');
	})
});

 // получаем айдишники кофе из локалстор
const coffeeItems = [];
Object.keys(localStorage).forEach(item => {
	
	if (item.includes("coffe-id-")) {
		coffeeItems.push(+item.slice(9));
	}
})
//call

fetch('../db.json')
	.then(data => data.json())
	.then(res => coffeeItems.forEach(item => createCard(res.product[item])))
