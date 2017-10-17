<template>
    <div id="videoplayer" 
	v-bind:class="{ 'videoplayer': divClass, 'videoplayerDefault': !divClass }"  
	  >
        <iframe id="videoFrame" 
		v-bind:class="{ 'videoFrame': iframeClass, 'videoFrameDefault': !iframeClass }" 
		 
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
    name: 'VideoPlayer',
    props: ['divClass', 'iframeClass'],
    mounted() {
		// TODO, need to look for an alternative,
        this.videoDOM = window.setTimeout(() => {
            this.$emit('load')
        }, 1000)
    },
    methods: {
        ended: function () {
            console.log('VIdeo 3.............')
        },
        loaded: function() {
            console.log('loaded')
        }
    }
}
</script>

<style scoped>
.videoplayerDefault {
	position: absolute;
	width: 760px;
	height: 404px;
	top: 65px;
	left: 120px;
	border: 2px solid #fff;
	background: #000;
	display: block;
}

.videoFrameDefault {
	width: 760px;
	height: 404px;
	position: relative;
	z-index: 9;
}
.videoplayer {
	position: absolute;
	width: 1000px;
	height: 576px;
	top: 0;
	left: 0;
	border: 2px solid #fff;
	background: #000;
	display: block;
}

.videoFrame {
	width: 100%;
	height: 100%;
	position: relative;
	z-index: 9;
}
</style>
