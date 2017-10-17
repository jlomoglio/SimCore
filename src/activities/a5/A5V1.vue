<template>
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

