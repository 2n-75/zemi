<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>Document</title>

		<!--script-->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script src="./js/library/Sortable/Sortable.min.js"></script>
		<script src="./js/animation.js"></script>
		<script src="./js/sound.js"></script>
		<!--stylesheet-->
		<link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.1/css/swiper.min.css">

		<link rel="stylesheet" href="./css/foundation/reset.css">
		<link rel="stylesheet" href="./css/layout/layout.css">
		<link rel="stylesheet" href="./css/object/objects.css">

	</head>

	<body>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.1/js/swiper.min.js"></script>
		<div class="container">
			<header>
				<div class="content_inner">
					<a href="" class="btn-circle">
						<span><i class="fas fa-arrow-left"></i></span>
						<!--トップページを作る-->
					</a>
					<div class="btn-circle f-right" onclick="showHint()">
						<span><i class="fas fa-exclamation"></i></span>
						<!--クリックしたらモーダルでヘルプを出す-->
					</div>
				</div>
			</header>
			<main>
				<div class="content_inner">
					<h3>？にあてはまるおんぷはどれかな</h3>
					<div class="swiper-container">
						<!-- Additional required wrapper -->
						<div class="swiper-wrapper">
							<!-- Slides -->
							<div class="swiper-slide">
								<?php include "./element/mainContent.php"; ?>
							</div>
							<div class="swiper-slide">
								<?php include "./element/mainContent.php"; ?>
							</div>
							<div class="swiper-slide">
								<?php include "./element/mainContent.php"; ?>
							</div>
							...
						</div>
						<!-- If we need pagination -->
						<div class="swiper-pagination"></div>

						<!-- If we need navigation buttons -->
						<div class="swiper-button-prev"></div>
						<div class="swiper-button-next"></div>
					</div>

					<!--回答エリア-->
					<section>
						<div class="flex-area relative">
							<div class="list-area flex-area mg-10">
								<div class="box box--border box--draggable note--half" id="note-half" draggable="true"></div>
								<div class="box box--border box--draggable note--quaterDot" id="note-quaterDot" draggable="true"></div>
								<div class="box box--border box--draggable note--quater" id="note-quater" draggable="true"></div>
								<div class="box box--border box--draggable note--eighth" id="note-eighth" draggable="true"></div>

							</div>
							<div class="mg-10 btn-sound-frame">
								<div class="btn-circle btn-sound" onclick="playSound(2) , barActive()">
									<span><i class="fas fa-music"></i></span>
								</div>
							</div>
						</div>
					</section>
					<!--操作パネル-->
					<section class="mess-area flex-area">
						<p class="mess"></p>
						<a href="" onclick="window.location.reload()">もういちど</a>
					</section>
				</div>

			</main>
			<footer>
				<div class="content_inner">
					footer
				</div>
			</footer>


			<!--scripts-->
			<script src="./js/index.js"></script>
			<script>
			var mySwiper = new Swiper('.swiper-container', {
				loop: true,
				slidesPerView: 2,
				spaceBetween: 10,
				centeredSlides: true,
				pagination: '.swiper-pagination',
				nextButton: '.swiper-button-next',
				prevButton: '.swiper-button-prev',
				breakpoints: {
					767: {
						slidesPerView: 1,
						spaceBetween: 0
					}
				}
			})
			</script>
	</body>

</html>
