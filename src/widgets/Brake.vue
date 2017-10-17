<template>
  <div id="brake" >
    <div class="brake-BG">
    </div>
    <div class="brakeImg" @click="clickable() ? t3a1(brakeRow) : ''" id="brake"></div>
  </div>
</template>
<script>
import {TweenMax, SteppedEase} from 'gsap'
export default {
    name: 'Brake',
    props: [
        'currentTask',
        'task'
    ],
    data() {
        return {
            brakeRow: 0
        }
    },
    methods: {
        clickable() {
            if (this.currentTask === this.task) {
                return true
            }
            return false
        },
        t3a1(row) {
            this.$emit('onBrake')
            TweenMax.to(`#brake`, 1, {
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
        }
    }
}
</script>

<!-- <style scoped>
  .brake-BG {
    background: url('/assets/img/module/brake_pedal_sprite_BG.png') no-repeat;
    background-size: 184% auto;
    border-radius: 50%;
    width: 160px;
    height: 160px;
    margin-top: -7px;
    border: 2px solid #a6a6a6;
    background-position: 62% 40%;
  }
 .brakeImg {
    background: url('/assets/img/module/brake_pedal_sprite.png') no-repeat;
    margin-top: -130px;
    margin-left: 35px;
    z-index: 5;
    background-position: 0 0;
    height: 70px;
    background-size: 452% auto;
    width: 50px;    
  }
</style> -->

<style scoped>
  .brake-BG {
    background: url('/assets/img/module/brake_pedal_sprite_BG.png') no-repeat;
    background-size: 184% auto;
    border-radius: 50%;
    width: 160px;
    height: 160px;
    margin-top: -14%;
    border: 2px solid #a6a6a6;
    background-position: 62% 40%;

  }
 .brakeImg {
    background: url('/assets/img/module/brake_pedal_sprite.png') no-repeat;
    margin-top: -130px;
    margin-left: 35px;
    z-index: 5;
    background-position: 0 0;
    height: 70px;
    background-size: 452% auto;
    width: 50px;    
  }
</style>

