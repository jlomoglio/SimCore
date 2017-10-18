
<template>
<div class="gear-container">
  <div class="gear-BG">
      <img id="gear-img" class="gear-img" src="/assets/img/module/gear_shift_movement_Sprite.png"/>
  </div>
  <div class="hot-spots">
    <hint-box id="drive-hint" v-hint="driveShowHint"></hint-box>
    <hint-box id="park-hint" v-hint="parkShowHint"></hint-box>

    <div id="drive-hotspot" @click="clickable() ? drive() : ''"></div>
    <div id="park-hotspot" @click="clickable() ? park() : ''"></div>
  </div>
  
</div>
</template>
<script>
import { TweenMax, SteppedEase } from 'gsap'
import HintBox from './HintBox'
export default {
    props: [
        'currentTask',
        'tasks',
        'driveHint',
        'parkHint'
    ],
    data() {
        return {
            row: 0,
            driveShowHint: this.driveHint,
            parkShowHint: this.parkHint
        }
    },
    components: {
        HintBox
    },
    watch: {
        driveHint(newVal) {
            return this.driveShowHint = newVal
        },
        parkHint(newVal) {
            return this.parkShowHint = newVal
        }
    },
    methods: {
        clickable() {
            let key = -1
            this.tasks.map((task, i) => {
                if (this.currentTask === task) {
                    key = i
                }
            })
            if (key !== -1) {
                return true
            }
            return false
        },
        drive() {
            this.driveShowHint = false
            this.$emit('correct')
            this.putInDrive()
        },
        park() {
            this.parkShowHint = false
            this.$emit('correct')
            this.row -= 1
            this.putInPark()
        },
        putInDrive(ro) {
            TweenMax.to(`#gear-img`, 1, {
                left: `-464px`,
                ease: SteppedEase.config(4),
                onComplete: this.driveCallBack
            })
        },
        driveCallBack() {
            this.row += 1
            if (this.row < 4) {
                var sprite = document.getElementById('gear-img')
                var yPosition = this.row * 116
                sprite.style.left = '0px'
                sprite.style.top = `-${yPosition}px`
                this.putInDrive()
            } else {
                this.$emit('drive')
            }
        },
        putInPark() {
            TweenMax.to(`#gear-img`, 1, {
                left: `0px`,
                ease: SteppedEase.config(4),
                onComplete: this.parkCallBack
            })
        },
        parkCallBack() {
            this.row -= 1
            if (this.row >= 0) {
                var sprite = document.getElementById('gear-img')
                var yPosition = this.row * 116
                sprite.style.left = '-464px'
                sprite.style.top = `-${yPosition}px`
                this.putInPark()
            } else {
                this.$emit('park')
            }
        }
    }
}
</script>
<style scoped>
  .gear-BG {
    border-radius: 50%;
    width: 120px;
    height: 120px;
    overflow: hidden;
    box-sizing: border-box;
    border: 2px solid #a6a6a6;
  }
 #drive-hotspot {
   position: absolute;
   bottom: 38px;
   left: 45px;
   width: 7px;
   height: 8px;
   border-radius: 50%;
   z-index: 5;
 }
 #park-hotspot {
   position: absolute;
   bottom: 49px;
   left: 33px;
   width: 6px;
   height: 8px;
   border-radius: 12px;
   z-index: 5;
 }
  #drive-hint{
   position: absolute;
   bottom: 38px;
   left: 45px;
   width: 7px;
   height: 8px;
   border-radius: 50%;
 }
 #park-hint {
   position: absolute;
   bottom: 49px;
   left: 33px;
   width: 6px;
   height: 8px;
   border-radius: 12px;
 }
 .gear-img {
    width: 500%;
    height: 400%;
    left: 0px;
    position: relative;
 }
 .hot-spots {
    position: relative;
    z-index: 2;
    height: 0;
 }
</style>
