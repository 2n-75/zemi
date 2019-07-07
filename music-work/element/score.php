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
		<section>
			<div id="dropzone" class="dropzone">
				<div class="relative flex-area" style="height: 100%;">
					<section>
						<p class="middleLine"></p>
						<div class="box--pos1 note--half"></div>
						<div class="box--pos2 hidden"></div>
						<div class="box--pos3 hidden"></div>
						<div class="box--pos4 note--quater"></div>
					</section>
					<section>
						<p id="timing-bar" class="timing-bar absolute">|</p>
						<div class="box--pos1 hint hint--half hidden"></div>
						<div id="blackbox" class="box--pos3 box--border blackbox"></div>
						<div class="box--pos3 hint hint--quater hidden"></div>
						<div class="box--pos4 hint hint--quater hidden"></div>
					</section>
				</div>
			</div>
		</section>
	</div>
</script>
