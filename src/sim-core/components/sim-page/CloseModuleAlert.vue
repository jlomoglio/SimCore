<template>
	<div id="close-module-alert" v-if="this.$store.getters.getCloseModuleAlertIsShown">
        <div class="alert-content">
			<div class="alert-text">You have not completed the following activities in the simulation:</div>
			<div id="activityNames" class="alert-text">
				<span v-for="activity in this.incompletedActivities(this.activities)">{{ activity.title }}</span>
			</div>
			<div class="alert-text confirmation-text">
				Are you sure you want to close the simulation? All unsaved work on this activity will
				be lost and your scores will reflect only those activities you have completed in this session.
			</div>
		</div>
        <div class="button-bar">
            <div class="btnYes" @click="close()"></div>
            <div class="btnNo" @click="cancel()"></div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { unPause } from '../../core/audio-player'

export default {
    name: 'CloseModuleAlert',
    methods: {
        close () {
            // update time spent on activity
            // and then send data to LTI
            console.log('close')
        },
        cancel () {
            this.$store.commit('hideCloseModuleAlert')
            unPause()
        },
        incompletedActivities (actvities) {
            return _.filter(actvities, {completed: false})
        }
    },
    computed: {
        ...mapGetters({
            activities: 'getActivities'
        })
    }
}
</script>

<style scoped>
#close-module-alert {
	font-family: Roboto-Medium;
    font-size: 15px;
    position: absolute;
    width: 440px;
    height: auto;
    padding: 20px;
    padding-bottom: 60px;
    background-color: #ffffff;
    text-align: left;
    top: 183px;
    left: 280px;
    right: 280px;
    z-index: 1005;
    -webkit-box-shadow: 10px 10px 16px -3px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 10px 10px 16px -3px rgba(0, 0, 0, 0.75);
    box-shadow: 10px 10px 16px -3px rgba(0, 0, 0, 0.75);
}

.activityNames {
    line-height: 20px;
}

.alert-text {
    font-family: Roboto-Bold;
    font-size: 15px;
    margin-top: 8px;
    margin-bottom: 20px;
    color: #000;
}

.alert-text span {
    display:block;
}

.button-bar {
    height: 50px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}

.btnYes {
    position: relative;
    bottom: 0px;
    left: 70px;
    float: left;
    padding: 10px;
    height: 16px;
    width: 140px;
    background: rgba(0, 0, 0, 0) url('/assets/img/buttons/horizontal/yes.png') repeat scroll 0 0 / 100% 100%;
}

.btnYes:active {
    position: relative;
    bottom: 0px;
    left: 70px;
    float: left;
    padding: 10px;
    height: 16px;
    width: 140px;
    background: rgba(0, 0, 0, 0) url('/assets/img/buttons/horizontal/yes_over.png') repeat scroll 0 0 / 100% 100%;
}

.btnNo {
    position: relative;
    bottom: 0px;
    right: 70px;
    float: right;
    padding: 10px;
    height: 16px;
    width: 140px;
    background: rgba(0, 0, 0, 0) url('/assets/img/buttons/horizontal/no.png') repeat scroll 0 0 / 100% 100%;
}

.btnNo:active {
    position: relative;
    bottom: 0px;
    right: 70px;
    float: right;
    padding: 10px;
    height: 16px;
    width: 140px;
    background: rgba(0, 0, 0, 0) url('/assets/img/buttons/horizontal/no_over.png') repeat scroll 0 0 / 100% 100%;
}

img.alertbox-button {
    height: 36px;
    width: 160px;
    cursor: pointer;
}
</style>
