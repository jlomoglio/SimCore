<template>
	<div id="light-box"
		 v-bind:class="this.$store.getters.getLightBoxMode"
		 v-if="this.$store.getters.getLightBoxIsShown"
		 @click="closeMenu()"
	>
	</div>
</template>

<script>
import { unPause } from '../../core/audio-player'
export default {
    name: 'LightBox',
    methods: {
        closeMenu () {
            unPause()
            if (this.$store.getters.getLightBoxMode === 'menuMode') {
                if (this.$store.getters.getMainMenuOpen === true) {
                    this.$store.commit('toggleMainMenu')
                } else if (this.$store.getters.getSiMenuOpen === true) {
                    this.$store.commit('toggleSiMenu')
                }
            }
        }
    }
}
</script>

<style scoped>
#light-box {
	position: absolute;
	left: 50%;
    margin-left: -500px;
	width: 1000px;
	background: rgba(0, 0, 0, 0.50) none repeat scroll 0 0;
}

.menuMode {
	top: 75px;
	height: 550px;
	z-index: 12;
}

.fullMode {
	top: 45px;
	height: 580px;
	z-index: 12;
}

.defaultMode {
	top: 45px;
	height: 580px;
	z-index: 10;
}

.activityMode {
	top: 45px;
	height: 580px;
	z-index: 1;
}
</style>
