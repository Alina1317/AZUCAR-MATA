const urlSearch = new URLSearchParams(window.location.search);

// создаем карту товара
const createCard = (coffe) => {
    // папка с картинками товара
    const folder = coffe.name.replace(/ /g,"_");
    let numberOfPic = 0;


    // рендер карты твоара
    document.querySelector('.product-product').innerHTML = `
        <div class="product-img">
            <div class="product-img__img"></div>
            <div class="product-img__slider"></div>
        </div>
        <div class="product-text">
            <h1 class="product-text__title">${coffe.name}</h1>
            <p class="product-text__price">${coffe.price}&euro;</p>
            <button class="product-text__btn">Add to cart</button>
            <a href="../basket/index.html"><button class="none">Go to cart</button></a>
            <div class="product-info">
                <p class="product-info__text">Product information</p>
                <div class="product-info__wrap">
                    <p class="product-info__list-set">${coffe.info_title}</p>
                    <ul class="product-info__list"></ul>
                    <p class="product-info__list-ps"> P.S. Please let us know if you need to grind coffee for you.</p>
                </div>
            </div>
        </div>
    `;
    // главная картинка
    const mainPic = document.querySelector('.product-img__img');
    mainPic.style.backgroundImage = `url(../assets/img/${folder}/${coffe.images[numberOfPic]})`;
    //клик по главной картинки
    mainPicClick = () => {
        numberOfPic === coffe.images.length-1 ?
            numberOfPic = 0 :
            numberOfPic++;
        document.querySelectorAll('.product-img__slider-img').forEach((element, index) => {
            numberOfPic === index ?
                element.classList.add('active') :
                element.classList.remove('active');
        });
        mainPic.style.backgroundImage = `url(../assets/img/${folder}/${coffe.images[numberOfPic]})`;
    }

// превью слайдера
    if (coffe.images.length > 1) {
        coffe.images.forEach((elemet, index) => {
            const image = document.createElement('img');
            image.className = 'product-img__slider-img';
            image.src = `../assets/img/${folder}/${elemet}`;
            image.alt = 'image';
            image.setAttribute('data-number', index)
            document.querySelector('.product-img__slider').append(image);
            // вешаем обработчик на картинку
            image.addEventListener('click', sliderItemsOnClick)

            // первая картинка подсвечивается
            if (index === 0) {
                image.classList.add('active')
            }
        });
    }
    // клик по превью слайдера
    function sliderItemsOnClick(e) {
        numberOfPic = +e.target.getAttribute('data-number');
        mainPic.style.backgroundImage = `url(${e.target.src})`;
        document.querySelectorAll('.product-img__slider-img').forEach((item, index) => {
            numberOfPic === index ?
                item.classList.add('active') :
                item.classList.remove('active')
        })
    }

    // описание товара
    coffe.description.forEach((text, index) => {
        const parent = document.querySelector('.product-info__list');
        const descriptionItem = document.createElement("li");
        descriptionItem.className = 'product-info__list-list';
        descriptionItem.textContent = `${text}${coffe.description.length === index + 1 ? '.' : ';'}`;
        parent.append(descriptionItem)
    });
    
    // события 
    mainPic.addEventListener("click", mainPicClick);

    //Клик по кнопке добавить в корзину и появление кнопки перейти в корзину
    const btnAddToCart = document.querySelector('.product-text__btn'),
        btnGoToCart = document.querySelector('.none');

        btnAddToCart.addEventListener('click', (e) => {
            // добавление в локалстор
            const setLocalStor = () => {
                localStorage.setItem(`coffe-id-${coffe.id}`, 1)
                // добавление общего счетчика или его изменение
                if (localStorage.getItem("count-total")) {
                    localStorage.setItem("count-total", +localStorage.getItem("count-total") + 1)
                    document.querySelector(".header-menu__link_basket").setAttribute("data-count", countTotal + 1)
                } else {
                    localStorage.setItem("count-total", 1)
                    document.querySelector(".header-menu__link_basket").setAttribute("data-count", 1)
                }
                // !localStorage.getItem("count-total") ?
                //     localStorage.setItem("count-total", 1) :
                //     localStorage.setItem("count-total", +localStorage.getItem("count-total") + 1)
                
            }
        // проверка есть ли товар уже в корзине
            localStorage.getItem(`coffe-id-${coffe.id}`) > 0 ?
                alert("already in the cart") :
                setLocalStor()

        btnGoToCart.className = 'product-basket__btn';
        btnGoToCart.classList.add('go');
    });
}

// получаем базу данных из json
if (urlSearch.has("id")) {
    const cofeeId = urlSearch.get('id');
    // запускаем рендер товара по id
    fetch('../db.json')
        .then(data => data.json())
        .then(res => createCard(res.product[cofeeId]));  
}
// счетчик в корзину
let countTotal = 0 || +localStorage.getItem(`count-total`);
countTotal > 0 ? document.querySelector(".header-menu__link_basket").setAttribute("data-count", countTotal) : "";

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


