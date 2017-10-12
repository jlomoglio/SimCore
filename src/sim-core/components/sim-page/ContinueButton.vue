<template>
    <div id="continue-button" v-if="display" @click="action"></div>
</template>

<script>
// import Vue from 'vue'
export default {
    name: 'ContinueButton',
    computed: {
        mode() {
            return this.$store.getters.getContinueButtonMode
        },
        view() {
            return this.$store.getters.getContinueButtonView
        },
        display() {
            return this.$store.getters.getContinueButtonIsShown
        },
        callback() {
            return this.$store.getters.getContinueButtonCallback
        }
    },
    watch: {
        display(newVal) {
            return newVal
        },
        callback(newCallback) {
            return newCallback
        }
    },
    methods: {
        action() {
            // console.log(this.callback)
            const fn = this.callback
            fn()
        }
    }
}
</script>

<style scoped>
#continue-button {
	position: absolute;
    right: 45px;
	bottom: 88px;
    background: url('/assets/img/buttons/horizontal/continue.png');
    background-size: 100% 100%;
    cursor: pointer;
    width: 150px;
    height: 32px;
    z-index: 25;
}

#continue-button:active {
    background: url('/assets/img/buttons/horizontal/continue_over.png');
    background-size: 100% 100%;
}
</style>
