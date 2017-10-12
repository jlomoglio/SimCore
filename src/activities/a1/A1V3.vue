<template>
    <view-box id="a1v3" :background="backgroundImg">
        <content-box :clickable="isClickable" @action="incorrect(currentTask)">
            <!-- AC MACHINE (POPOUT: Full) -->
            <div id="popout-full" v-show="fullPopOutIsShown">
                <div id="low-side-mask" v-show="lowSideMaskIsShow"></div>
                <div id="needle-low-small"></div>
                <div id="high-side-mask" v-show="highSideMaskIsShow"></div>
                <div id="needle-high-small"></div>

                <div id="lcd-screen-small">
                    <div id="screen-txt-1-small">{{ screenTxt1 }}</div>
                    <div id="screen-txt-2-small">{{ screenTxt2 }}</div>
                    <div id="screen-txt-3-small">{{ screenTxt3 }}</div>
                    <div id="screen-txt-4-small">{{ screenTxt4 }}</div>
                </div>

                <hint-box id="t7-hint" v-hint="t7ShowHint"></hint-box>
                <div id="power-button"
                    :class="powerButtonOn ? 'on' : 'off'"
                    @click="t7a1()"
                >
                </div>
            </div>

            <!-- AC MACHINE (POPOUT: Left/Right) -->
            <div id="popout-left-right" v-show="leftRightPopOutIsShown">
                <div id="left-side">
                    <div id="needle-low"></div>
                    <hint-box id="t10-hint" v-hint="t10ShowHint"></hint-box>
                    <hint-box id="t12-hint" v-hint="t12ShowHint"></hint-box>
                    <div id="knob-low" @click="whichTask()"></div>

                    <div id="needle-high"></div>
                    <hint-box id="t11-hint" v-hint="t11ShowHint"></hint-box>
                    <hint-box id="t13-hint" v-hint="t13ShowHint"></hint-box>
                    <div id="knob-high" @click="whichTask()"></div>
                </div>
                <div id="right-side">
                    <div id="lcd-screen">
                        <div id="screen-txt-1">{{ screenTxt1 }}</div>
                        <div id="screen-txt-2">{{ screenTxt2 }}</div>
                        <div id="screen-txt-3">{{ screenTxt3 }}</div>
                        <div id="screen-txt-4">{{ screenTxt4 }}</div>
                    </div>

                    <!-- Recover Button -->
                    <hint-box id="t8-hint" v-hint="t8ShowHint"></hint-box>
                    <hot-spot id="t8-hotspot" :currentTask="currentTask" task="t8" @action="t8a1()"></hot-spot>

                    <!-- Start Button -->
                    <hint-box id="t9-hint" v-hint="t9ShowHint"></hint-box>
                    <hot-spot id="t9-hotspot" :currentTask="currentTask" task="t9" @action="t9a1()"></hot-spot>
                </div>
            </div>
        </content-box>
    </view-box>
</template>

<script>
import A1V1Seq from './a1v3-seq.js'
import ViewBox from '../../widgets/ViewBox'
import ContentBox from '../../widgets/ContentBox'
import HintBox from '../../widgets/HintBox'
import HotSpot from '../../widgets/HotSpot'

export default {
    name: 'A1V3',

    // This is a required list of imported components (Widgets)
    components: {
        ViewBox,
        ContentBox,
        HintBox,
        HotSpot
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

            // View Specific properties ////////////
            fullPopOutIsShown: true, // true
            lowSideMaskIsShow: true,
            highSideMaskIsShow: true,
            powerButtonOn: false,

            leftRightPopOutIsShown: false,
            screenTxt1: '',
            screenTxt2: '',
            screenTxt3: '',
            screenTxt4: '',

            // Hints should always follow this naming convention
            t7ShowHint: false,
            t8ShowHint: false,
            t9ShowHint: false,
            t10ShowHint: false,
            t11ShowHint: false,
            t12ShowHint: false,
            t13ShowHint: false
        }
    },

    // Mounted is used for things that need to be active when the
    // view first loads, such as configs and init and any icons
    mounted() {
        // Configure the view (Activity Title, View Mode[full/box], Activity ID)
        this.$core.Activity.configView('System Recovery', 'full', 'A1')
        // Initlize the activity view
        this.$core.Activity.init([this.t7])

        // Show and Enable SI Menu IconBar
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

        // The click event needs to call a diffrent function
        // based on what the current task is when it's clicked.
        whichTask() {
            if (this.currentTask === 't10') {
                this.t10a2()
            } else if (this.currentTask === 't11') {
                this.t11a2()
            } else if (this.currentTask === 't12') {
                this.t12a2()
            } else if (this.currentTask === 't13') {
                this.t13a2()
            }
        },

        recoverUpdate1() {
            // Set screen text
            this.screenTxt1 = 'RECOVER IN PROGRESS'
            this.screenTxt2 = 'RECOVERED 3LB 04OZ'
            this.screenTxt3 = ''
            this.screenTxt4 = 'STOP TO PAUSE'

            setTimeout(this.recoverUpdate2, 3000)
        },

        recoverUpdate2() {
            // Set screen text
            this.screenTxt1 = 'DRAINING OIL'
            this.screenTxt2 = ''
            this.screenTxt3 = 'PLEASE WAIT'
            this.screenTxt4 = ''

            setTimeout(this.recoverUpdate3, 3000)
        },

        recoverUpdate3() {
            // Set screen text
            this.screenTxt1 = 'RECOVER COMPLETE'
            this.screenTxt2 = 'RECOVERED 3LB 04OZ'
            this.screenTxt3 = ''
            this.screenTxt4 = 'CHECK OIL BOTTLE'

            setTimeout(this.t11Completed(), 4000)
        }
    }
}
</script>

<style scoped>
/** View Specific Styles ********************************/

/** TASK 7 **/
#popout-full {
    position: absolute;
    top: 40px;
    left: 100px;
    width: 850px;
    height: 650px;
    background: url('/assets/img/activities/ac_machine_control_panel_full.png') no-repeat;
    background-size: 100%;
    z-index: 5px;
}

#low-side-mask {
    position: absolute;
    top: 92px;
    left: 194px;
    width: 100px;
    height: 100px;
    background-color: #000;
    border-radius: 50px;
    opacity: 0.6;
    z-index: 7px;
}

#needle-low-small {
    position: absolute;
    top: 92px;
    left: 194px;
    width: 100px;
    height: 100px;
    background: url('/assets/img/activities/ac_machine_control_panel_needle.png') no-repeat;
    background-size: 44%;
    background-position: 17px 41px;
    transform: rotate(-52deg);
    z-index: 6px;
}

#high-side-mask {
    position: absolute;
    top: 92px;
    left: 316px;
    width: 100px;
    height: 100px;
    background-color: #000;
    border-radius: 50px;
    opacity: 0.6;
    z-index: 7px;
}

#needle-high-small {
    position: absolute;
    top: 92px;
    left: 316px;
    width: 100px;
    height: 100px;
    background: url('/assets/img/activities/ac_machine_control_panel_needle.png') no-repeat;
    background-size: 44%;
    background-position: 17px 41px;
    transform: rotate(-52deg);
    z-index: 6px;
}

#lcd-screen-small {
    position: absolute;
    top: 60px;
    left: 482px;
    width: 136px;
    height: 85px;
}

#screen-txt-1-small {
    position: absolute;
    left: 0px;
    top: 10px;
    width: 136px;
    height: 15px;
    text-align: center;
    font-family: LiquidCrystal-Normal;
    font-size: 12px;
    color: black;
}

#screen-txt-2-small {
    position: absolute;
    left: 0px;
    top: 30px;
    width: 136px;
    height: 15px;
    text-align: center;
    font-family: LiquidCrystal-Normal;
    font-size: 12px;
    color: black;
}

#screen-txt-3-small {
    position: absolute;
    left: 0px;
    top: 55px;
    width: 136px;
    height: 15px;
    text-align: center;
    font-family: LiquidCrystal-Normal;
    font-size: 12px;
    color: black;
}

#screen-txt-4-small {
    position: absolute;
    left: 0px;
    top: 60px;
    width: 136px;
    height: 15px;
    text-align: center;
    font-family: LiquidCrystal-Normal;
    font-size: 12px;
    color: black;
}

#power-button.off {
    position: absolute;
    bottom: 189px;
    right: 167px;
    width: 40px;
    height: 85px;
    background: url('/assets/img/activities/AC_OFF_button.png') no-repeat;
    background-size: 100%;
    z-index: 6px;
}

#power-button.on {
    position: absolute;
    bottom: 189px;
    right: 167px;
    width: 40px;
    height: 85px;
    background: url('/assets/img/activities/AC_ON_button.png') no-repeat;
    background-size: 100%;
    z-index: 6px;
}

#t7-hint {
    position: absolute;
    bottom: 205px;
    right: 162px;
    width: 45px;
    height: 70px;
    border-radius: 10px;
    z-index: 1px;
}

/* Left & Right Side Popout */
#popout-left-right {
    position: absolute;
    top: 40px;
    left: 80px;
    width: 850px;
    height: 480px;
    border: 2px solid #ccc;
    background: url('/assets/img/activities/ac_machine_control_panel.png') no-repeat;
    z-index: 5px;
}

#left-side {
    position: absolute;
    top: 0;
    left: 0;
    width: 500px;
    height: 480px;
}

#right-side {
    position: absolute;
    top: 0;
    right: 0;
    width: 350px;
    height: 480px;
}

/** TASK 8 **/
#lcd-screen {
    position: absolute;
    top: 47px;
    left: 82px;
    width: 236px;
    height: 150px;
}

#screen-txt-1 {
    position: absolute;
    left: 0px;
    top: 20px;
    width: 236px;
    height: 20px;
    text-align: center;
    font-family: LiquidCrystal-Normal;
    font-size: 22px;
    color: black;
}

#screen-txt-2 {
    position: absolute;
    left: 0px;
    top: 50px;
    width: 236px;
    height: 20px;
    text-align: center;
    font-family: LiquidCrystal-Normal;
    font-size: 22px;
    color: black;
}

#screen-txt-3 {
    position: absolute;
    left: 0px;
    top: 85px;
    width: 236px;
    height: 20px;
    text-align: center;
    font-family: LiquidCrystal-Normal;
    font-size: 22px;
    color: black;
}

#screen-txt-4 {
    position: absolute;
    left: 0px;
    top: 120px;
    width: 236px;
    height: 20px;
    text-align: center;
    font-family: LiquidCrystal-Normal;
    font-size: 22px;
    color: black;
}

#t8-hotspot {
    position: absolute;
    left: 185px;
    top: 354px;
    width: 100px;
    height: 25px;
}

#t8-hint {
    position: absolute;
    left: 181px;
    top: 352px;
    width: 102px;
    height: 25px;
    border-radius: 10px;
}

/** TASK 9 **/
#t9-hotspot {
    position: absolute;
    left: 81px;
    top: 262px;
    width: 104px;
    height: 55px;
}

#t9-hint {
    position: absolute;
    left: 79px;
    top: 261px;
    width: 104px;
    height: 55px;
    border-radius: 10px;
}

/** TASK 10 , 11, 12, 13 **/
#needle-low {
    position: absolute;
    top: 118px;
    left: 79px;
    width: 172px;
    height: 172px;
    background: url('/assets/img/activities/ac_machine_control_panel_needle.png') no-repeat;
    background-size: 45%;
    background-position: 27px 70px;
    transform: rotate(141deg);
    z-index: 6px;
}

#needle-high {
    position: absolute;
    top: 118px;
    left: 288px;
    width: 172px;
    height: 172px;
    background: url('/assets/img/activities/ac_machine_control_panel_needle.png') no-repeat;
    background-size: 45%;
    background-position: 27px 70px;
    transform: rotate(-2deg);
    z-index: 6px;
}

#knob-low {
    position: absolute;
    top: 295px;
    left: 129px;
    width: 53px;
    height: 160px;
    background: url('/assets/img/activities/blue_AC_knob.png') no-repeat;
    background-size: 70%;
    background-position: 10px 48px;
    transform: rotate(0deg); /* -90 */
    z-index: 6px;
}

#knob-high {
    position: absolute;
    top: 295px;
    left: 346px;
    width: 53px;
    height: 160px;
    background: url('/assets/img/activities/red_AC_knob.png') no-repeat;
    background-size: 70%;
    background-position: 10px 48px;
    transform: rotate(0deg); /* -90 */
    z-index: 6px;
}

#t10-hint {
    position: absolute;
    left: 115px;
    top: 345px;
    width: 102px;
    height: 25px;
    border-radius: 10px;
    z-index: 6px;
}

#t11-hint {
    position: absolute;
    left: 320px;
    top: 345px;
    width: 102px;
    height: 25px;
    border-radius: 10px;
    z-index: 6px;
}

#t12-hint {
    position: absolute;
    left: 136px;
    top: 323px;
    width: 25px;
    height: 102px;
    border-radius: 10px;
    z-index: 6px;
}

#t13-hint {
    position: absolute;
    left: 343px;
    top: 323px;
    width: 25px;
    height: 102px;
    border-radius: 10px;
    z-index: 6px;
}
</style>
