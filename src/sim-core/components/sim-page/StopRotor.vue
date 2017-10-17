<template>
    <div>
        <div v-if="this.rotorName === 'LRRotor'" class="lr-rotor" id="LRRotor">
        </div>
        <div v-if="this.rotorName === 'LFRotor'"  class="lf-rotor" id="LFRotor">
        </div>
        <div v-if="this.rotorName === 'RFRotor'" class="rf-rotor" id="RFRotor">
        </div>
        <div v-if="this.rotorName === 'RRRotor'" class="rr-rotor" id="RRRotor">
        </div>
    </div>
</template>
<script>
import { TweenMax, SteppedEase } from 'gsap'

export default {
    name: 'StopRotor',
    props: [ 'rotorName' ],
    data() {
        return {
            row: 0 // start from 0th row
        }
    },
    mounted () {
        this.loadRows(this.row)
    },
    methods: {
        callBack() {
            this.row += 1
            if (this.row < 4) {
                var yPosition = this.row * 20
                var sprite = document.getElementById(this.rotorName)
                sprite.style.backgroundPositionX = '0%'
                sprite.style.backgroundPositionY = `${yPosition}%`
                console.log('yPosition', yPosition, sprite.style.backgroundPositionX)
                this.loadRows(yPosition)
            }
        },
        loadRows(row) {
            TweenMax.to(`#${this.rotorName}`, 1, {
                repeat: 1,
                backgroundPosition: `99.99% ${row}%`,
                ease: SteppedEase.config(9),
                onComplete: this.callBack
            })
        }
    }
}
</script>
<style scoped>
  .lf-rotor {
    width: 200px;
    height: 200px;
    background: url('/assets/img/module/disc_pad_piston_rotor_LF_sprite.png') no-repeat;
    background-position: 0 0;
    background-size: 1000% auto;
    position: relative;
  }
  .lr-rotor {
    width: 200px;
    height: 200px;
    background: url('/assets/img/module/disc_pad_piston_rotor_LR_sprite.png') no-repeat;
    background-position: 0 0;
    background-size: 1000% auto;
    position: relative;
  }
  .rf-rotor {
    width: 200px;
    height: 200px;
    background: url('/assets/img/module/disc_pad_piston_rotor_RF_sprite.png') no-repeat;
    background-position: 0 0;
    background-size: 1000% auto;
    position: relative;
  }
  .rr-rotor {
    width: 200px;
    height: 200px;
    background: url('/assets/img/module/disc_pad_piston_rotor_RR_sprite.png') no-repeat;
    background-position: 0 0;
    background-size: 1000% auto;
    position: relative;
  }
</style>
