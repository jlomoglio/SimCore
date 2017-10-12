<template>
    <div id="icon-zoom-in" v-bind:class="{ active: isActive }" @click="zoomIn(0.5)"></div>
</template>

<script>
import { zoomIn } from '../../../../core/zoom'

export default {
    name: 'IconZoomIn',
    computed: {
        isActive () {
            if (this.$store.getters.getZoomPercent < 2) {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        zoomIn (percent) {
            let target = document.getElementById('zoom-panel')
            zoomIn({target: target, percent: percent})
        }
    }
}
</script>

<style scoped>
#icon-zoom-in.active {
	position: relative;
    width: 20px;
    height: 20px;
	margin-top: 5px;
	margin-left: 18px;
    float: right;
    cursor: pointer;
  	pointer-events: all;
  	background: url(/assets/img/icons/zoom_in_inactive.png) 0% 0% / 100% 100%;
    background-origin: top center;
}
#icon-zoom-in {
	position: relative;
    width: 20px;
    height: 20px;
	margin-top: 5px;
	margin-left: 18px;
    float: right;
    pointer-events: none;
  	background: url(/assets/img/icons/zoom_in_active.png) 0% 0% / 100% 100%;
    background-origin: top center;
}
</style>
