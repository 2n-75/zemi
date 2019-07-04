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
		<script src="//cdn.jsdelivr.net/npm/sortablejs@1.8.4/Sortable.min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/Vue.Draggable/2.20.0/vuedraggable.umd.min.js"></script>

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
					<?php include "./element/score__vuedraggable.php"; ?>

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
			<script src="./js/swiper.js"></script>
			<script src="./js/component/score.js"></script>

	</body>

</html>