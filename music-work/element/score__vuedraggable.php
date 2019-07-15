<!-- Slider main container -->
<div class="swiper-container">
	<!-- Additional required wrapper -->
	<div class="swiper-wrapper">
		<!-- Slides -->
		<div class="swiper-slide">
			Slide 1
			<score></score>
		</div>
		<div class="swiper-slide">
			Slide 2
			<score></score>
		</div>
		<div class="swiper-slide">
			Slide 3
			<score></score>
		</div>
		...
	</div>
	<!-- If we need pagination -->
	<div class="swiper-pagination"></div>

	<!-- If we need navigation buttons -->
	<div class="swiper-button-prev"></div>
	<div class="swiper-button-next"></div>
</div>

<!-- vue template -->
<script type="text/x-template" id="score-template">
	<div>
		<!--出題エリア-->
		<section id="dropzone" class="dropzone">
			<div>
				<p class="middleLine"></p>
				<p id="timing-bar" class="timing-bar absolute">|</p>
				<div class="box--pos1 hint hint--half hidden"></div>
				<div id="blackbox" class="box--pos3 box--border blackbox"></div>
				<div class="box--pos3 hint hint--quater hidden"></div>
				<div class="box--pos4 hint hint--quater hidden"></div>
			</div>
			<!-- draggable items -->

			<draggable :options="{group:'ITEMS'}" class="dropzone__inner flex-area">
				<div class="box absolute" v-for="item, index in items" v-bind:key="item.no" v-bind:class="item.className" v-bind:style="{left: item.boxPos + '%' }"></div>
			</draggable>
		</section>

		<!--回答エリア-->
		<!-- draggable items -->
		<section class="relative">
			<draggable :options="{group:'ITEMS'}" class="flex-area">
				<div class="box box--border" v-for="item, index in items2" v-bind:key="item.no" v-bind:class="item.className" ref="answerParts"></div>
			</draggable>
			<div class="mg-10 btn-sound-frame">
				<div class="btn-circle btn-sound" onclick="playSound(2) , barActive()">
					<span><i class="fas fa-music"></i></span>
				</div>
			</div>
		</section>
	</div>

</script>
