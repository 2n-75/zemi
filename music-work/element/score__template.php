<div class="swiper-container">
	<div class="swiper-wrapper">
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
	<div class="swiper-button-prev"></div>
	<div class="swiper-button-next"></div>
</div>

<!-- vue template -->
<script type="text/x-template" id="score-template">
	<div style="width: 80%; margin: 0 10%">
		<!--出題エリア-->
		<section id="dropzone" class="dropzone">
			<div>
				<p class="middleLine"></p>
				<p id="timing-bar" class="timing-bar absolute">|</p>
				<div class="box absolute hint hidden" v-for="item, index in hints" v-bind:key="item.no" v-bind:class="item.className" v-bind:style="{left: item.boxPos + '%' }"></div>
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
				<div class="box box--border" v-for="item, index in items2" v-bind:key="item.no" v-bind:class="item.className" v-on:click="noteClick(item.length)"></div>
			</draggable>
			<div class="mg-10 btn-sound-frame">
				<div class="btn-circle btn-sound absolute" onclick="playSound(2) , barActive()">
					<span><i class="fas fa-music"></i></span>
				</div>
			</div>
		</section>
	</div>
</script>
