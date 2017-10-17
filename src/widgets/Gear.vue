
<template>
<div class="gear-container">
  <div id="gear-BG"></div>
  <div id="drive-hotspot" @click="clickable() ? drive() : ''"></div>
  <div id="park-hotspot" @click="clickable() ? park() : ''"></div>
  
</div>
</template>
<script>
import { TweenMax, SteppedEase } from 'gsap'
export default {
    props: [
        'currentTask',
        'tasks'
    ],
    data() {
        return {
            row: 0
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
            this.putInDrive(this.row)
        },
        park() {
            this.row -= 1
            this.putInPark(360)
        },
        putInDrive(row) {
            TweenMax.to(`#gear-BG`, 1, {
                backgroundPosition: `-473px -${row}px`,
                ease: SteppedEase.config(4),
                onComplete: this.driveCallBack
            })
        },
        driveCallBack() {
            this.row += 1
            if (this.row < 4) {
                var sprite = document.getElementById('gear-BG')
                var yPosition = (this.row * 118) + (this.row - 1)
                sprite.style.backgroundPosition = `0 -${yPosition}px`
                this.putInDrive(yPosition)
            } else {
                this.$emit('drive')
            }
        },
        putInPark(yPosition) {
            TweenMax.to(`#gear-BG`, 1, {
                backgroundPosition: `0px -${yPosition}px`,
                ease: SteppedEase.config(4),
                onComplete: this.parkCallBack
            })
        },
        parkCallBack() {
            this.row -= 1
            if (this.row >= 0) {
                var sprite = document.getElementById('gear-BG')
                var yPosition
                if (this.row > 0) {
                    yPosition = (this.row * 118) + (this.row - 1)
                } else {
                    yPosition = 0
                }
                sprite.style.backgroundPosition = `-473px -${yPosition}px`
                this.putInPark(yPosition)
            } else {
                this.$emit('park')
            }
        }
    }
}
</script>

<!--<style>
 #gear-BG {
    background: url(/assets/img/module/gear_shift_movement_Sprite.png) no-repeat;
    background-size: 593px 476px;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    background-position: 0 0;
    border: 2px solid #a6a6a6;
    box-sizing: content-box;
  }
  #drive-hotspot {
    position: absolute;
    bottom: 39px;
    left: 45px;
    width: 7px;
    height: 8px;
    border-radius: 50%;
    z-index: 5;
  }
  #park-hotspot {
    position: absolute;
    bottom: 51px;
    left: 34px;
    width: 6px;
    height: 8px;
    border-radius: 12px;
    z-index: 5;
  }
  .gear-container {
    position: relative;
  }
</style> -->
<style>
 #gear-BG {
    background: url('/assets/img/module/gear_shift_movement_Sprite.png') no-repeat;
    background-size: 565% auto;
    border-radius: 50%;
    width: 120.95px;
    height: 120.95px;
    background-position: -5px 0;
    border: 2px solid #a6a6a6;
    margin-top: -25%;
  }
 #drive-hotspot {
   position: absolute;
   bottom: 41px;
   left: 48px;
   width: 7px;
   height: 8px;
   border-radius: 50%;
   z-index: 5;
 }
 #park-hotspot {
   position: absolute;
   bottom: 51px;
   left: 34px;
   width: 6px;
   height: 8px;
   border-radius: 12px;
   z-index: 5;
 }
  .gear-container {
    position: relative;
  }
</style>
