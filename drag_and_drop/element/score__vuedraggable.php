<!--
横スクロールができる譜面
-->
<div id="score-component" class="swiper-container">
	<!-- Additional required wrapper -->
	<div class="swiper-wrapper">
		<!-- Slides -->
		<div class="swiper-slide">
			<score></score>
		</div>
		<div class="swiper-slide">
			<score></score>
		</div>
		<div class="swiper-slide">
			<score></score>
		</div>
		<div class="swiper-slide">
			<score></score>
		</div>
		<div class="swiper-slide">
			<score></score>
		</div>
	</div>
	<!-- pagination -->
	<div class="swiper-pagination"></div>

	<!-- navigation buttons -->
	<div class="swiper-button-prev"></div>
	<div class="swiper-button-next"></div>
</div>

<!-- vue template -->
<script type="text/x-template" id="score-template">
	<div>
		<!--出題エリア-->
		<section id="dropzone" class="dropzone relative flex-area">
			<div>
				<p class="middleLine"></p>
				<p id="timing-bar" class="timing-bar absolute">|</p>
				<div class="box--pos1 hint hint--half hidden"></div>
				<div id="blackbox" class="box--pos3 box--border blackbox"></div>
				<div class="box--pos3 hint hint--quater hidden"></div>
				<div class="box--pos4 hint hint--quater hidden"></div>
			</div>
			<!-- draggable items -->
			<div>
				<ul style="width: 100%; display: flex;">
					<draggable :options="{group:'ITEMS'}" class="flex-area">
						<li class="box" v-for="item, index in items" :key="item.no">{{item.name}}-(No.{{item.no}})</li>
					</draggable>
				</ul>
			</div>
		</section>

		<!--回答エリア-->
		<!-- draggable items -->
		<section class="flex-area relative">
			<ul>
				<draggable :options="{group:'ITEMS'}" class="flex-area">
					<li class="box" v-for="item, index in items2" :key="item.no">{{item.name}}-(No.{{item.no}})</li>
				</draggable>
			</ul>
			<div class="mg-10 btn-sound-frame">
				<div class="btn-circle btn-sound" onclick="playSound(2) , barActive()">
					<span><i class="fas fa-music"></i></span>
				</div>
			</div>
		</section>
	</div>
</script>
