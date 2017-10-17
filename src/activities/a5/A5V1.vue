<template>
    <view-box id="a5v1" :background="backgroundImg">
        <content-box :clickable="isClickable" @action="incorrect(currentTask)" id="content">
            <zoom-panel>
                <div class="width-25 pull-left">
                    <div class="width-100 pull-left">
                        <ignition-switch
                                left="15px"
                                @lock="t5a1('t1Lock')"
                                @acc="incorrect('t1')"
                                @on="t1a1()"
                                :lockHint="false"
                                :accHint="false"
                                :onHint="false"
                                :currentAction= "currentAction"
                                :currentTask = "currentTask"
                                :tasks="['t1a1', 't5a1']"
                        >
                        </ignition-switch>
                    </div>
                    <div class="width-100 pull-left brakeImg">
                        <Brake
                                @onBrake="t3a1()"
                                :currentTask = "currentTask"
                                :task="'t3a1'"
                        ></Brake>
                    </div>
                    <div class="width-100 pull-left gearBG">
                        <Gear
                                @park="t4a1('t2')"
                                @drive="t2a1()"
                                :currentTask = "currentTask"
                                :tasks="['t2a1', 't4a1']"
                        ></Gear>
                        <button v-on:click="greet">show arrow</button>
                    </div>
                </div>
                <div class="width-50 pull-left">
                    <div class="width-50 pull-left">
                        <!--<div class="temp"></div>-->
                        <StopRotor rotorName='LFRotor'></StopRotor>
                    </div>
                    <div class="width-50 pull-left">
                        <StopRotor rotorName='RFRotor'></StopRotor>
                    </div>
                    <div class="blue-arrow"></div>
                    <div class="width-50 pull-left">
                        <StopRotor rotorName='LRRotor'></StopRotor>
                    </div>
                    <div class="width-50 pull-left">
                        <StopRotor rotorName='RRRotor'></StopRotor>
                    </div>
                    <div class="red-arrow" v-show="breaksApplied">BREAK</div>

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
    import { TweenMax, SteppedEase } from 'gsap'
    import Brake from '../../widgets/Brake'
    export default {
        name: 'A5V1',

        // This is a required list of imported components (Widgets)
        components: {
            ViewBox,
            ContentBox,
            ZoomPanel,
            StopRotor,
            IgnitionSwitch,
            Brake
        },

        // Data contains properties that manage the state of the views
        // Typical usage is for boolean properties and view text and
        // properties used for scoring.
        data() {
            return {
                currentTask: 't7',
                currentAttempts: 1,
                currentPoints: 3,
                // Required Properties //////////////////
                backgroundImg: 'engine_compartment_not_faded_with_AC_machine-a.png',
                showLRRotor: false,
                brakeRow: 0,
                breaksApplied: false
            }
        },
        methods: {
            greet: function (event) {
                this.breaksApplied = !this.breaksApplied
            },
            t3a1(row) {
                TweenMax.to(`#brake`, 1, {
                    repeat: 1,
                    backgroundPosition: `-180px ${row}px`,
                    ease: SteppedEase.config(4),
                    onComplete: this.callBack
                })
            },
            brakeCallback() {
                this.row += 1
                if (this.row < 2) {
                    var yPosition = this.row * 66
                    var sprite = document.getElementById('brake')
                    sprite.style.backgroundPositionX = '0px'
                    sprite.style.backgroundPositionY = `${yPosition}px`
                    console.log('yPosition', yPosition, sprite.style.backgroundPositionX)
                    this.t3a1(yPosition)
                }
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
            tempFun() {
                console.log('temp function need to be updated')
                this.showLRRotor = true
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
        background: url('/assets/img/module/gear_shift_movement_Sprite.png') no-repeat;
        background-size: 586% auto;
        border-radius: 50%;
        margin-left: 25px;
        height: 120px;
        width: 145px;
        margin-top: -32px;
        background-position: 1.5% 0;
    }
    .brakeImg {
        margin: 20px 10px;
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
