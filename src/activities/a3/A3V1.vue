<template>
    <view-box id="a3v1" :background="backgroundImg">
        <content-box :clickable="isClickable" @action="incorrect(currentTask)">
            <!-- AC MACHINE (POPOUT: Left/Right) -->
            <div id="popout-left-right" v-show="leftRightPopOutIsShown">
                <div id="left-side">
                    <div id="needle-low"></div>
                    <div id="knob-low"></div>

                    <div id="needle-high"></div>
                    <hint-box id="t4-hint" v-hint="t4ShowHint"></hint-box>
                    <hint-box id="t5-hint" v-hint="t5ShowHint"></hint-box>
                    <div id="knob-high"
                        @click="currentTask === 't4' ? t4a2() : null"
                    >
                    </div>
                </div>
                <div id="right-side">
                    <div id="lcd-screen">
                        <div id="screen-txt-1">{{ screenTxt1 }}</div>
                        <div id="screen-txt-2">{{ screenTxt2 }}</div>
                        <div id="screen-txt-3">{{ screenTxt3 }}</div>
                        <div id="screen-txt-4">{{ screenTxt4 }}</div>
                    </div>

                    <!-- Charge Button -->
                    <hint-box id="t1-hint" v-hint="t1ShowHint"></hint-box>
                    <hot-spot id="t1-hotspot"
                        :currentTask="currentTask"
                        task="t1"
                        @action="t1a1()"
                    >
                    </hot-spot>

                    <!-- Up Button -->
                    <hint-box id="t2a1-hint" v-hint="t2a1ShowHint"></hint-box>
                    <hot-spot id="t2a1-hotspot"
                        :currentTask="currentTask"
                        task="t2a1"
                        @action="t2a1()"
                    >
                    </hot-spot>

                    <!-- Down Button -->
                    <hint-box id="t2a2-hint" v-hint="t2a2ShowHint"></hint-box>
                    <hot-spot id="t2a2-hotspot"
                        :currentTask="currentTask"
                        task="t2a2"
                        @action="t2a2()"
                    >
                    </hot-spot>

                    <!-- Start Button -->
                    <hint-box id="t3-hint" v-hint="t3ShowHint"></hint-box>
                    <hot-spot id="t3-hotspot"
                        :currentTask="currentTask"
                        task="t3"
                        @action="t3a1()"
                    >
                    </hot-spot>
                </div>
            </div>
        </content-box>
    </view-box>
</template>

<script>
import A3V1Seq from './a3v1-seq.js'
import ViewBox from '../../widgets/ViewBox'
import ContentBox from '../../widgets/ContentBox'
import HintBox from '../../widgets/HintBox'
import HotSpot from '../../widgets/HotSpot'

export default {
    name: 'A3V1',

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
            currentTask: 't1',
            currentAttempts: 1,
            currentPoints: 3,
            backgroundImg: 'engine_compartment_not_faded_with_AC_machine-a.png',
            // /////////////////////////////////////

            // View Specific properties ////////////
            leftRightPopOutIsShown: true,
            screenTxt1: '',
            screenTxt2: '',
            screenTxt3: '',
            screenTxt4: '',

            chargeText: {
                '0': 'CHARGE 02.20 LBS',
                '1': 'CHARGE 02.10 LBS',
                '2': 'CHARGE 02.00 LBS',
                '3': 'CHARGE 01.90 LBS',
                '4': 'CHARGE 01.80 LBS',
                '5': 'CHARGE 01.70 LBS'
            },

            chargeInProgressText: {
                '0': '00.00 LBS',
                '1': '00.60 LBS',
                '2': '01.20 LBS',
                '3': '01.80 LBS'
            },

            chargeCounter: 2,
            chargeInProgressCounter: 0,

            // Hints should always follow this naming convention
            t1ShowHint: false,
            t2a1ShowHint: false,
            t2a2ShowHint: false,
            t3ShowHint: false,
            t4ShowHint: false,
            t5ShowHint: true
        }
    },

    // Mounted is used for things that need to be active when the
    // view first loads, such as configs and init and any icons
    mounted() {
        // Configure the view (Activity Title, View Mode[full/box], Activity ID)
        this.$core.Activity.configView('System Charging', 'full', 'A3')
        // Initlize the activity view
        this.$core.Activity.init([this.t1])

        // Show and Enable SI Menu IconBar
        this.$core.IconBar.ServiceInfo.show()
        this.$core.IconBar.ServiceInfo.enable()
    },

    // Methods imports the sequence functions. You should only add
    // helper functions here. All task logic needs to be in the
    // sequecnxe file.
    methods: {
        // Required for sequence file
        ...A3V1Seq,

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

        // Updates Charge Indicator
        updateCharge() {
            // Reassign this
            let vm = this
            // Update LCD screen
            this.screenTxt1 = this.chargeInProgressText[this.chargeInProgressCounter]
            // Check to see if charge reached correct weight
            if (this.screenTxt1 === '01.80 LBS') {
                // Call next task action
                this.t4a4()
            } else {
                // re-call updateCharge every second to loop thru screen text
                setTimeout(() => {
                    vm.chargeInProgressCounter = (vm.chargeInProgressCounter + 1)
                    vm.updateCharge()
                }, 1000)
            }
        }

    }
}
</script>

<style scoped>
/** View Specific Styles ********************************/

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

/**  **/
#needle-low {
    position: absolute;
    top: 118px;
    left: 79px;
    width: 172px;
    height: 172px;
    background: url('/assets/img/activities/ac_machine_control_panel_needle.png') no-repeat;
    background-size: 45%;
    background-position: 27px 70px;
    transform: rotate(-15deg);
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
    transform: rotate(-50deg);
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

/** HOTSPOSTS & HINTS **/
#t1-hotspot {
    position: absolute;
    left: 185px;
    top: 432px;
    width: 100px;
    height: 25px;
}

#t1-hint {
    position: absolute;
    left: 181px;
    top: 430px;
    width: 102px;
    height: 25px;
    border-radius: 10px;
}

#t2a1-hotspot {
    position: absolute;
    left: 119px;
    top: 354px;
    width: 51px;
    height: 25px;
}

#t2a1-hint {
    position: absolute;
    left: 118px;
    top: 352px;
    width: 51px;
    height: 25px;
    border-radius: 10px;
}

#t2a2-hotspot {
    position: absolute;
    left: 119px;
    top: 432px;
    width: 51px;
    height: 25px;
}

#t2a2-hint {
    position: absolute;
    left: 118px;
    top: 429px;
    width: 51px;
    height: 26px;
    border-radius: 10px;
}

#t3-hotspot {
    position: absolute;
    left: 81px;
    top: 262px;
    width: 104px;
    height: 55px;
}

#t3-hint {
    position: absolute;
    left: 79px;
    top: 261px;
    width: 104px;
    height: 55px;
    border-radius: 10px;
}

#t4-hint {
    position: absolute;
    left: 320px;
    top: 360px;
    width: 102px;
    height: 25px;
    border-radius: 10px;
    z-index: 6px;
}

#t5-hint {
    position: absolute;
    left: 357px;
    top: 344px;
    width: 25px;
    height: 102px;
    border-radius: 10px;
    z-index: 6px;
}
</style>
