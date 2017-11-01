<template>
    <div id="activity-already-completed" v-if="activityCompletedIsShown">
        <div id="content">You have completed this activity and your score has been recorded.</div>
        <div id="continue-btn" @click="close()"></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { playAudio, unPause, pause } from '../../core/audio-player'

export default {
    name: 'ActivityAlreadyCompletedAlert',
    computed: {
        ...mapGetters({
            activityCompletedIsShown: 'getActivityAlreadyCompletedIsShown'
        })
    },
    methods: {
        close () {
            pause('moduleAudioPlayer')
            unPause()
            this.$store.commit('hideActivityAlreadyCompletedAlert')
        }
    },
    watch: {
        activityCompletedIsShown(newVal) {
            if (newVal === true) {
                playAudio('/assets/audio/score-recorded.mp3', null)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    #activity-already-completed {
        position: absolute;
        left: 0;
        top: 45px;
        width: 1000px;
        height: 580px;
        background: transparent;
        z-index: 1005;

        #content {
            font-family: Roboto-Medium;
            background: #fff;
            color: #272626;
            display: block;
            font-size: 19px;
            height: auto;
            line-height: 25px;
            margin: 0 auto;
            padding: 20px;
            position: relative;
            text-align: center;
            top: 230px;
            width: 960px;
        }

        #continue-btn {
            background: url('/assets/img/buttons/horizontal/continue.png');
            cursor: pointer;
            margin: 20px auto;
            position: relative;
            top: 230px;
            width: 150px;
            height: 32px;
            background-size: 100% 100%;

            &:active {
                background: url('/assets/img/buttons/horizontal/continue_over.png');
                background-size: 100% 100%;
            }
        }
    }
</style>
