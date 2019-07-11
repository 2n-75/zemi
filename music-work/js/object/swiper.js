var mySwiper = new Swiper('.swiper-container', {
	loop: false,
	slidesPerView: 1,
	spaceBetween: 10,
	centeredSlides: true,
	nextButton: '.swiper-button-next',
	prevButton: '.swiper-button-prev',
	pagination: '.swiper-pagination',
});

function click_next() {
	console.log("next");
}
function click_prev() {
	console.log("prev");
}
