<template>
    <div id="parts-department-part" :style="styleObj"></div>
</template>

<script>
// import { TweenLite } from 'gsap'
import Draggable from 'gsap/Draggable'

export default {
    name: 'PartsDepartmentPart',
    props: ['dropZone'],
    data() {
        return {
            dz: this.dropZone
        }
    },
    computed: {
        bounds() {
            return {
                minY: this.$store.getters.getPartsDepartmentPartMinY,
                maxY: this.$store.getters.getPartsDepartmentPartMaxY,
                minX: this.$store.getters.getPartsDepartmentPartMinX,
                maxX: this.$store.getters.getPartsDepartmentPartMaxX
            }
        },
        styleObj() {
            return {
                background: 'url(/assets/img/parts-department/' + this.$store.getters.getPartsDepartmentPartBackground + ')',
                'background-origin': 'center',
                'background-size': '100%',
                width: this.$store.getters.getPartsDepartmentPartWidth,
                height: this.$store.getters.getPartsDepartmentPartHeight,
                top: this.$store.getters.getPartsDepartmentPartTop,
                left: this.$store.getters.getPartsDepartmentPartLeft
            }
        }
    },
    mounted() {
        let vm = this
        vm.snapMade = false
        vm.overlapThreshold = '70%'
        vm.partDropZone = document.getElementById(this.dz)

        Draggable.create(document.getElementById('parts-department-part'), {
            type: 'x,y',
            bounds: '#activity-area',
            onDrag: function() {
                this.applyBounds({
                    minY: vm.bounds.minY,
                    maxY: vm.bounds.maxY,
                    minX: vm.bounds.minX,
                    maxX: vm.bounds.maxX
                })
            },
            onRelease: function(e) {
                // Emit drooped event out to activity so that a dev can
                // detect when the part was dropped.
                vm.$emit('dropped')

                // Correct Drop
                if (this.hitTest(vm.partDropZone, vm.overlapThreshold)) {
                    // vm.snapMade = true
                    // TweenLite.to(e.target, 0.1, { left: 16, top: 155 })
                    // this.disable()
                    vm.$store.commit('setPartsDepartmentPartIsCorrectDrop', true)
                }

                // Incorrect Drop
                else {
                    vm.$store.commit('setPartsDepartmentPartIsCorrectDrop', false)
                }
            }
        })
    }
}
</script>

<style scoped>
#parts-department-part {
    position: absolute;
    z-index: 15
}
</style>
