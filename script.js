const burg = document.querySelector('.header-burger'),
	burgLine = document.querySelector('.header-menu'),
	header = document.querySelector('.header');

const buyBtn = document.querySelector('.coffe-shop__bye'),
	basketBtn = document.querySelector('.coffe-shop__add-basket');

burg.onclick = () => {
	burg.classList.toggle('toggle');
	burgLine.classList.toggle('toggle');
	header.classList.toggle('toggle');
}

document.onclick = e => {
	// console.log(e);
	// console.log(e.target);
	// console.log(e.target.classList);

	
};

buyBtn.onclick = e => {
	console.log(e);
	console.log(e.target);
}

//buyBtn.addEventListener('click', );

//basketBtn.addEventListener('click',);