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
            if (this.row < 5) {
                var yPosition = this.row * 19.8
                var sprite = document.getElementById(this.rotorName)
                sprite.style.backgroundPositionX = '0%'
                sprite.style.backgroundPositionY = `${yPosition}%`
                console.log('yPosition', yPosition, sprite.style.backgroundPositionX)
                this.loadRows(yPosition)
            } else {
                this.$emit('onComplete')
            }
        },
        loadRows(row) {
            console.log('loadRows')
            TweenMax.to(`#${this.rotorName}`, 1, {
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
        width: auto;
        height: 200px;
        margin-left: -40px;
        background: url('/assets/img/module/disc_pad_piston_rotor_LF_sprite_temp.png') no-repeat;
        background-position: 0 0;
        background-size: 1000% auto;
        position: relative;
        left:35px;
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
