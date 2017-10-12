<template>
    <div id="icon-mute-audio" :class="{ active: this.muted }" @click="muteAudio()"></div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mute, unMute } from '../../../../core/audio-player'

export default {
    name: 'IconMuteAudio',
    computed: mapGetters({
        muted: 'getAudioMuted'
    }),
    methods: {
        muteAudio () {
            if (this.muted) {
                unMute()
            } else {
                mute()
            }
        }
    }
}
</script>


<style scoped>
#icon-mute-audio.active {
	position: absolute;
    width: 30px;
    height: 18px;
    right: 170px;
    top: 6px;
    cursor: pointer;
    background: url(/assets/img/icons/mute_active.png) 0% 0% / 100% 100%;
    background-origin: top center;
}

#icon-mute-audio {
	position: absolute;
    width: 30px;
    height: 18px;
    right: 170px;
    top: 6px;
    cursor: pointer;
    background: url(/assets/img/icons/mute_inactive.png) 0% 0% / 100% 100%;
    background-origin: top center;
}
</style>
