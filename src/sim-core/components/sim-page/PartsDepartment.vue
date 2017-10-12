<template>
	<div id="parts-department"
        :style="imageStyles"
        v-if="this.$store.getters.getPartsDepartmentIsShown"
        @click="isClickable ? incorrect() : null"
    >
        <div class="hot-spot" v-hint="showHint" :style="hotspotStyles" @click="close()"></div>
    </div>
</template>

<script>
export default {
    name: 'PartsDepartment',
    data() {
        return {
            attempts: 1,
            showHint: false,
            isClickable: true
        }
    },
    computed: {
        hotspotStyles() {
            return {
                top: this.$store.getters.getPartsDepartmentHotspotTop,
                left: this.$store.getters.getPartsDepartmentHotspotLeft,
                width: this.$store.getters.getPartsDepartmentHotspotWidth,
                height: this.$store.getters.getPartsDepartmentHotspotHeight,
                backgroundColor: this.$store.getters.getPartsDepartmentHotspotBgColor,
                borderRadius: this.$store.getters.getPartsDepartmentHotspotBorderRadius
            }
        },
        imageStyles() {
            return {
                background: 'url(/assets/img/parts-department/' + this.$store.getters.getPartsDepartmentBgImage + ')',
                backgroundSize: this.$store.getters.getPartsDepartmentBgSize,
                backgroundOrigin: 'center'
            }
        },
        vo() {
            return this.$store.getters.getPartsDepartmentIncorrectVO
        },
        cc() {
            return this.$store.getters.getPartsDepartmentIncorrectCC
        }
    },
    methods: {
        close() {
            this.isClickable = false
            this.$store.commit('showPartsDepartmentPart')
            this.$store.commit('hidePartsDepartment')
        },
        incorrect() {
            if (this.attempts < 3) {
                return this.$core.Activity.Audio.play(this.vo, this.cc, () => { this.attempts = (this.attempts + 1) })
            } else if (this.attempts === 3) {
                return this.showHint = true
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#parts-department {
    position: absolute;
    left: 50%;
    top: 75px;
    height: 550px;
    margin-left: -500px;
    width: 1000px;
    z-index: 10;

    .hot-spot {
        position: absolute;
        opacity: .5;
        z-index: 15;
    }
}
</style>
