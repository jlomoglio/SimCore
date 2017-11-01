<template>
	<div id="skip-activity-alert" v-if="this.skipActivityAlertIsShown">
        <div class="alert-content">
			<div class="alert-text confirmation-text">
                Are you sure you want to skip this activity?<br />Any progress on this activity will not be saved.
			</div>
		</div>
        <div class="button-bar">
            <div class="btn-yes alertbox-button" @click="skipActivity()"></div>
            <div class="btn-no alertbox-button" @click="cancel()"></div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { skipActivity, resetModuleDataForNewActivity, getActivity } from '../../core/activity'
import { resetSkipActivityScore } from '../../core/scoring'
import { unPause, pause } from '../../core/audio-player'

export default {
    name: 'SkipActivityAlert',
    mounted () {
        // get list of incompleted activities
    },
    computed: {
        ...mapGetters({
            skipActivityAlertIsShown: 'getSkipActivityAlertIsShown',
            activities: 'getActivitySubMenuItems',
            currentActivityId: 'getCurrentActivityId',
            skipToActivityId: 'getSkipToActivityId'
        })
    },
    methods: {
        skipActivity () {
            let activity = getActivity(this.skipToActivityId)
            if (!activity.completed) {
                this.$store.commit('hideSkipActivityAlertIsShown')
                skipActivity(this.skipToActivityId)
                resetModuleDataForNewActivity()
                resetSkipActivityScore()
            } else {
                this.$store.commit('hideSkipActivityAlertIsShown')
                this.$store.commit('showActivityAlreadyCompletedAlert')
            }
        },
        cancel () {
            pause('moduleAudioPlayer')
            this.$store.commit('hideSkipActivityAlertIsShown')
            unPause()
        }
    }
}
</script>

<style scoped>
#skip-activity-alert {
	font-family: Roboto-Medium;
    font-size: 15px;
    position: absolute;
    width: 440px;
    height: auto;
    padding: 20px;
    padding-bottom: 60px;
    background-color: #ffffff;
    text-align: left;
    top: 213px;
    left: 280px;
    right: 280px;
    z-index: 1005;
    -webkit-box-shadow: 10px 10px 16px -3px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 10px 10px 16px -3px rgba(0, 0, 0, 0.75);
    box-shadow: 10px 10px 16px -3px rgba(0, 0, 0, 0.75);
}

.alert-text {
    font-family: Roboto-Medium;
    font-size: 15px;
    margin-top: 8px;
    margin-bottom: 20px;
    text-align: center;
}
.button-bar {
    height: 50px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}
.btn-yes {
    position: relative;
    bottom: 10px;
    left: 50px;
    float: left;
	height: 36px;
    width: 160px;
    padding: 10px;
	background: url(/assets/img/buttons/horizontal/yes.png) no-repeat;
	background-position: 0 0;
	background-size: 100%;
}

.btn-yes:active {
    position: relative;
    bottom: 10px;
    left: 50px;
    float: left;
	height: 36px;
    width: 160px;
    padding: 10px;
	background: url(/assets/img/buttons/horizontal/yes_over.png) no-repeat;
	background-position: 0 0;
	background-size: 100%;
}

.btn-no {
    position: relative;
    bottom: 10px;
    right: 50px;
    float: right;
	height: 36px;
    width: 160px;
    padding: 10px;
	background: url(/assets/img/buttons/horizontal/no.png) no-repeat;
	background-position: 0 0;
	background-size: 100%;
}

.btn-no:active {
    position: relative;
    bottom: 10px;
    right: 50px;
    float: right;
	height: 36px;
    width: 160px;
    padding: 10px;
	background: url(/assets/img/buttons/horizontal/no_over.png) no-repeat;
	background-position: 0 0;
	background-size: 100%;
}

.alertbox-button {
    height: 36px;
    width: 160px;
    cursor: pointer;
}
</style>
