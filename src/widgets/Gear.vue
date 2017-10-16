<template>
<div>
  <div id="gear-BG"></div>
  <div id="drive-hotspot" @click="clickable() ? drive() : ''"></div>
  <div id="park-hotspot" @click="clickable() ? park() : ''"></div>
  
</div>
</template>
<script>
// import { TweenMax, SteppedEase } from 'gsap'
export default {
    props: [
        'currentTask',
        'tasks'
    ],
    data() {
        return {
            row: 0,
            spriteArray: [
                {x: -5, y: 0}, {x: -142, y: 0}, {x: -278.9, y: 0}, {x: -415, y: 0}, {x: -552, y: 0},
                {x: -5, y: -120.95}, {x: -142, y: -120.95}, {x: -278.9, y: -120.95}, {x: -415, y: -120.95}, {x: -552, y: -120.95},
                {x: -5, y: -241.95}, {x: -142, y: -241.95}, {x: -278.9, y: -241.95}, {x: -415, y: -241.95}, {x: -552, y: -241.95},
                {x: -5, y: -362.95}, {x: -142, y: -362.95}, {x: -278.9, y: -362.95}, {x: -415, y: -362.95}, {x: -552, y: -362.95}
            ],
            spriteArray1: [
                {x: -552, y: -362.95}, {x: -415, y: -362.95}, {x: -278.9, y: -362.95}, {x: -142, y: -362.95}, {x: -5, y: -362.95},
                {x: -552, y: -241.95}, {x: -415, y: -241.95}, {x: -278.9, y: -241.95}, {x: -142, y: -241.95}, {x: -5, y: -241.95},
                {x: -552, y: -120.95}, {x: -415, y: -120.95}, {x: -278.9, y: -120.95}, {x: -142, y: -120.95}, {x: -5, y: -120.95},
                {x: -552, y: 0}, {x: -415, y: 0}, {x: -278.9, y: 0}, {x: -142, y: 0}, {x: -5, y: 0}
            ]
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
            this.putInPark(362.95)
        },
        putInDrive(row) {
            for (let i = 0; i < this.spriteArray.length; i++) {
                let spritePos = this.spriteArray[i]
                var sprite = document.getElementById('gear-BG')
                this.driveCallBack(spritePos, sprite, i)
            }
            // TweenMax.to(`#gear-BG`, 1, {
            //     repeat: 1,
            //     backgroundPosition: `99.35% 0%`,
            //     ease: SteppedEase.config(20)
            // })
        },
        driveCallBack(spritePos, sprite, i) {
            window.setTimeout(() => {
                sprite.style.backgroundPosition = `${spritePos.x}px ${spritePos.y}px`
                if (i === this.spriteArray.length - 1) {
                    this.row = 4
                    this.$emit('drive')
                }
            }, (100 * i))
        },
        putInPark(yPosition) {
            // TweenMax.to(`#gear-BG`, 1, {
            //     repeat: 1,
            //     backgroundPosition: `-5px -${yPosition}px`,
            //     ease: SteppedEase.config(4),
            //     onComplete: this.parkCallBack
            // })
            for (let i = 0; i < this.spriteArray1.length; i++) {
                let spritePos = this.spriteArray1[i]
                var sprite = document.getElementById('gear-BG')
                this.driveCallBack(spritePos, sprite, i)
            }
        },
        parkCallBack(spritePos, sprite, ind) {
            // this.row -= 1
            // if (this.row >= 0) {
            //     var sprite = document.getElementById('gear-BG')
            //     var yPosition = this.row * 120.95
            //     console.log(this.row, yPosition)
            //     sprite.style.backgroundPosition = `-552px -${yPosition}px`
            //     this.putInPark(yPosition)
            // } else {
            //     console.log('row value', this.row)
            //     this.$emit('park')
            // }
            window.setTimeout(() => {
                // return function() {
                console.log('index val', ind)
                sprite.style.backgroundPosition = `${spritePos.x}px ${spritePos.y}px`
                if (ind === this.spriteArray1.length - 1) {
                    this.row = 0
                    this.$emit('park')
                }
                // }
            }, (100 * ind))
        }
    }
}
</script>

<style>
 #gear-BG {
    background: url('/assets/img/module/gear_shift_movement_Sprite.png') no-repeat;
    background-size: 565% auto;
    border-radius: 50%;
    width: 120.95px;
    height: 120.95px;
    background-position: -5px 0;
  }
  #drive-hotspot {
    position: absolute;
    bottom: 43px;
    left: 70px;
    width: 7px;
    height: 8px;
    border-radius: 50%;
    z-index: 5;
  }
  #park-hotspot {
    position: absolute;
    bottom: 54px;
    left: 56px;
    width: 6px;
    height: 7px;
    border-radius: 12px;
    z-index: 5;
  }
</style>
