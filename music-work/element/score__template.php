<div id="score-component" class="score-container">
	<score v-for="question in questions" v-bind:key="question.id" v-bind:question="question">
	</score>
	<div class="">
		<div class="text-center">
			<div class="resultText__wrapper">
				<p>おつかれさまでした！</p>
				<p id="resultText">結果</p>
				<div class="btn-square__wrapper text-center">
					<a href="./top.php" class="btn-square">もどる</a>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- vue template -->
<script type="text/x-template" id="score-template">
	<div class="score">
			<!--出題エリア-->
			<section id="dropzone" class="dropzone">
				<div>
					<p class="middleLine"></p>
					<p id="timing-bar" class="timing-bar absolute">|</p>
					<div class="box absolute hint hidden" v-for="item, index in hints" v-bind:key="item.no" v-bind:class="item.className" v-bind:style="{left: item.boxPos + '%' }"></div>
				</div>

				<draggable @update="noteSelected" tag="ul" class="dropzone__inner flex-area" :list="items">
					<li class="box absolute" v-for="item, index in items" v-bind:key="item.no" v-bind:class="item.className" v-bind:style="{left: item.boxPos + '%' }"></li>
				</draggable>
			</section>

			<!--回答エリア-->
			<section class="relative">
				<draggable @update="noteSelected" tag="ul" :list="items2">
					<li class="box box--border" v-for="item, index in items2" v-bind:key="item.no" v-bind:class="item.className"></li>
				</draggable>
				<div class="mg-10 btn-sound-frame">
					<!--
						<div class="btn-circle btn-sound absolute" onclick="playSound(2) , barActive()">
						<span><i class="fas fa-music"></i></span>
					</div>
				-->
				</div>
			</section>
			<!--
				<section class="review hidden" style="margin: 10px">
				<p style="color: #555">この問題はどうでしたか？</h3>
				<div class="flex-area">
					<div class="btn-square__wrapper text-center">
						<span id="easy" class="btn-square" v-on:click="btnClick">かんたんだった</span>
					</div>
					<div class="btn-square__wrapper text-center">
						<span id="normal" class="btn-square" v-on:click="btnClick">ちょうどいい</span>
					</div>
					<div class="btn-square__wrapper text-center">
						<span id="hard" class="btn-square" v-on:click="btnClick">むずかしかった</span>
					</div>
				</div>
			</section>
			-->
	</div>
</script>
