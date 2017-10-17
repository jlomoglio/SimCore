<template>
<<<<<<< HEAD
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
                        <button v-on:click="greet">apply brakes</button>
                    </div>
                </div>
                <div class="width-50 calipers-container">
					<div class="left-calipers">
						<div class="caliper-br caliper-1">
                            <span class="lf-label">LF</span>
							<div class="caliper-arrow caliper-arrow-1" v-if="breaksApplied"></div>
							<div class="caliper-arrow caliper-arrow-2" v-if="breaksApplied"></div>
							<div class="caliper-arrow caliper-arrow-3" v-if="breaksApplied"></div>
                            <StopRotor rotorName='LFRotor'></StopRotor>
						</div>
						<div class="caliper-br caliper-2">
                            <span class="lr-label">LR</span>
							<div class="caliper-arrow caliper-arrow-1" v-if="breaksApplied"></div>
							<div class="caliper-arrow caliper-arrow-2" v-if="breaksApplied"></div>
							<div class="caliper-arrow caliper-arrow-3" v-if="breaksApplied"></div>
                            <StopRotor rotorName='LRRotor'></StopRotor>
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
                             <StopRotor rotorName='RFRotor'></StopRotor>
						</div>
						<div class="caliper-br caliper-4">
                            <span class="rr-label">RR</span>
							<div class="caliper-arrow caliper-arrow-1" v-if="breaksApplied"></div>
							<div class="caliper-arrow caliper-arrow-2" v-if="breaksApplied"></div>
							<div class="caliper-arrow caliper-arrow-3" v-if="breaksApplied"></div>
                            <StopRotor rotorName='RRRotor'></StopRotor>
						</div>
					</div>
				</div>
                <!-- <div class="width-50 pull-left">
                    <div class="width-50 pull-left caliper-br caliper-1">
                        <div class="caliper-arrow caliper-arrow-1"></div>
                        <div class="caliper-arrow caliper-arrow-2"></div>
                        <div class="caliper-arrow caliper-arrow-3"></div>
                       
                        <StopRotor rotorName='LFRotor'></StopRotor>
                    </div>
                    <div class="width-50 pull-left caliper-br caliper-3">
                        <div class="caliper-arrow caliper-arrow-1"></div>
                        <div class="caliper-arrow caliper-arrow-2"></div>
                        <div class="caliper-arrow caliper-arrow-3"></div>
                        <StopRotor rotorName='RFRotor'></StopRotor>
                    </div>
                    
                    <div class="width-50 pull-left caliper-br caliper-2">
                        <div class="caliper-arrow caliper-arrow-1"></div>
                        <div class="caliper-arrow caliper-arrow-2"></div>
                        <div class="caliper-arrow caliper-arrow-3"></div>
                        <StopRotor rotorName='LRRotor'></StopRotor>
                    </div>
                    <div class="width-50 pull-left caliper-br caliper-4">
                        <div class="caliper-arrow caliper-arrow-1"></div>
                        <div class="caliper-arrow caliper-arrow-2"></div>
                        <div class="caliper-arrow caliper-arrow-3"></div>
                        <StopRotor rotorName='RRRotor'></StopRotor>
                    </div>
                    <div class="red-arrow" v-show="breaksApplied">BREAK</div>

                </div> -->
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
    top: 42px;
    }
    .caliper-1 .caliper-arrow-2 {
    left: 83px;
    top: 44px;
    transform: rotate(180deg);
    }
    .caliper-1 .caliper-arrow-3 {
    left: 130px;
    top: 135px;
    transform: rotate(242deg);
    }

    .caliper-2 .caliper-arrow-1 {
    left: 21px;
    top: 144px;
    }
    .caliper-2 .caliper-arrow-2 {
    left: 76px;
    top: 144px;
    transform: rotate(180deg);
    }
    .caliper-2 .caliper-arrow-3 {
    left: 130px;
    top: 50px;
    transform: rotate(117deg);
    }

    .caliper-3 .caliper-arrow-1 {
        left: 80px;
        top: 45px;
    }
    .caliper-3 .caliper-arrow-2 {
    left: 133px;
    top: 45px;
    transform: rotate(180deg);
    }
    .caliper-3 .caliper-arrow-3 {
    left: 30px;
    top: 136px;
    transform: rotate(-65deg);
    }

    .caliper-4 .caliper-arrow-1 {
    left: 80px;
    top: 144px;
    }
    .caliper-4 .caliper-arrow-2 {
    left: 134px;
    top: 144px;
    transform: rotate(180deg);
    }
    .caliper-4 .caliper-arrow-3 {
    left: 30px;
    top: 52px;
    transform: rotate(60deg);
    }
    .lr-label, .lf-label{
    position: absolute; 
    top: 93px;
    left: -20px;
    }

    .rr-label, .rf-label{
    position: absolute;
    top: 93px;
    left: 170px;
    }


</style>
=======
  <div>
    <div class="width-25 pull-left">
      <div class="width-100 pull-left">
        <ignition-switch
                left="15px"
                @lock="incorrect('t3')"
                @acc="incorrect('t3')"
                @on="tempFun()"
                @start="tempFun()"
                :lockHint="false"
                :accHint="false"
                :onHint="false"
        >
        </ignition-switch>
      </div>
      <div class="width-100 pull-left">
        <Brake></Brake>
      </div>
      <div class="width-100 pull-left">
        <div class="gear-BG"></div>
      </div>
    </div>
    <div class="width-50 pull-left">
      <div class="width-50 pull-left">
        <div class="temp"></div>
      </div>
      <div class="width-50 pull-left">
        <StopRotor rotorName='RFRotor'></StopRotor>
      </div>
      <div class="width-50 pull-left">
        <StopRotor rotorName='LRRotor'></StopRotor>
      </div>
      <div class="width-50 pull-left">
        <StopRotor rotorName='RRRotor'></StopRotor>
      </div>
    </div>
    <div class="width-25 pull-left">
      <!-- right -->
    </div>
  </div> 
</template>
<script>
import StopRotor from '../../sim-core/components/sim-page/StopRotor'
import IgnitionSwitch from '../../widgets/ignition-switch/IgnitionSwitch'
import { TweenMax, SteppedEase } from 'gsap'
import Brake from '../../widgets/Brake'

export default {
    name: 'A5V1',
    components: {
        StopRotor,
        IgnitionSwitch,
        Brake
    },
    data() {
        return {
            showLRRotor: false,
            brakeRow: 0
        }
    },
    methods: {
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
        incorrect() {

        },
        tempFun() {
            console.log('temp function need to be updated')
            this.showLRRotor = true
        }
    }
}
</script>
<style>
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
  .brake-BG {
    background: url('/assets/img/module/brake_pedal_sprite_BG.png') no-repeat;
    background-size: 184% auto;
    border-radius: 50%;
    width: 150px;
    margin: 30px 10px;
    height: 150px;
    background-position: 62% 40%;
  }
  .gear-BG {
    background: url('/assets/img/module/gear_shift_movement_Sprite.png') no-repeat;
    background-size: 586% auto;
    border-radius: 50%;
    width: 120px;
    margin-top: 60px;
    margin-left: 25px;
    height: 120px;
    background-position: 1.5% 0;
  }

</style>

>>>>>>> Initialized activity 3
