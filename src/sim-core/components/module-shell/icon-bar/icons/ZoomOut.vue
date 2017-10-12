<template>
    <div id="icon-zoom-out" v-bind:class="{ active: isActive }" @click="zoomOut(0.5)"></div>
</template>

<script>
import { zoomOut } from '../../../../core/zoom'

export default {
    name: 'IconZoomOut',
    computed: {
        isActive () {
            if (this.$store.getters.getZoomPercent > 1) {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        zoomOut (percent) {
            let target = document.getElementById('zoom-panel')
            zoomOut({target: target, percent: percent})
        }
    }
}
</script>


<style scoped>
#icon-zoom-out.active {
	position: relative;
    width: 20px;
    height: 20px;
	margin-top: 5px;
	margin-left: 18px;
    float: right;
    cursor: pointer;
  	pointer-events: auto;
  	background: url(/assets/img/icons/zoom_out_inactive.png) 0% 0% / 100% 100%;
    background-origin: top center;
}
#icon-zoom-out {
	position: relative;
    width: 20px;
    height: 20px;
	margin-top: 5px;
	margin-left: 18px;
    float: right;
    cursor: pointer;
  	pointer-events: none;
  	background: url(/assets/img/icons/zoom_out_active.png) 0% 0% / 100% 100%;
    background-origin: top center;
}
</style>
