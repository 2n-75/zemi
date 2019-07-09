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
	<div class="swiper-button-prev" onClick="click_prev()"></div>
	<div class="swiper-button-next" onClick="click_next()"></div>
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
				<draggable :options="{group:'ITEMS'}" class="flex-area">
					<div class="box" v-for="item, index in items" :key="item.no" v-bind:class="item.className" ref="questionParts"></div>
				</draggable>
			</div>
		</section>

		<!--回答エリア-->
		<!-- draggable items -->
		<section class="flex-area relative">
			<draggable :options="{group:'ITEMS'}" class="flex-area">
				<div v-for="item, index in items2" :key="item.no" class="box box--border" v-bind:class="item.className" ref="answerParts"></div>
			</draggable>
			<div class="mg-10 btn-sound-frame">
				<div class="btn-circle btn-sound" onclick="playSound(2) , barActive()">
					<span><i class="fas fa-music"></i></span>
				</div>
			</div>
		</section>
	</div>

</script>
