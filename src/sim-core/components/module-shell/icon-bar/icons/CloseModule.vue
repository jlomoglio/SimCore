<template>
     <div id="icon-close" @click="show()"></div>
</template>

<script>
import { pause } from '../../../../core/audio-player'
export default {
    name: 'IconClose',
    methods: {
        show () {
            this.$store.commit('showCloseModuleAlert')
            pause()
        }
    }
}
</script>

<style scoped>
#icon-close {
 	position: absolute;
    width: 20px;
    height: 20px;
    right: 18px;
    top: 2px;
    cursor: pointer;
    background: url(/assets/img/icons/close_task.png) no-repeat;
    background-origin: top center;
}
</style>
