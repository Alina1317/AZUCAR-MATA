const burg = document.querySelector('.header-burger'),
	burgMenu = document.querySelector('.header-menu'),
	header = document.querySelector('.header');

//header
burg.onclick = () => {
	burg.classList.toggle('toggle');
	burgMenu.classList.toggle('toggle');
	header.classList.toggle('toggle');
};

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