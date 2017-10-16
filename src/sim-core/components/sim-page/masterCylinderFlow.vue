<template>
  <div id="master-cylinder-flow">
      <div class="master-cylinder" id="master-cylinder" ></div>
  </div>
</template>
<script>
import { TweenMax, SteppedEase } from 'gsap'
export default {
    name: 'masterCylinderFlow',
    data() {
        return {
            row: 0
        }
    },
    mounted() {
        this.startRotation(this.row)
    },
    methods: {
        startRotation(row) {
            TweenMax.to('.master-cylinder', 1, {
                backgroundPosition: `99.17% ${row}%`,
                ease: SteppedEase.config(10),
                onComplete: this.callback
            })
        },
        callback() {
            this.row += 1
            if (this.row < 2) {
                var yPosition = this.row * 104.25
                var sprite = document.getElementById('master-cylinder')
                sprite.style.backgroundPositionX = '0%'
                sprite.style.backgroundPositionY = `${yPosition}%`
                console.log('yPosition', yPosition, sprite.style.backgroundPositionX)
                this.startRotation(yPosition)
            }
        }
    }
}
</script>

<style>

.master-cylinder {
    width: 690px;
    height: 440px;
    background: url(/assets/img/module/master_cylinder_flow_calipers_drums_sprite.png) no-repeat;
    background-position: 0 0;
    background-size: 1200% auto;
    position: relative;
}
</style>
