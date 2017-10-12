<template>
	<div id="activity-light-box" v-if="this.$store.getters.getActivityLightBoxIsShown"></div>
</template>

<script>
export default {
    name: 'ActivityLightBox'
}
</script>

<style scoped>
#activity-light-box {
	position: absolute;
	left: 50%;
    margin-left: -500px;
	width: 1000px;
	background: rgba(0, 0, 0, 0.50) none repeat scroll 0 0;
    top: 45px;
	height: 580px;
	z-index: 1;
}
</style>
