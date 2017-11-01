<template>
    <div id="sim-page">
      	<module-header></module-header>
      	<icon-bar></icon-bar>
        <menu-main-menu></menu-main-menu>

        <div id="activity-area">
            <div id="content-area" v-if="useContentArea">
                <div id="content-area-inner">
                    <div id="zoom-pan">
                      <component class="activityViewContainer" :is="contentAreaCurrentActivityView"></component>
                    </div>
                </div>
            </div>

            <div v-else="" id="activity-area-inner">
                <!-- <div id="zoom-pan"> -->
                    <component class="activityViewContainer" :is="currentActivityView"></component>
                <!-- </div> -->
            </div>
        </div>

        <module-footer></module-footer>

        <popup-video-player></popup-video-player>

        <light-box></light-box>
        <activity-light-box></activity-light-box>
        <activity-block-box></activity-block-box>

        <skip-activity-alert></skip-activity-alert>
        <close-module-alert></close-module-alert>

        <assessment-window></assessment-window>

        <si-window v-if="this.$store.getters.getSiWindowIsShown === true"></si-window>
        <task-window></task-window>

        <parts-department></parts-department>
        <activity-end-screen></activity-end-screen>
        <activity-already-completed-alert></activity-already-completed-alert>

        <continue-button></continue-button>
        <assessment-window-continue-button></assessment-window-continue-button>

    </div>
</template>

<script>
import ModuleHeader from '../module-shell/ModuleHeader'
import IconBar from '../module-shell/icon-bar/IconBar'
import MenuMainMenu from '../module-shell/icon-bar/menus/MainMenu'
import ModuleFooter from '../module-shell/module-footer/ModuleFooter'
import PopupVideoPlayer from './PopupVideoPlayer'
import LightBox from './LightBox'
import ActivityLightBox from './ActivityLightBox'
import ActivityBlockBox from './ActivityBlockBox'

import AssessmentWindow from './Assessment/AssessmentWindow'
import AssessmentWindowContinueButton from './Assessment/AssessmentContinueButton'
import SiWindow from './SiWindow'
import TaskWindow from './TaskWindow'
import PartsDepartment from './PartsDepartment'
import ContinueButton from './ContinueButton'

import ActivityEndScreen from './ActivityEndScreen.vue'
import SkipActivityAlert from './SkipActivityAlert'
import CloseModuleAlert from './CloseModuleAlert'
import ActivityAlreadyCompletedAlert from './ActivityAlreadyCompletedAlert'

import activities from '../../../activities/activities'

export default {
    name: 'SimPage',
    components: {
        ModuleHeader,
        IconBar,
        MenuMainMenu,
        ModuleFooter,

        PopupVideoPlayer,
        LightBox,
        ActivityLightBox,
        ActivityBlockBox,

        AssessmentWindow,
        AssessmentWindowContinueButton,
        SiWindow,
        TaskWindow,
        PartsDepartment,
        ContinueButton,

        ActivityEndScreen,
        SkipActivityAlert,
        CloseModuleAlert,
        ActivityAlreadyCompletedAlert,

        ...activities
    },
    computed: {
        useContentArea() {
            return this.$store.getters.getUseContentArea
        },
        contentAreaCurrentActivityView() {
            if (this.useContentArea === true) {
                return this.$store.getters.getCurrentActivityView
            }
        },
        currentActivityView() {
            return this.$store.getters.getCurrentActivityView
        }
    }
}
</script>

<style scoped>
#sim-page {
    position: absolute;
    width: 1000px;
    height: 625px;
    top: 0;
    left: 50%;
    margin-left: -500px;
    background: #5C5A58;
    overflow: hidden;
}

#activity-area {
    position: absolute;
    height: 551px;
    left: 0px;
    right: 0px;
    top: 75px;
}

#activity-area-inner {
    position: absolute;
    height: 551px;
    left: 0px;
    right: 0px;
    top: 0px;
    /*overflow: hidden;*/
}

#zoom-pan {
    position:relative;
    width: 100%;
    height: 99.7%;
}

#content-area-inner::-webkit-scrollbar {
    display: none;
}

#content-area {
    position: absolute;
    height: 470px;
    left: 30px;
    top: 10px;
    box-shadow: 3px 3px 10px #000;
    width: 941px;
    background: rgba(0, 0, 0, 0) url('/assets/img/module/content_area_bg.png') no-repeat;
    z-index: 2;
}

#content-area > #content-area-inner {
    position: absolute;
    top: 10px;
    left: 11px;
    right: 36px;
    width: 921px;
    height: 451px;
    font-family: Roboto-Regular;
    font-size: 12px;
    overflow: hidden;
}

#content-area > #content-area-inner > .activityViewContainer {
    position: absolute;
    left: 7px;
    right: 0;
    top: -68px;
 	  height: 452px;
}

#content-area > #content-area-inner::-webkit-scrollbar {
    display: none;
}

.activityViewContainer {
    position: absolute;
    left: 0;
    right: 0;
    top: 45px;
 	height: 549px;
}

@keyframes 'blinker' {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
