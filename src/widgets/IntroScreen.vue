<template>
	<div id="intro-screen" v-if="this.$store.getters.getIntroScreenIsShown">
    	<div id="skipBtn" @click="skip()" v-if="this.$store.getters.getIntroScreenIsShown"></div>
  	</div>
</template>

<script>
import StartUpScreensData from '../data/startup-screens-data.json'
import { playAudio } from '../sim-core/core/audio-player'

export default {
    name: 'IntroScreen',
    beforeMount() {
        this.$store.commit('introCompleted', false)
        this.$store.commit('hideIntroScreen')
        this.$store.commit('setAudioCompleted', false)
    },
    mounted() {
        playAudio(
            StartUpScreensData.introScreen.vo,
            StartUpScreensData.introScreen.cc,
            () => {
                this.skip()
            }
        )
    },
    methods: {
        skip() {
            if (this.$store.getters.getUseSafetyScreen === true) {
                this.$store.commit('hideIntroScreen')
                this.$store.commit('showSafetyScreen')
            } else {
                this.$store.commit('hideIntroScreen')
            }
        }
    }
}
</script>

<style scoped>
#intro-screen {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 20;
}

#skipBtn {
	position: absolute;
	top: 250px;
	left: 390px;
	width: 250px;
	height: 94px;
	cursor: pointer;
	border-radius: 5px;
	background: rgba(0, 0, 0, 0) url("/assets/img/buttons/horizontal/skip_intro.png") no-repeat scroll 0 0 / 100% auto;
    z-index: 22;
}

#skipBtn:active {
    background: rgba(0, 0, 0, 0) url("/assets/img/buttons/horizontal/skip_intro_over.png") no-repeat scroll 0 0 / 100% auto;
}

</style>
