<template>
	<ul id="video-sub-menu" v-if="this.$store.getters.getVideoSubMenuOpen">
		<li class="video-sub-menu-item"
			v-for="(video, index) in filterVideos(videos)"
			@click="playVideo(video.src)"
		>
			<span class="video-title">
				{{ video.title }}
			</span>

			<span class="darrow" v-if="index === 0"></span>
		</li>
		<li class="video-sub-menu-item"
			v-if="otherVideos"
			v-for="ovideo in otherVideos"
			@click="playOtherVideo(ovideo.src)"
		>
			{{ ovideo.title }}
		</li>
	</ul>
</template>

<script>
export default {
    name: 'VideoSubMenu',
    data () {
        return {
            videos: this.$store.getters.getVideoSubMenuItems,
            otherVideos: this.$store.getters.getOtherVideoSubMenuItems,
            moduleType: this.$store.getters.getModuleType
        }
    },
    methods: {
        playVideo (src) {
            this.$store.commit('showPopupVideoPlayer')
            this.$store.commit('setPopupVideoPlayerSrc', src)
            this.$store.commit('closeMainMenu')
            this.$store.commit('toggleLightBox', 'fullMode')
        },
        playOtherVideo (src) {
            this.$store.commit('showPopupVideoPlayer')
            this.$store.commit('setPopupVideoPlayerSrc', src)
            this.$store.commit('closeMainMenu')
            this.$store.commit('toggleLightBox', 'fullMode')
        },
        filterVideos (videos) {
            if (this.moduleType === 'equipment') {
                return this.videos.filter((video, index) => {
                    return index !== 1
                })
            } else if (this.moduleType === 'concept') {
                return this.videos.filter((video, index) => {
                    return index !== 2
                })
            }
        }
    }
}
</script>


<style scoped>
ul#video-sub-menu {
	position: absolute;
    right: 168px;
    top: 37px;
    width: 220px;
    height: auto;
    background: #fff;
    list-style: none;
	-webkit-box-shadow: 10px 10px 16px -3px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 10px 10px 16px -3px rgba(0, 0, 0, 0.75);
    box-shadow: 10px 10px 16px -3px rgba(0, 0, 0, 0.75);
}

ul#video-sub-menu li.video-sub-menu-item {
	margin-left: -40px;
	text-indent: -11px;
	padding-left: 30px;
	padding-top: 9px;
    padding-bottom: 9px;
	z-index: 11;
}

ul#video-sub-menu li.video-sub-menu-item:hover {
	background-color: #dee0e2;
	color: #202021;
	cursor: pointer;
}

ul#video-sub-menu li > span.video-title {
	font-family: "Roboto-Medium";
    font-size: 14px;
}

ul#video-sub-menu li > span.darrow {
	height: 8px;
	width: 16px;
	float: right;
	margin-right: 5px;
	margin-top: 8px;
	background: url(/assets/img/icons/darrow.png);
	z-index: 11;
}
</style>
