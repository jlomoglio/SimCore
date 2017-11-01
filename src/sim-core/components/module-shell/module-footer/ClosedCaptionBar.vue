<template>
  <div id="closed-caption-bar" v-if="this.$store.getters.getCCBarIsShown" v-html="this.$store.getters.getCCBarText">{{ this.$store.getters.getCCBarText }}</div>
</template>

<script>
export default {
    name: 'ClosedCaptionBar',
    data () {
        return {
            isOn: this.$store.getters.getCCBarIsOn,
            isCCBarShown: this.$store.getters.getCCBarIsShown
            // ccText: this.$store.getters.getCCBarText
        }
    },
    methods: {
        isShown () {
            if (this.isOn === true) {
                if (this.isCCBarShown === true) {
                    return true
                } else if (this.$store.getters.getCCBarIsShown === false) {
                    return false
                }
            } else {
                return false
            }
        }
    }
}
</script>

<style scoped>
#closed-caption-bar {
	position: absolute;
	left: 0;
	right: 170px;
	height: 43px;
	text-align: left;
	background-color: #CCCCCC;
	font-family: Roboto-Medium;
	padding: 7px 30px 0 20px;
	font-size: 14px;
	color: #010101;
	z-index: 4;
}
</style>
