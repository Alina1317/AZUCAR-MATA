const burg = document.querySelector('.header-burger'),
	burgMenu = document.querySelector('.header-menu'),
	header = document.querySelector('.header');
const minus = document.getElementById('minus'),
	plus = document.getElementById('plus');
let	num = document.getElementById('num'),
	subtotal = document.getElementById('subtotal'),
	total = document.getElementById('total'),
	count = 1;

const sortCheckbox = document.querySelectorAll('.sort'),
	continueBtn = document.getElementById('continue'),
	deliveryBlock = document.getElementById('delivery'),
	deliveryBtn = document.querySelectorAll('.transfer'),
	noneBlock = document.querySelectorAll('.none'),
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

// Найти все ссылки начинающиеся на #
const anchors = document.querySelectorAll('a[href^="#"]')

// Цикл по всем ссылкам
for(let anchor of anchors) {
  anchor.addEventListener('click', function(e) {
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

//счетчик на кнопках - / +
plus.addEventListener('click', e => {
	if (e.target) {
		count++;
		num.textContent = count;
	}
});

minus.addEventListener('click', e => {
	if (e.target) {
		if(count === 0) {
			num.textContent = count;
		} else {
			count--;
			num.textContent = count;
		}
	}
});


//нажатие на кнопку и появление блока доставка
continueBtn.onclick = e => {
		deliveryBlock.className = 'wrapper-delivery';
		setTimeout(() => deliveryBlock.style.opacity = 1, 100)
}

deliveryBtn.forEach(item => {
	item.onclick = e => {
		if(e.target === pickupBtn) {
			pickupAddress.classList.remove('none');
			modalBlock.classList.add('none');
			modalForm.classList.add('none');
		} else if (e.target === spainBtn) {
			modalBlock.classList.remove('none');
			pickupAddress.classList.add('none');
			modalForm.classList.add('none');
		} else {
			modalForm.classList.remove('none');
			pickupAddress.classList.add('none');
			modalBlock.classList.add('none');
		}
	}
	// console.log(modalBlock);
})

//нажатие на кнопку pickup и появление адреса
// pickupBtn.addEventListener('click', e => {
// 	pickupAddress.classList.toggle('none');
// });

//нажатие на кнопку spain и появление формы
// spainBtn.addEventListener('click', e => {
// 	modalBlock.classList.toggle('none');
// });

//нажатие на кнопку europe и появление формы
// europeBtn.addEventListener('click', e => {
// 	modalForm.classList.toggle('none');
// });

//нажатие на кнопку Proceed to payment и появление блока Payment
proceedBtn.forEach(item => {
	item.addEventListener('click', e => {
		paymentBlock.classList.toggle('none');
	})
});
