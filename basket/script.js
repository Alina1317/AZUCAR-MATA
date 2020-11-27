const burg = document.querySelector('.header-burger'),
	burgLine = document.querySelector('.header-menu'),
	header = document.querySelector('.header');

burg.onclick = () => {
	burg.classList.toggle('toggle');
	burgLine.classList.toggle('toggle');
	header.classList.toggle('toggle');
}