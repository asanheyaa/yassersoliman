// burger-menu
const openButton = document.querySelector('.burger-menu'),
	closeButton = document.querySelector('.header-menu__close-menu'),
	headerMenu = document.querySelector('.header-menu'),
	header = document.querySelector('.header'),
	scrollTopButton = document.querySelector('[data-js-scroll-top-button]');
openButton.addEventListener('click', openMenu);
closeButton.addEventListener('click', closeMenu);

function openMenu(e) {
	headerMenu.classList.add('_active')
	header.classList.add('_active')
	document.body.classList.add('_lock');
}
function closeMenu(e) {
	headerMenu.classList.remove('_active')
	header.classList.remove('_active')
	document.body.classList.remove('_lock');
}

// scroll top on the click

scrollTopButton.addEventListener('click', scrollTopFunction)


function scrollTopFunction(e) {
	window.scroll({
		top: 0,
		behavior: 'smooth'
	});
}
// swiper reviews
const swiperReviewsWrapper = document.querySelector('.content-reviews__swiper');
const swiperReviews = new Swiper(swiperReviewsWrapper, {
	loop: true,
	slidesPerView: 1,
	spaceBetween: 30,
	slidesPerGroup: 1,
	speed: 1000,
	autoHeight: true,
	autoplay: {
		delay: 5000,
		pauseOnMouseEnter: true,
		disableOnInteraction: false
	},
	navigation: {
		nextEl: '.header-reviews__button-next',
		prevEl: '.header-reviews__button-prev',
	},


	breakpoints: {

		992: {
			slidesPerView: 2,
			spaceBetween: 0,
			slidesPerGroup: 2,
			speed: 2000,
			keyboard: true,


		}
	}


});


// tabs function

function tabsFunction() {
	const filters = document.querySelectorAll('[data-filter]');

	if (filters) {
		filters.forEach(filter => {
			const filterButtons = filter.querySelectorAll('[data-filter-category]'),
				filterSections = filter.querySelectorAll('[data-filter-content]')

			filterButtons.forEach(filterButton => {

				filterButton.addEventListener('click', (e) => {

					filterSections.forEach(filterSection => {
						if (filterSection.classList.contains('_show')) {
							filterSection.classList.remove('_show')
						}
						if (filterSection.classList.contains('_last-child')) {
							filterSection.classList.remove('_last-child')
						}

					});

					filterButtons.forEach(filterButton => {
						if (filterButton.classList.contains('_active')) {
							filterButton.classList.remove('_active')
						}
					});

					let seflButton = e.target,
						buttonId = seflButton.dataset.filterCategory

					if (buttonId === 'all') {
						filterSections.forEach((filterSection, index) => {
							filterSection.classList.add('_show')
							if (index === filterSections.length - 1) {
								filterSection.classList.add('_last-child')
							}
						});

					} else {
						const sectionsWithRightCategory = document.querySelectorAll(`[data-filter-content="${buttonId}"]`)

						sectionsWithRightCategory.forEach((sectionWithRightCategory, index) => {
							sectionWithRightCategory.classList.add('_show')
							if (index === sectionsWithRightCategory.length - 1) {
								sectionWithRightCategory.classList.add('_last-child')
							}
						});
					}

					seflButton.classList.add('_active')

				})
			});


		});
	}

}

tabsFunction()




// sroll page to the section on click of menu link
const scrollButtons = document.querySelectorAll('[data-scroll-link]');

if (scrollButtons) {

	scrollButtons.forEach(scrollButton => {
		scrollButton.addEventListener('click', (e) => {
			e.preventDefault()
			closeMenu()
			let id = scrollButton.getAttribute('href').replace('#', '');
			const currentTarget = document.getElementById(`${id}`);
			let elemPaddingTop = window.getComputedStyle(currentTarget, null).getPropertyValue("padding-top").replace('px', '')
			let topDistance = (currentTarget.offsetTop - header.offsetHeight) + (+elemPaddingTop / 2);
			window.scroll({
				top: topDistance,
				behavior: 'smooth'
			});
		})
	});
}





window.addEventListener('scroll', (e) => {

	onScrollSelectedMenuItem()

	stopStartSwiperAutoplay()
	showScrollTopButton()
})

// selected menu link on enter to the section
function onScrollSelectedMenuItem() {
	const sections = document.querySelectorAll('[data-menu-selected-section]');
	if (sections) {
		let itemsless = []
		sections.forEach(section => {
			if (section.getBoundingClientRect().top - (window.innerHeight / 1.5) < 0 && section.getBoundingClientRect().top + section.offsetHeight > 0) {
				itemsless.push(section);
			}
			const id = section.id;
			if (id) {
				const currentLink = header.querySelector(`[href='#${id}']`);
				if (currentLink.classList.contains('_active')) {
					currentLink.classList.remove('_active')
				}
			}
		});


		let lastElem = itemsless.slice(-1)[0];
		if (lastElem) {
			const id = lastElem.id;
			const currentLink = header.querySelector(`[href='#${id}']`);
			currentLink.classList.add('_active')
		}
	}
}

// swiper stop/resume autoplay

function stopStartSwiperAutoplay() {
	if (swiperReviewsWrapper) {
		if (swiperReviewsWrapper.getBoundingClientRect().top - (window.innerHeight / 1.5) < 0 && swiperReviewsWrapper.getBoundingClientRect().top + swiperReviewsWrapper.offsetHeight > 0) {
			swiperReviews.autoplay.start()
		} else {

			swiperReviews.autoplay.stop()
		}
	}
}


function showScrollTopButton() {
	if (scrollTopButton) {
		let scollDistance = window.scrollY

		if (scollDistance > window.innerHeight) {
			scrollTopButton.classList.add('_show')
			console.log(scollDistance);

		} else {
			scrollTopButton.classList.remove('_show')
		}
	}
}

