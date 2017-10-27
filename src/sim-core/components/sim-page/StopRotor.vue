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
                var yPosition = this.row * 19.475
                var sprite = document.getElementById(this.rotorName)
                sprite.style.backgroundPositionX = '0%'
                sprite.style.backgroundPositionY = `${yPosition}%`
                this.loadRows(yPosition)
            } else if (this.rotorName === 'LFRotor') {
                this.$emit('onComplete')
            }
        },
        callNextRow() {
            this.row += 1
            if (this.row < 4) {
                var yPosition = this.row * 25.5
                var sprite = document.getElementById(this.rotorName)
                sprite.style.backgroundPositionX = '0%'
                sprite.style.backgroundPositionY = `${yPosition}%`
                this.loadRows(yPosition)
            } else if (this.rotorName === 'LFRotor') {
                this.$emit('onComplete')
            }
        },
        loadRows(row) {
            if (this.rotorName === 'LFRotor') {
                TweenMax.to(`#${this.rotorName}`, 1, {
                    repeat: 1,
                    backgroundPosition: `101.22% ${row}%`,
                    ease: SteppedEase.config(9),
                    // onComplete: this.callBack
                    onComplete: this.callNextRow
                })
            } else {
                TweenMax.to(`#${this.rotorName}`, 1, {
                    backgroundPosition: `99% ${row}%`,
                    ease: SteppedEase.config(9),
                    onComplete: this.callBack
                })
            }
        }
    }
}
</script>
<style scoped>
    .lf-rotor {
        width: 206px;
        height: 200px;
        margin-left: -43px;
        background: url('/assets/img/module/disc_pad_piston_rotor_LF_sprite.png') no-repeat;
        background-position: 0 0;
        background-size: 903% auto;
        position: relative;
        left: 34px;
        top: 27px;
    }
    .lr-rotor {
        width: auto;
        height: 200px;
        margin-left: -40px;
        background: url('/assets/img/module/disc_pad_piston_rotor_LR_sprite.png') no-repeat;
        background-position: 0 0;
        background-size: 1100% auto;
        position: relative;
    }
    .rf-rotor {
        width: auto;
        height: 200px;
        margin-right: -40px;
        background: url('/assets/img/module/disc_pad_piston_rotor_RF_sprite.png') no-repeat;
        background-position: 0 0;
        background-size: 1100% auto;
        position: relative;
    }
    .rr-rotor {
        width: auto;
        height: 200px;
        margin-right: -40px;
        background: url('/assets/img/module/disc_pad_piston_rotor_RR_sprite.png') no-repeat;
        background-position: 0 0;
        background-size: 1100% auto;
        position: relative;
    }
</style>
