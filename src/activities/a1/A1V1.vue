<template>
    <view-box id="a1v1" :background="backgroundImg">
        <!-- INTRO & SAFETY SCREENS -->
        <intro-screen></intro-screen>
        <safety-screen @isClosed="stopAudio();"
            v-if="this.$core.Activity.safetyIsShown()"
        >
        </safety-screen>
        <VideoPlayer divClass="true" iframeClass="true" @load="videoLoaded()" v-if="this.$core.Activity.carVideoIsShown()" @isClosed="narrative();"></VideoPlayer>  
        <div id="safe-continue" @click="narrative(); carVideoIsHide(); hideContinueButton()" v-if="$store.state.videoEndingFlag" title="Continue"></div>

        <!-- Content container required only for A1V1 -->
        <content-box :clickable="isClickable" @action="incorrect(currentTask)" id="content" v-show="showContentBox">
            <zoom-panel>
                <div class="width-25 pull-left">
                <div class="width-100 pull-left">
                    <ignition-switch
                            left="15px"
                            @lock="t5a1('t1Lock')"
                            @acc="incorrect('t1')"
                            @on="t1a1()"
                            :lockHint="t5ShowHint"
                            :accHint="false"
                            :onHint="t1ShowHint"
                            :currentAction= "currentAction"
                            :currentTask = "currentTask"
                            :tasks="['t1', 't5']"
                    >
                    </ignition-switch>
                </div>
                <div class="width-100 pull-left brakeImg">
                    <Brake
                    @onBrake="t3a1()"
                    :brakeHint= "t3ShowHint"
                    :currentTask = "currentTask"
                    :task="'t3'"
                    ></Brake>
                </div>
                <div class="width-100 pull-left gearBG">
                    <Gear
                        @park="t4a1('t2')"
                        @drive="t2a1()"
                        @correct="correct()"
                        :driveHint="t2ShowHint"
                        :parkHint="t4ShowHint"
                        :currentTask = "currentTask"
                        :tasks="['t2', 't4']"
                    ></Gear>
                </div>
            </div>
            <div class="width-75 pull-left">
                <masterCylinderFlow 
                v-if="showCylinderFlow"
                @completed="t3Completed()"
                :cylinderFlow="'master-cylinder'">
                </masterCylinderFlow>
                <div v-else class="masterCylinder" ></div>
            </div>
            </zoom-panel>
        </content-box>
    </view-box>
</template>

<script>
import A1V1Seq from './a1v1-seq.js'
import ViewBox from '../../widgets/ViewBox'
import ContentBox from '../../widgets/ContentBox'
import IntroScreen from '../../widgets/IntroScreen'
import SafetyScreen from '../../widgets/SafetyScreen'
import ZoomPanel from '../../widgets/ZoomPanel'
import HintBox from '../../widgets/HintBox'
import HotSpot from '../../widgets/HotSpot'
import ButtonsVideo from '../../sim-core/components/video-page/ButtonsVideo'
import VideoPlayer from '../../sim-core/components/video-page/VideoPlayer'
import ContinueButton from '../../sim-core/components/sim-page/ContinueButton'
import { pause } from '../../sim-core/core/audio-player'
import masterCylinderFlow from '../../sim-core/components/sim-page/masterCylinderFlow'
import IgnitionSwitch from '../../widgets/ignition-switch/IgnitionSwitch'
import Brake from '../../widgets/Brake'
import Gear from '../../widgets/Gear'

export default {
    name: 'A1V1',

    // This is a required list of imported components (Widgets)
    components: {
        ViewBox,
        ContentBox,
        IntroScreen,
        SafetyScreen,
        ZoomPanel,
        HintBox,
        HotSpot,
        VideoPlayer,
        ContinueButton,
        ButtonsVideo,
        masterCylinderFlow,
        IgnitionSwitch,
        Brake,
        Gear
    },

    // Data contains properties that manage the state of the views
    // Typical usage is for boolean properties and view text and
    // properties used for scoring.
    data() {
        return {
            // Required Properties //////////////////
            isClickable: false,
            currentTask: 't7',
            currentAttempts: 1,
            currentPoints: 3,
            backgroundImg: 'engine_compartment_not_faded_with_AC_machine-a.png',
            // /////////////////////////////////////
            rotateRotors: false,
            showCylinderFlow: false,
            currentAction: 'on',
            showContentBox: false,
            t1ShowHint: false,
            t2ShowHint: false,
            t3ShowHint: false,
            t4ShowHint: false,
            t5ShowHint: false
        }
    },

    computed: {
        carVideoView () {
            return this.$store.getters.getCurrentView
        }
    },

    // Mounted is used for things that need to be active when the
    // view first loads, such as configs and init and any icons
    mounted() {
        // Configure the view (Activity Title, View Mode[full/box], Activity ID)
        this.$core.Activity.configView('', 'full', 'A1')
        // Initlize the activity view
        this.$core.Activity.init([this.introScreen])

        // Show Zoom Icons
        this.$core.IconBar.Zoom.show()

        // Show and Enable SI Menu Icon
        this.$core.IconBar.ServiceInfo.show()
        this.$core.IconBar.ServiceInfo.enable()
    },

    // Methods imports the sequence functions. You should only add
    // helper functions here. All task logic needs to be in the
    // sequecnxe file.
    methods: {
        // Required for sequence file
        ...A1V1Seq,

        // Required for inccorect responces and scoring
        incorrect(task) {
            if (this.currentAttempts < 3) {
                this.incorrectResponse()
                this.currentAttempts = (this.currentAttempts + 1)
                this.currentPoints = (this.currentPoints - 1)
            } else if (this.currentAttempts === 3) {
                this.incorrectResponse()
                this[task + 'ShowHint'] = true
                this.currentPoints = 0
            }
        },
        correct() {
            this.isClickable = false
        },
        carVideoIsHide() {
            this.$core.Activity.carVideoIsHide()
        },
        hideContinueButton() {
            this.$store.state.videoEndingFlag = false
        },
        videoLoaded() {
            var frame = document.getElementById('videoFrame')
            var frameContent = frame.contentWindow.document.body
            frameContent.querySelector('video').addEventListener('ended', this.myHandler, false)
        },
        myHandler(e) {
            this.$store.state.videoEndingFlag = true
        },
        stopAudio() {
            pause('moduleAudioPlayer')
            this.$store.dispatch('setVideoSource', '../../../assets/video/brake_pull_driving_video.html')
            this.$store.dispatch('setLoadedVideo', 'brake_pull_driving_video')
        }
    }
}

</script>

<style scoped>
/** View Required Styles ********************************/
.content-box {
    overflow: hidden; /* ZoomPanel */
}

/** View Specific Styles ********************************/
#a1v1 {
    position: absolute;
    top: -30px;
    left: 0;
    right: 0;
    bottom: 0;
    height: 590px;
    background: url('/assets/img/activities/engine_compartment_not_faded_with_AC_machine-a.png');
    background-size: 105%;
}

#content {
    position: absolute;
    top: 45px;
    left: 0;
    right: 0;
    bottom: 0;
    /* height: 590px; */
    z-index: 2; /* Must be a 2 */
    width: 940px;
    height: 80%;
    margin: 0 auto;
    background-color: #fff;
    box-shadow: 3px 3px 2px 0px rgba(0,0,0,0.55);
}

/** View Specific Styles ********************************/

/* Left & Right Side Popout */
.pull-left {
  float: left;
}
.width-25 {
    width: 20%;
    min-height: 450px;
    margin-left: 1%;
  }
  .temp {
    width: 200px;
    height: 200px;
  }
  .width-100 {
    width: 100%;
    min-height: 150px;
  }
  .width-75 {
    width: 75%;
  }
  .brakeImg {
    margin: 20px 10px;
  }
  .gear-BG {
    background: url('/assets/img/module/gear_shift_movement_Sprite.png') no-repeat;
    background-size: 586% auto;
    border-radius: 50%;
    width: 120px;
    margin-top: 21px;
    margin-left: 25px;
    height: 120px;
    background-position: 1.5% 0;
  }
  .masterCylinder {
    width: 690px;
    height: 440px;
    background: url(/assets/img/module/master_cylinder_flow_calipers_drums_sprite.png) no-repeat;
    background-position: 0 0;
    background-size: 1200% auto;
    position: relative;
  }
  .gearBG{
    margin-top: -10px;
    margin-left: 25px;
  }
#safe-continue {
    position: absolute;
    right: 45px;
	bottom: 88px;
    background: url('/assets/img/buttons/horizontal/continue.png');
    background-size: 100% 100%;
    cursor: pointer;
    width: 150px;
    height: 32px;
    z-index: 99;
}

#safe-continue:active {
	background: url('/assets/img/buttons/horizontal/continue_over.png');
    background-size: 100% 100%;
}

</style>
