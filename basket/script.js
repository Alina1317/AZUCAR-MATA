const burg = document.querySelector('.header-burger');
const burgMenu = document.querySelector('.header-menu');
const header = document.querySelector('.header');
const minus = document.getElementById('minus');
const plus = document.getElementById('plus');
let	num = document.getElementById('num');
const subtotal = document.getElementById('subtotal');
const total = document.getElementById('total');
let count = 1;
let storage = {};
let totalPrice = null;
// let deliveryPrice = {};
// счетчик в корзинку
let countTotal = 0 || +localStorage.getItem(`count-total`);
countTotal > 0 ?
	document.querySelector(".header-menu__link_basket").setAttribute("data-count", countTotal) :
	emptyBasket();

const wrapperBasket = document.querySelector('.wrapper-basket'),
	wrapperPriceTotal = document.querySelector('.wrapper-price__total'),
	wrapperContinueBtn = document.querySelector('.wrapper-continue'),
	continueBtn = document.getElementById('continue'),
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

function emptyBasket (type) {
	document.querySelector(".wrapper-container").classList.toggle("none")
	document.querySelector(".wrapper-basket").classList.toggle("none")
	type === "detete" ? deliveryBlock.remove() : ""
}

function innerDeliveryPrice (json_price) {
	const spain = document.querySelector("#delivery-price_spain");
	const europe = document.querySelector("#delivery-price_europe");
	const free =  document.querySelector("#delivery-price_free");
	spain.textContent = json_price.spain + "€"
	europe.textContent = json_price.europe + "€"

	function clickOnDelivery (price) {
		finalTotalPrice = totalPrice + price
		setTotalPrice(finalTotalPrice)
		document.querySelectorAll(".wrapper-shop__total-delete").forEach(el => el.removeEventListener("click", deleteCard))
		document.querySelectorAll(".wrapper-shop__product-count").forEach(el => el.removeEventListener("click", changeQuant))
		const CloseModal = () => {
			document.querySelectorAll(".wrapper-shop__total-delete").forEach(el => el.addEventListener("click", deleteCard))
			document.querySelectorAll(".wrapper-shop__product-count").forEach(el => el.addEventListener("click", changeQuant))
			deliveryBlock.classList.remove('wrapper-delivery');
			deliveryBlock.classList.add("none")
			setTotalPrice(totalPrice)
			modalBlock.forEach(el => {el.classList.remove("opacity"); el.classList.add("none")})
			// window.location.reload()
		}
		document.querySelectorAll(".modal__close").forEach(el => el.addEventListener("click", CloseModal))
	}

	spain.parentElement.onclick = (e) => {
		clickOnDelivery(json_price.spain)
		setTotalPrice(finalTotalPrice)
	}
	europe.parentElement.onclick = (e) => {
		clickOnDelivery(json_price.europe)
		setTotalPrice(finalTotalPrice)
	}
	free.parentElement.onclick = (e) =>{
		clickOnDelivery(0)
		setTotalPrice(totalPrice)
	}
}

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
		storage[storageItem].count = value;
	};

	if (e.target.id === "plus") {
		itemValue+= 1
		setValue(storageItem, itemValue)
		totalPrice += price
		setTotalPrice(totalPrice, storageItem, elementPrice)
		changeCountTotal(++countTotalValue)
	}

	if (e.target.id === "minus" && itemValue !== 0) {

		if (itemValue === 2) {
			const checkboxBeans = document.querySelector(`#beans_${storageItem.slice(-1)}`);
			const checkboxGround = document.querySelector(`#ground_${storageItem.slice(-1)}`);
			storage[storageItem].ground = 1;
			storage[storageItem].beans = 0;
			checkboxBeans.checked = false;
			checkboxGround.checked = true;
		}

		itemValue-= 1
		setValue(storageItem, itemValue)
		totalPrice -= price
		setTotalPrice(totalPrice, storageItem, elementPrice)
		changeCountTotal(--countTotalValue)
	}
}

function changeCountTotal (value) {
	localStorage.setItem("count-total", value)
	document.querySelector(".header-menu__link_basket").setAttribute("data-count", value)
}

function setTotalPrice (totalPrice, elementId, elementPrice) {
	// проверка изменения цены через devtools
	if (elementId && elementPrice) {
		storage[elementId].price !== +elementPrice ?
		window.location.reload() : "";
	}
	document.querySelector(".wrapper-price__total-price").innerHTML = totalPrice.toFixed(2)
}

const deleteCard = (e) => {
	const value = e.currentTarget.getAttribute("data-id");
	totalPrice-= e.currentTarget.parentElement.getAttribute("data-price") * localStorage.getItem(value)
	// totalPrice-= storage[0].price * localStorage.getItem(value)
	setTotalPrice(totalPrice, value, e.currentTarget.parentElement.getAttribute("data-price"))
	document.getElementById(value).remove()
	changeCountTotal(localStorage.getItem("count-total") - localStorage.getItem(value))
	localStorage.removeItem(value);

	//удаление блока доставки про пустой корзине
	localStorage.getItem("count-total") == 0 ? emptyBasket("delete") : ""
}	

const createCard = (coffe) => {
	// если только ground или только beans - true
	const isChecked = !(coffe.ground && coffe.beans) && (coffe.ground || coffe.beans);

	const innerCheckbox = (type) => {
		return (
			`<span class="wrapper-shop__sort-list">
					<input name="order" required class="wrapper-shop__sort-ground sort" id=${type + "_" + coffe.id}  ${isChecked ? "disabled": ""} ${isChecked || type === "ground" ? "checked='checked'":""} type="checkbox">
					<label for=${type + "_" + coffe.id}>${type === "ground" ? "Ground" : "Beans"}</label> 
			</span>`
		)
	}

	let storageItemId = `coffe-id-${coffe.id}`
	let storageItem = {
		name: coffe.name,
		count: localStorage.getItem(`coffe-id-${coffe.id}`),
		price: coffe.price,
	}
		
	if (isChecked) {
		if (coffe.ground) {
			storageItem.ground = 1
		} else if (coffe.beans) {
			storageItem.beans = 1
		}
	}

	if (coffe.ground && coffe.beans) {
		storageItem.ground = 1
	}

	storage[storageItemId] = storageItem;
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
			<div data-id=coffe-id-${coffe.id} class="wrapper-shop__sort ${coffe.ground || coffe.beans ? "checkbox-listener": ""}">
				${coffe.ground ? innerCheckbox("ground") : ""}
				${coffe.beans ? innerCheckbox("beans") : ""}
				
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
	coffe.ground && coffe.beans ? document.querySelector(".checkbox-listener").addEventListener("change", choiceTypeCoffe) : ""
	
}
choiceTypeCoffe = (e) => {
	const parentOfCheckboxs  = e.target.parentElement.parentElement;
	const storageItemId = storage[parentOfCheckboxs.getAttribute("data-id")];
	const CurrentCheckbox = e.target;
	const checkboxBeans = document.querySelector(`#beans_${parentOfCheckboxs.getAttribute("data-id").slice(-1)}`);
	const checkboxGround = document.querySelector(`#ground_${parentOfCheckboxs.getAttribute("data-id").slice(-1)}`);

	if (+storageItemId.count < 2) {
		checkboxBeans.checked = false;
		checkboxGround.checked = false;
		CurrentCheckbox.checked = true;
		storageItemId.beans = 0;
		storageItemId.ground = 0;
		storageItemId[CurrentCheckbox.id.slice(0,-2)] = 1;
		
	} else {
		if (CurrentCheckbox.checked) {
			storageItemId[CurrentCheckbox.id.slice(0,-2)] = +CurrentCheckbox.checked
		} else {
			checkboxBeans.checked = true;
			checkboxGround.checked = true;
			CurrentCheckbox.checked = false;
			storageItemId[checkboxBeans.id.slice(0,-2)] = 1;
			storageItemId[checkboxGround.id.slice(0,-2)] = 1;
			storageItemId[CurrentCheckbox.id.slice(0,-2)] = 0;
		}
	}
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
setTimeout(() => modal.classList.add('opacity'), 100)
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
	.then(res => {
		coffeeItems.forEach(item => createCard(res.product[item]));
		innerDeliveryPrice(res.delivery_price);
	})
