<template>
	<div id="popup-video-player" v-if="this.$store.getters.getVideoPopupPlayerIsShown">
		<img id="video-close" src="/assets/img/icons/close_task.png" title="Close" @click="close"/>
		<div id="video-player">
			<iframe id="video-frame"
				:src="this.$store.getters.getVideoPopupPlayerSrc"
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
	</div>
</template>

<script>
import { unPause } from '../../core/audio-player'
export default {
    name: 'PopupVideoPlayer',
    methods: {
        close () {
            this.$store.commit('closePopupVideoPlayer')
            unPause()
            this.$store.commit('closeMainMenu')
        }
    }
}
</script>

<style scoped>
#popup-video-player {
	position: absolute;
	width: 760px;
	height: 404px;
	top: 140px;
	left: 120px;
	border: 2px solid #fff;
	background: #000;
	z-index: 15;
}

#video-frame {
	width: 760px;
	height: 404px;
}

#video-close {
    cursor: pointer;
    float: right;
    position: absolute;
    right: -33px;
    top: -2px;
    padding: 2px;
    border: 2px solid #fff;
}
</style>
