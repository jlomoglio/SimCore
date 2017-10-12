<template>
    <div id="icon-repeat-audio" @click="repeatAudio()" :class="{ enabled: this.enabled}" ></div>
</template>

<script>
import { mapGetters } from 'vuex'
import { rewindAudioPlay } from '../../../../core/audio-player'

export default {
    name: 'IconRepeatAudio',
    data() {
        return {
            enabled: false,
            rewinds: 0
        }
    },
    methods: {
        repeatAudio () {
            if (this.rewinds > 0) {
                this.rewinds -= 1
                this.$store.commit('setRewindAudioIndex', (this.rewindAudioIndex - 1))
                rewindAudioPlay()
            }
        }
    },
    computed: {
        ...mapGetters({
            rewindAudioIndex: 'getRewindAudioIndex',
            rewindAudioArr: 'getRewindAudioArr'
        })
    },
    watch: {
        rewindAudioArr(newVal) {
            this.$store.commit('setRewindAudioIndex', this.rewindAudioArr.length)
            this.rewinds = this.rewindAudioArr.length
            if (this.rewindAudioArr.length > 0) {
                this.enabled = true
            }
        },
        rewindAudioIndex(newVal) {
            this.rewinds = (newVal)
        }
    }
}
</script>


<style lang="scss" scoped>
    #icon-repeat-audio {
        position: absolute;
        width: 20px;
        height: 20px;
        right: 131px;
        top: 5px;
        cursor: pointer;
        background: url(/assets/img/icons/repeat.png) 0% 0% / 100% 100%;
        background-origin: top center;
        opacity: 0.5;
        pointer-events: none;

        &.enabled {
            opacity: 1 !important;
            pointer-events: all !important;
        }
    }
</style>
