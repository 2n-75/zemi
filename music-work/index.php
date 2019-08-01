<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>Document</title>

		<!--script-->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>

		<script src="./js/object/animation.js"></script>
		<script src="./js/object/sound.js"></script>

		<!--stylesheet-->
		<link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.4.6/css/swiper.min.css">
		<link rel="stylesheet" href="./css/foundation/reset.css">
		<link rel="stylesheet" href="./css/layout/layout.css">
		<link rel="stylesheet" href="./css/object/objects.css">

	</head>

	<body>
		<div class="container">
			<header>
				<div class="content__inner">
					<a href="./top.php" class="btn-circle">
						<span><i class="fas fa-arrow-left"></i></span>
						<!--トップページを作る-->
					</a>
					<div id="hintBtn" class="btn-circle f-right">
						<span><i class="fas fa-exclamation"></i></span>
						<!--クリックしたらモーダルでヘルプを出す-->
					</div>
				</div>
			</header>
			<main>
				<div class="content__inner">
					<h3>？にあてはまるおんぷはどれかな</h3>
					<?php include "./element/score__template.php" ?>

					<section class="mess-area flex-area">
						<p class="mess"></p>
					</section>
				</div>
			</main>
			<footer>
				<div class="content__inner">
				</div>
			</footer>

			<!--scripts-->
			<script type="module" src="./js/object/hint.js"></script>
			<script type="module" src="./js/component/score.js"></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.4.6/js/swiper.min.js"></script>
			<script type="module" src="./js/object/swiper.js"></script>

	</body>

</html>
