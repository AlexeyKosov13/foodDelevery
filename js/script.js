'use strict'

document.addEventListener('DOMContentLoaded', () => {
    // =======================tabs ==========================
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');
    
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    };
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    };

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                };
            });
        };
    });

    hideTabContent();
    showTabContent(1);

    //=======================timer =======================
    
    const deadline = '2022-10-17';

    function getTimeRremaining(endtime) { //функция вычисления остатка времени 
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
            
        }

    }
    
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {// вывод на экран
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        
        function updateClock() {
            const t = getTimeRremaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.timer <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    //==============modal window ======================================
    
    
    const modalBtn = document.querySelectorAll('[data-modal]'),
        closeBtn = document.querySelector('[data-close]'),
        modal = document.querySelector('.modal');
    
    function openModal() {// функция открытия модального окна
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modalBtn.forEach(btn => {// получаем все кнопки открытия модального окна
        btn.addEventListener('click', openModal);
    });

    function closeModal(a) { // фунуция закрытия модального окна
        modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal);// закрытие модального окна по кнопке

    modal.addEventListener('click', (e) => {// закрытие по щелчку на пустом поле
        if (e.target === modal) {
            closeModal();
        };
    });

    document.addEventListener('keydown', (e) => {// закрытие клавишей escape
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    })

    //const modalTimerId = setTimeout(openModal, 6000);// показ модального окна через 6 секунд

    function showModalByScroll() {//при скролле до конца страницы открывается модальное окно
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        };
    };

    window.addEventListener('scroll', showModalByScroll);
    

    //===============slider=============

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;
    
    let slideIndex = 1;
    let offset = 0;

    const showNumberSlide = () => {
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    };

    const setOpacity = () => {
        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = 1;
    };

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];

    //=добавляем блок с точками====
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);
    
//==добавляем точки==
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if (i == 0) {
            dot.style.opacity = 1;
        };
        indicators.append(dot);
        dots.push(dot);
    };

    //==клик вперед==
    next.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length -2)*(slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        showNumberSlide();

        setOpacity();
    });

    //==клик назад==
    prev.addEventListener('click', () => {
        if (offset == 0) {   
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        showNumberSlide();

        setOpacity();
    });


    //==клик по точкам==
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            setOpacity();
        });
    });

   

    




     //===============calculator=========
     const result = document.querySelector('.calculating__result span');
    let sex = 'female', age, weight, height, ratio = 1.375;

    function calcTotal() {
        if (!age||!sex||!weight||!height||!ratio) {
            result.textContent = '   ';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    };

    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                } else {
                    sex = e.target.getAttribute('id');
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
                calcTotal();
            });
        })

    };

    getStaticInformation('#gender', 'calculating__choose-item_active'); 
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active'); 

    function getDinamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }


            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;                  
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                    
                case 'age':
                    age = +input.value;       
                    break;
            }

            calcTotal();
        });

        
    };

    getDinamicInformation('#height');
    getDinamicInformation('#weight');
    getDinamicInformation('#age');
    

    //===========================cards ==============================
    class CardClass {  //создаем класс
        constructor(img, alt, title, descr, price, parentSelector, ...classes) {
            this.img = img;
            this.alt = alt;
            this.parent = document.querySelector(parentSelector);
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.transfer = 73;
            this.changeToRub();
        }
    changeToRub() {  // изменение валюты
        this.price = this.price * this.transfer;
    }

    render() {  // функция 
        const element = document.createElement('div');
        if (this.classes.length === 0) {
            this.element = 'menu__item';
            element.classList.add(this.element);
        } else {
            this.classes.forEach(className => element.classList.add(className)); 
        }
       
        element.innerHTML = `
        
                    <img src="${this.img}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
                
        `;
        this.parent.append(element);
    };

    
        
};
   new CardClass(
       "img/tabs/vegy.jpg",
       "vegy",
       'Меню "Фитнес"',
       'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
       9,
       '.menu .container',

    ).render();
    
    new CardClass(
        "img/tabs/elite.jpg",
        "vegy",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        13,
        '.menu .container',
        'menu__item',
       'big'
    ).render();
    
    new CardClass(
        "img/tabs/post.jpg",
        "vegy",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        7,
        '.menu .container',
        'menu__item',
       
    ).render();
    
    
});//domContent



// 1.высчитываем оставшееся время(часы минуты секунды) 2.получаем из дом места для вставки значений 3. вставляем значения времени в штмл 4. обновляем каждую секунду значения.5.если время 0 останавливаем счетчик.