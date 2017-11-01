<template>
    <div id="videoplayer">
        <iframe id="videoFrame"
				:src="this.$store.getters.getVideoSource"
				scrolling="no"
				frameBorder="0"
				allowfullscreen
				webkitallowfullscreen
				mozallowfullscreen
				oallowfullscreen
				msallowfullscreen
		>
			Browser not compatible.
		</iframe>
    </div>
</template>

<script>
export default {
    name: 'VideoPlayer'
}
</script>

<style scoped>
#videoplayer {
	position: absolute;
	width: 760px;
	height: 404px;
	top: 65px;
	left: 120px;
	border: 2px solid #fff;
	background: #000;
	display: block;
}

#videoFrame {
	width: 760px;
	height: 404px;
}
</style>
