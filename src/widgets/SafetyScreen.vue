<template>
 	<div id="safety-screen" v-if="this.$store.getters.getSafetyScreenIsShown">
	    <div id="safety-screen-content">
	       	{{ p1 }} <br><br> {{ p2 }}
            <br><br>
	       	<span class="acknowledge-copy">{{ acknowledge }}</span>
			<br><br>
	       	<div id="safe-start" v-show="btnIsShown" @click="$emit('isClosed'); close()" title="Continue"></div>
   		</div>
  	</div>
</template>

<script>
import StartUpScreensData from '../data/startup-screens-data.json'
import { playAudio } from '../sim-core/core/audio-player'

export default {
    name: 'SafetyScreen',
    data() {
        return {
            btnIsShown: false,
            p1: StartUpScreensData.safetyScreen.p1,
            p2: StartUpScreensData.safetyScreen.p2,
            acknowledge: StartUpScreensData.safetyScreen.acknowledge,
            vo: StartUpScreensData.safetyScreen.vo,
            isClosed: false
        }
    },
    mounted() {
        // Check to see if we show the continue button at the start or only
        // after the vo is completed. This is based on the module viersion.
        if (this.$store.getters.getModuleVersion === 'Gold' || this.$store.getters.getModuleVersion === 'Final') {
            this.btnIsShown = false
        } else {
            this.btnIsShown = true
        }

        playAudio(this.vo, '')
    },
    methods: {
        close() {
            this.$store.commit('hideSafetyScreen')
            this.isClosed = true
            this.$store.commit('showCarVideoScreen')
        }
    }
}
</script>

<style scoped>
#safety-screen {
    position: absolute;
	top: -30px;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 20;
}

#safety-screen-content {
    background: white none repeat scroll 0 0;
    bottom: 0;
    box-shadow: 3px 3px 10px;
    font-family: Roboto-Regular;
    font-size: 18px;
    height: 336px;
    left: 0;
    line-height: 1.2;
    margin: auto;
    padding: 20px;
    position: absolute;
    right: 0;
    top: 0;
    width: 400px;
    z-index: 20;
    text-align: left;
    color: #000000;
}
#safe-start {
    background: rgba(0, 0, 0, 0) url("/assets/img/buttons/horizontal/continue.png") repeat scroll 0 0 / 100% 100%;
    height: 32px;
    left: 122px;
    position: relative;
    top: 0;
    width: 150px;
	cursor: pointer;
}

#safe-start:active {
	background: rgba(0, 0, 0, 0) url("/assets/img/buttons/horizontal/continue_over.png") repeat scroll 0 0 / 100% 100%;
    height: 32px;
    left: 122px;
    position: relative;
    top: 0;
    width: 150px;
	cursor: pointer;
}

.acknowledge-copy {
   color:#D11F27;
}
</style>
