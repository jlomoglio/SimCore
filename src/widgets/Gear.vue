
<template>
  <div class="gear-container">
    <div class="gear-BG">
      <img id="gear-img" class="gear-img" src="/assets/img/module/gear_shift_movement_Sprite.png"/>
    </div>
    <div class="hot-spots">
      <hint-box id="drive-hint" v-hint="driveShowHint"></hint-box>
      <hint-box id="park-hint" v-hint="parkShowHint"></hint-box>
      
      <div id="drive-hotspot" @click="drive()"></div>
      <div id="park-hotspot" @click="park()"></div>
    </div>

    
  </div>
</template>
<script>
import { TweenMax, SteppedEase } from 'gsap'
import HintBox from './HintBox'

export default {
    props: [
        'currentAction',
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
        drive() {
            if (this.currentAction === 'drive') {
                this.driveShowHint = false
                this.$emit('correct')
                this.putInDrive()
            } else {
                this.$emit('incorrect')
            }
        },
        park() {
            if (this.currentAction === 'park') {
                this.parkShowHint = false
                this.$emit('correct')
                this.row -= 1
                this.putInPark()
            } else {
                this.$emit('incorrect')
            }
        },
        putInDrive(ro) {
            TweenMax.to(`#gear-img`, 1, {
                marginLeft: `-544px`,
                ease: SteppedEase.config(4),
                onComplete: this.driveCallBack
            })
        },
        driveCallBack() {
            this.row += 1
            if (this.row < 4) {
                var sprite = document.getElementById('gear-img')
                var yPosition = this.row * 136
                sprite.style.marginLeft = '0px'
                sprite.style.marginTop = `-${yPosition}px`
                this.putInDrive()
            } else {
                this.$emit('drive')
            }
        },
        putInPark() {
            TweenMax.to(`#gear-img`, 1, {
                marginLeft: `0px`,
                ease: SteppedEase.config(4),
                onComplete: this.parkCallBack
            })
        },
        parkCallBack() {
            this.row -= 1
            if (this.row >= 0) {
                var sprite = document.getElementById('gear-img')
                var yPosition = this.row * 136
                sprite.style.marginLeft = '-544px'
                sprite.style.marginTop = `-${yPosition}px`
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
    width: 140px;
    height: 140px;
    overflow: hidden;
    box-sizing: border-box;
    border: 2px solid #a6a6a6;
    position: fixed;
    margin-top: -14px;
    margin-left: 7px;
  }
  #drive-hotspot {
    position: absolute;
    bottom: -82px;
    left: 58px;
    width: 9px;
    height: 10px;
    border-radius: 50%;
    z-index: 5;
  }
  #park-hotspot {
    position: absolute;
    bottom: -70px;
    left: 44px;
    width: 9px;
    height: 10px;
    border-radius: 12px;
    z-index: 5;
  }
  #drive-hint{
    position: absolute;
    bottom: -82px;
    left: 58px;
    width: 9px;
    height: 10px;
    border-radius: 50%;
  }
  #park-hint {
    position: absolute;
    bottom: -70px;
    left: 44px;
    width: 9px;
    height: 10px;
    border-radius: 12px;
  }
  .gear-img {
    width: 500%;
    height: 400%;
    margin-left: 0px;
    margin-top: 0px;
    position: relative;
  }
  .hot-spots {
    position: relative;
    z-index: 2;
    height: 0;
  }
</style>
