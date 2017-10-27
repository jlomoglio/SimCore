<template>
    <view-box id="a5v1" :background="backgroundImg">
        <content-box :clickable="isClickable" @action="incorrect(currentTask)" id="content">
            <zoom-panel>
                <div class="width-25 pull-left">
                    <div class="width-100 pull-left">
                        <ignition-switch
                                left="15px"
                                @lock="t15a1('t1Lock')"
                                @acc="incorrect('t1')"
                                @on="t11a1()"
                                :lockHint="t15ShowHint"
                                :accHint="false"
                                :onHint="t11ShowHint"
                                :currentAction= "currentAction"
                                :currentTask = "currentTask"
                                :tasks="['t11', 't15']"
                        >
                        </ignition-switch>
                    </div>
                    <div class="width-100 pull-left brakeImg">
                        <Brake
                                @onBrake="t13a1()"
                                :currentTask = "currentTask"
                                :brakeHint = "t13ShowHint"
                                :task="'t13'"
                        ></Brake>
                    </div>
                    <div class="width-100 pull-left gearBG">
                        <Gear
                                @park="t14a1('t14')"
                                @drive="t12a1()"
                                :currentTask = "currentTask"
                                @correct="correct()"
                                :tasks="['t12', 't14']"
                                :driveHint= "t12ShowHint"
                                :parkHint = "t14ShowHint"
                        ></Gear>
                    </div>
                </div>
                <div class="width-50 calipers-container">
					<div class="left-calipers">
						<div class="caliper-br caliper-1">
                            <span class="lf-label">LF</span>
							<div class="caliper-arrow caliper-arrow-1" v-if="breaksApplied"></div>
							<div class="caliper-arrow caliper-arrow-2" v-if="breaksApplied"></div>
							<div class="caliper-arrow caliper-arrow-3" v-if="breaksApplied"></div>
                            <StopRotor rotorName='LFRotor' v-if="stopRotor" @onComplete="t13Completed()"></StopRotor>
                            <div class="lf-rotor" v-else></div>
						</div>
						<div class="caliper-br caliper-2">
                            <span class="lr-label">LR</span>
							<div class="caliper-arrow caliper-arrow-1" v-if="breaksApplied"></div>
							<div class="caliper-arrow caliper-arrow-2" v-if="breaksApplied"></div>
							<div class="caliper-arrow caliper-arrow-3" v-if="breaksApplied"></div>
                            <StopRotor rotorName='LRRotor' v-if="stopRotor"></StopRotor>
                            <div class="lr-rotor" v-else></div>
						</div>
					</div>
					<div class="middle-arrow">

					</div>
					<div class="right-calipers">
						<div class="caliper-br caliper-3">
                            <span class="rf-label">RF</span>
							<div class="caliper-arrow caliper-arrow-1" v-if="breaksApplied"></div>
							<div class="caliper-arrow caliper-arrow-2" v-if="breaksApplied"></div>
							<div class="caliper-arrow caliper-arrow-3" v-if="breaksApplied"></div>
                             <StopRotor rotorName='RFRotor' v-if="stopRotor"></StopRotor>
                             <div class="rf-rotor" v-else></div>
						</div>
						<div class="caliper-br caliper-4">
                            <span class="rr-label">RR</span>
							<div class="caliper-arrow caliper-arrow-1" v-if="breaksApplied"></div>
							<div class="caliper-arrow caliper-arrow-2" v-if="breaksApplied"></div>
							<div class="caliper-arrow caliper-arrow-3" v-if="breaksApplied"></div>
                            <StopRotor rotorName='RRRotor' v-if="stopRotor"></StopRotor>
                            <div class="rr-rotor" v-else></div>
						</div>
					</div>
				</div>
            </zoom-panel>
            
        </content-box>
    </view-box>
</template>

<script>
    import ViewBox from '../../widgets/ViewBox'
    import ContentBox from '../../widgets/ContentBox'
    import ZoomPanel from '../../widgets/ZoomPanel'
    import StopRotor from '../../sim-core/components/sim-page/StopRotor'
    import IgnitionSwitch from '../../widgets/ignition-switch/IgnitionSwitch'
    import Brake from '../../widgets/Brake'
    import Gear from '../../widgets/Gear'
    import A1V3Seq from './a1v3-seq'
    
    export default {
        name: 'A1V3',

        // This is a required list of imported components (Widgets)
        components: {
            ViewBox,
            ContentBox,
            ZoomPanel,
            StopRotor,
            IgnitionSwitch,
            Brake,
            Gear
        },
        mounted() {
            // Configure the view (Activity Title, View Mode[full/box], Activity ID)
            this.$core.Activity.configView('', 'full', 'A1')
            // Initlize the activity view
            this.$core.Activity.init([this.t11])

            // Show Zoom Icons
            this.$core.IconBar.Zoom.show()

            // Show and Enable SI Menu Icon
            this.$core.IconBar.ServiceInfo.show()
            this.$core.IconBar.ServiceInfo.enable()
        },

        // Data contains properties that manage the state of the views
        // Typical usage is for boolean properties and view text and
        // properties used for scoring.
        data() {
            return {
                currentTask: 't11',
                currentAttempts: 1,
                currentPoints: 3,
                isClickable: false,
                currentAction: 'on',
                // Required Properties //////////////////
                backgroundImg: 'engine_compartment_not_faded_with_AC_machine-a.png',
                stopRotor: false,
                brakeRow: 0,
                breaksApplied: false,
                t11ShowHint: false,
                t12ShowHint: false,
                t13ShowHint: false,
                t14ShowHint: false,
                t15ShowHint: false
            }
        },
        methods: {
            ...A1V3Seq,
            showArrows: function (event) {
                this.breaksApplied = !this.breaksApplied
            },
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
    .pull-left {
        float: left;
    }
    .width-50 {
        width: 50%;
    }
    .width-50 .width-50 {
        min-height: auto;
    }
    .width-25 {
        width: 25%;
    }
    .temp {
        width: 200px;
        height: 200px;
    }
    .width-100 {
        width: 100vh;
        min-height: 20vh;
    }
    .blue-arrow{
        background: url('/assets/img/activities/long_blue_arrow.png') no-repeat;
        position: relative;
        top: 50px; 
        left: 200px;
        right: 0;
        bottom: 0;
        height: 590px;
    }
    .red-arrow{
        background: url('/assets/img/activities/short_red_arrow.png') no-repeat;
        position: relative;
        right: 0;
        bottom: 0;
        top:-300px;
    }
    /** View Specific Styles ********************************/
    #a5v1 {
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
    .width-50 {
        width: 50%;
    }
    .width-50 .width-50 {
        min-height: auto;
    }
    .width-25 {
        width: 25%;
    }
    .temp {
        width: 200px;
        height: 200px;
    }
    .width-100 {
        width: 100%;
        min-height: 150px;
    }
    .brakeImg {
        margin: 20px 10px;
    }
    .gearBG {
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
        z-index: 25;
    }

    #safe-continue:active {
        background: url('/assets/img/buttons/horizontal/continue_over.png');
        background-size: 100% 100%;
    }
    .calipers-container {
    width: 412px;
    height: auto;
    float: left;
    }
    .left-calipers, .middle-arrow, .right-calipers {
    float: left;
    }
    .middle-arrow {
    width: 40px;
    height: 460px;
    margin: 0 10px;
    background-image: url('/assets/img/activities/long_blue_arrow.png');
    background-repeat: no-repeat;
    background-size: auto;
    background-position: center 25px;
    }
    .caliper-br {
    position: relative;
    width: 170px;
    height: 200px;
    margin-top: 15px;
    /* border: 1px solid red; */
    }

    .caliper-arrow {
    position: absolute;
    width: 15px;
    height: 10px;
    z-index: 99;
    background-image: url('/assets/img/activities/short_red_arrow.png');
    background-repeat: no-repeat;
    background-size: auto;
    background-position: center center;
    }
    .caliper-1 .caliper-arrow-1 {
        left: 27px;
        top: 48px;
    }
    .caliper-1 .caliper-arrow-2 {
        left: 83px;
        top: 50px;
        transform: rotate(180deg);
    }
    .caliper-1 .caliper-arrow-3 {
        left: 154px;
        top: 101px;
        transform: rotate(117deg);
    }
    .caliper-2 .caliper-arrow-1 {
        left: 21px;
        top: 150px;
    }
    .caliper-2 .caliper-arrow-2 {
        left: 76px;
        top: 150px;
        transform: rotate(180deg);
    }
    .caliper-2 .caliper-arrow-3 {
        left: 130px;
        top: 56px;
        transform: rotate(117deg);
    }

    .caliper-3 .caliper-arrow-1 {
        left: 80px;
        top: 51px;
    }
    .caliper-3 .caliper-arrow-2 {
        left: 133px;
        top: 51px;
        transform: rotate(180deg);
    }
    .caliper-3 .caliper-arrow-3 {
        left: 30px;
        top: 142px;
        transform: rotate(-65deg);
    }

    .caliper-4 .caliper-arrow-1 {
        left: 80px;
        top: 150px;
    }
    .caliper-4 .caliper-arrow-2 {
    left: 134px;
    top: 150px;
    transform: rotate(180deg);
    }
    .caliper-4 .caliper-arrow-3 {
    left: 30px;
    top: 58px;
    transform: rotate(60deg);
    }
    .lr-label, .lf-label{
    position: absolute;
    font-family: Roboto-Regular;
    top: 93px;
    left: -20px;
    }

    .rr-label, .rf-label{
    position: absolute;
    font-family: Roboto-Regular;
    top: 93px;
    left: 170px;
    }
    .lf-rotor {
        /* width: auto;
        height: 200px;
        margin-left: -41px;
        background: url('/assets/img/module/disc_pad_piston_rotor_LF_sprite.png') no-repeat;
        background-position: 0 0;
        background-size: 537% auto;
        position: relative;
        left: 35px;
        top: 20px; */
        /* width: auto;
        height: 200px;
        margin-left: -40px;
        background: url('/assets/img/module/disc_pad_piston_rotor_LF_sprite.png') no-repeat;
        background-position: 0 0;
        background-size: 1000% auto;
        position: relative;
        left:35px; */

        width: auto;
        height: 200px;
        margin-left: -43px;
        background: url('/assets/img/module/disc_pad_piston_rotor_LF_sprite.png') no-repeat;
        background-position: 0 0;
        background-size: 892% auto;
        position: relative;
        left: 34px;
        top: 16px;
    }
    .lr-rotor {
        width: auto;
        height: 200px;
        margin-left: -40px;
        background: url('/assets/img/module/disc_pad_piston_rotor_LR_sprite.png') no-repeat;
        background-position: 0 0;
        background-size: 1000% auto;
        position: relative;
    }
    .rf-rotor {
        width: auto;
        height: 200px;
        margin-right: -40px;
        background: url('/assets/img/module/disc_pad_piston_rotor_RF_sprite.png') no-repeat;
        background-position: 0 0;
        background-size: 1000% auto;
        position: relative;
    }
    .rr-rotor {
        width: auto;
        height: 200px;
        margin-right: -40px;
        background: url('/assets/img/module/disc_pad_piston_rotor_RR_sprite.png') no-repeat;
        background-position: 0 0;
        background-size: 1000% auto;
        position: relative;
    }
</style>
