<template>
    <div id="icon-cc" v-bind:class="{ active: this.$store.getters.getCCBarIsOn }" @click="toggleActive()"></div>
</template>

<script>
export default {
    name: 'IconClosedCaption',
    data () {
        return {
            isActive: this.$store.getters.getCCBarIsOn
        }
    },
    methods: {
        toggleActive () {
            if (this.$store.getters.getCCBarIsOn === true) {
                this.$store.commit('turnOffClosedCaptioning')
            } else if (this.$store.getters.getCCBarIsOn === false) {
                this.$store.commit('turnOnClosedCaptioning')
            }
        }
    }
}
</script>

<style scoped>
#icon-cc.active {
	position: absolute;
    width: 20px;
    height: 20px;
    right: 90px;
    top: 5px;
    cursor: pointer;
    background: url(/assets/img/icons/cc_active.png) 0% 0% / 100% 100%;
    background-origin: top center;
}
#icon-cc {
	position: absolute;
    width: 20px;
    height: 20px;
    right: 90px;
    top: 5px;
    cursor: pointer;
    background: url(/assets/img/icons/cc_inactive.png) 0% 0% / 100% 100%;
    background-origin: top center;
}
</style>
