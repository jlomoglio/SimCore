<template>
    <view-box id="a2v1" :background="backgroundImg">
        <!-- Content container required only for a2V1 -->
        <content-box :clickable="isClickable" @action="incorrect(currentTask)" id="content">
            <zoom-panel>
                <div class="width-25 pull-left">
                <div class="width-100 pull-left">
                    <ignition-switch
                            left="15px"
                            @lock="t10a1('t10Lock')"
                            @acc="incorrect('t10')"
                            @on="t6a1()"
                            :lockHint="false"
                            :accHint="false"
                            :onHint="false"
                            :currentAction= "currentAction"
                            :currentTask = "currentTask"
                            :tasks="['t6a1', 't10a1']"
                    >
                    </ignition-switch>
                </div>
                <div class="width-100 pull-left brakeImg">
                    <Brake
                    @onBrake="t8a1()"
                    :currentTask = "currentTask"
                    :task="'t8a1'"
                    ></Brake>
                </div>
                <div class="width-100 pull-left gearBG">
                    <Gear
                        @park="t9a1('t2')"
                        @drive="t7a1()"
                        @correct="correct()"
                        :currentTask = "currentTask"
                        :tasks="['t7a1', 't9a1']"
                    ></Gear>
                </div>
            </div>
            <div class="width-75 pull-left">
                <masterCylinderFlow
                v-if="showCylinderFlow"
                @completed="t8Completed()"
                :cylinderFlow="'master-cylinder-kink'">
                </masterCylinderFlow>
                <div v-else class="masterCylinder" ></div>
            </div>
            </zoom-panel>
        </content-box>
    </view-box>
</template>

<script>
import A1V2 from './a1v2-seq.js'
import ViewBox from '../../widgets/ViewBox'
import ContentBox from '../../widgets/ContentBox'
import ZoomPanel from '../../widgets/ZoomPanel'
import HintBox from '../../widgets/HintBox'
import HotSpot from '../../widgets/HotSpot'
import ButtonsVideo from '../../sim-core/components/video-page/ButtonsVideo'
import VideoPlayer from '../../sim-core/components/video-page/VideoPlayer'
import ContinueButton from '../../sim-core/components/sim-page/ContinueButton'
import masterCylinderFlow from '../../sim-core/components/sim-page/masterCylinderFlow'
import IgnitionSwitch from '../../widgets/ignition-switch/IgnitionSwitch'
import Brake from '../../widgets/Brake'
import Gear from '../../widgets/Gear'

export default {
    name: 'A1V2',

    // This is a required list of imported components (Widgets)
    components: {
        ViewBox,
        ContentBox,
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
            currentTask: 't6',
            currentAttempts: 1,
            currentPoints: 3,
            backgroundImg: 'engine_compartment_not_faded_with_AC_machine-a.png',
            // /////////////////////////////////////
            rotateRotors: false,
            showCylinderFlow: false,
            currentAction: 'on'
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
        this.$core.Activity.configView('', 'full', 'A2')
        // Initlize the activity view
        this.$core.Activity.init([this.t6])

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
        ...A1V2,

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
#a2v1 {
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
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    /* height: 590px; */
    z-index: 2; /* Must be a 2 */
    width: 940px;
    height: 460px;
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
    min-height: 250px;
  }
  .temp {
    width: 200px;
    height: 200px;
  }
  .width-100 {
    width: 100%;
    min-height: 125px;
  }
  .width-75 {
    width: 75%;
  }
  .brakeImg {
    margin: 25px 10px;
  }
  .gear-BG {
    background: url('/assets/img/module/gear_shift_movement_Sprite.png') no-repeat;
    background-size: 586% auto;
    border-radius: 50%;
    width: 120px;
    margin-top: 12px;
    margin-left: 25px;
    height: 120px;
    background-position: 1.5% 0;
  }
  .masterCylinder {
    width: 690px;
    height: 440px;
    background: url(/assets/img/module/master_cylinder_flow_calipers_drums_sprite_kink.png) no-repeat;
    background-position: 0 0;
    background-size: 1200% auto;
    position: relative;
  }
  .gearBG{
    margin-top: 12px;
    margin-left: 25px;
  }

</style>
