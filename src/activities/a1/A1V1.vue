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
        <content-box :clickable="isClickable" @action="incorrect(currentTask)">
            <zoom-panel :bgimg="zoomPanelBgImg">
                <!-- PARTS TRAY -->
                <img id="parts-tray" src="assets/img/activities/parts_tray.png" />

                <!-- TASK 1: Hint & Blue Cap -->
                <hint-box id="t1-hint" v-hint="t1ShowHint"></hint-box>
                <img id="blue-ac-cap"
                    @click="t1a1()"
                    :class="{ on: blueCapOn, off: blueCapOff }"
                    src="assets/img/activities/blue_ac_cap.png"
                />

                <!-- TASK 2: Hint & Red Cap -->
                <hint-box id="t2-hint" v-hint="t2ShowHint"></hint-box>
                <img id="red-ac-cap"
                    @click="t2a1()"
                    :class="{ on: redCapOn, off: redCapOff }"
                    src="assets/img/activities/red_ac_cap.png"
                />
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
        ButtonsVideo
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

            // View Specific properties ///////////
            zoomPanelBgImg: {
                background: 'url(/assets/img/zoom-panel/engine_compartment_not_faded_with_AC_machine-a.png)',
                backgroundSize: '105%'
            },
            blueCapOn: true,
            blueCapOff: false,
            redCapOn: true,
            redCapOff: false,

            // Hints should always follow this naming convention
            t1ShowHint: false,
            t2ShowHint: false
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
        carVideoIsHide() {
            this.$core.Activity.carVideoIsHide()
        },
        hideContinueButton() {
            this.$store.state.videoEndingFlag = false
        },
        videoLoaded() {
            var frame = document.getElementById('videoFrame')
            var frameContent = frame.contentWindow.document.body
            // console.log('frameContent', frameContent, frameContent.querySelector('video'))
            frameContent.querySelector('video').addEventListener('ended', this.myHandler, false)
        },
        myHandler(e) {
            this.$store.state.videoEndingFlag = true
        },
        stopAudio() {
            pause('moduleAudioPlayer')
            console.log('aaaaaaaaaaaaaaaa')
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
#parts-tray {
    position: absolute;
    right: 450px;
    bottom: 80px;
    width: 200px;
    height: auto;
}

#red-ac-cap.on {
    position: absolute;
    right: 459px;
    top: 366px;
    width: 10px;
    height: auto;
    z-index: 10;
}

#red-ac-cap.off {
    position: absolute;
    right: 520px;
    top: 430px;
    width: 15px;
    height: auto;
}

#blue-ac-cap.on {
    position: absolute;
    left: 436px;
    top: 35px;
    width: 10px;
    height: auto;
    z-index: 10;
}

#blue-ac-cap.off {
    position: absolute;
    left: 436px;
    top: 435px;
    width: 15px;
    height: auto;
}

#t1-hint {
    position: absolute;
    top: 30px;
    left: 427px;
    width: 21px;
    height: 21px;
    border-radius: 10px;
}

#t2-hint {
    position: absolute;
    right: 450px;
    top: 359px;
    width: 21px;
    height: 21px;
    border-radius: 10px;
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
    z-index: 25;
}

#safe-continue:active {
	background: url('/assets/img/buttons/horizontal/continue_over.png');
    background-size: 100% 100%;
}


</style>
